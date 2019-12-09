import * as React from "react";
import {Creature} from "../creature/Creature";
import {CreatureSelect} from "../creatureSelect/CreatureSelect";
import axios from 'axios';
import {uuidv4} from "../../helper/helperFunctions";
import {creature} from "../../componentTypes";
import * as style from './encounter.module.css';


export interface IEncounterProps {
    addCreatureToRound:Function
    changeCurrentHPOfCreature:Function
    changeCurrentACOfCreature:Function
    changeCurrentIniOfCreature:Function
    changeTypeOfRoundCreature:Function
    removeCreatureFromRound:Function
}

export interface IEncounterState {
    creatureMap: creature[]
    creatureDataMap
}

export class Encounter extends React.Component<IEncounterProps, IEncounterState> {
    constructor(props) {
        super(props);
        this.sortByIni = this.sortByIni.bind(this);
        this.addCreatures = this.addCreatures.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleCurrentACChange = this.handleCurrentACChange.bind(this);
        this.handleCurrentHPChange = this.handleCurrentHPChange.bind(this);
        this.handleCurrentTypeChange = this.handleCurrentTypeChange.bind(this);
        this.handleRemoveFromEncounter = this.handleRemoveFromEncounter.bind(this);
        this.state = {
            creatureMap: [],
            creatureDataMap: []
        }
    }

    creatures_to_add = [];
    creatureSelect = null;

    /**
     * Sorts creature list by initiative
     * @param event
     * @param id
     */
    sortByIni(event, id) {
        let creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentIni = parseInt(event.target.value);
        let creatureMapSorted = creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentIni < creatureB.currentIni) return 1;
            if (creatureA.currentIni > creatureB.currentIni) return -1;
            return 0;
        });
        this.setState({creatureMap: creatureMapSorted})
    }

    handleRemoveFromEncounter(id:string) {
        this.setState({creatureMap:
            this.state.creatureMap.filter(elem => {
                return elem.id != id;
            })
        })
    }

    handleCurrentHPChange(event, id) {
        let creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentHP = parseInt(event.target.value);
        this.setState({creatureMap: creatureMap})
    }

    handleCurrentACChange(event,id) {
        let creatureMap = this.state.creatureMap;
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].currentAC = parseInt(event.target.value);
        this.setState({creatureMap: creatureMap})
    }

    handleCurrentTypeChange(event,id) {
        let creatureMap = this.state.creatureMap;
        //@ts-ignore
        creatureMap.filter(creature => {
            return creature.id == id
        })[0].type = event.target.value;
        this.setState({creatureMap: creatureMap})
    }

    determineLabel(creatureName:string): number {
        let same_creature = this.state.creatureMap.filter(elem => {
            return elem.name == creatureName
        }).sort(function (cr1, cr2) {
            if (cr1.label>cr2.label) return 1;
            if (cr1.label<cr2.label) return -1;
            return 0;
        });
        if (same_creature.length == 0) return 0;
        else return same_creature[same_creature.length-1].label+1
    }

    componentDidMount(): void {
        this.getAllCreatures().then(result => {
            this.setState({creatureDataMap: result.data})
        });
    }

    async getAllCreatures() {
        let creatures = await axios.get(
            '/V1/creature'
        );
        return creatures;
    }

    /**
     * Composes dropdown to select creatures
     */
    composeSelectableOptions(): any[] {
        let selectables = [
            {
                label: "monsters",
                options: []
            },
            {
                label: "players",
                options: []
            },
            {
                label: "allies",
                options: []
            }

        ];

        this.state.creatureDataMap.forEach(entry => {
            if (entry.type == "monster") {
                selectables[0].options.push({value: entry.name, label: <div><img src="images/selectableLableIcons/monster-icon.png" height="20px" width="20px"/>{entry.name} CR:{entry.challenge}</div>})
            } else if (entry.type =="player") {
                selectables[1].options.push({value: entry.name, label: <div><img src="images/selectableLableIcons/player-icon.png" height="20px" width="20px"/>{entry.name}</div>})
            } else if (entry.type == "ally") {
                selectables[2].options.push({value: entry.name, label: <div><img src="images/selectableLableIcons/ally-icon.png" height="20px" width="20px"/>{entry.name} CR:{entry.challenge}</div>})
            }
        });
        return selectables
    }

    /**
     * Clones creature entry in to add list
     * so that each component is unique
     * @param elem
     */
    cloneEntry(elem: creature): creature {
        let creature = {
            ...elem,
            id: uuidv4(),
            label: elem.label == null ? this.determineLabel(elem.name) : elem.label,
            currentIni: Math.floor(Math.random()*(+20 - +1) + +1) + elem.ini
        };
        return creature;
    }

    /**
     * Adds selected creatures
     */
    addCreatures() {
        let to_add = this.creatures_to_add.map(elem => {
            return this.cloneEntry(elem)
        });
        let creatureMap = this.state.creatureMap;
        creatureMap = creatureMap.concat(to_add);
        let creatureMapSorted = creatureMap.sort((creatureA, creatureB) => {
            if (creatureA.currentIni < creatureB.currentIni) return 1;
            if (creatureA.currentIni > creatureB.currentIni) return -1;
            return 0;
        });
        to_add.forEach(elem=>{
           this.props.addCreatureToRound(elem);
        });
        this.setState({
            creatureMap: creatureMapSorted
        });
    }



    /**
     * Reacts to select or remove event.
     * and then preps the selected creatures for creation
     * @param selected
     * @param option
     */
    onSelect(selected, option) {
        if (option.action == 'select-option') {
            let creatures_to_add: creature[] = [];
            let filtered = [];
            selected.forEach(name => {
                filtered = this.state.creatureDataMap.filter(elem => {
                    return elem.name == name.value
                });
                creatures_to_add.push(
                    {
                        id: "",
                        name: filtered[0].name,
                        type: filtered[0].type,
                        hitpoints: filtered[0].hitpoints,
                        armorclass: filtered[0].armorclass,
                        label: null,
                        alignment: filtered[0].alignment,
                        attackProperties:
                            filtered[0].attackProperties == null ? null : filtered[0].attackProperties,
                        creatureClass: filtered[0].creatureClass,
                        challenge: filtered[0].challenge,
                        movement: filtered[0].movement,
                        image:filtered[0].image,
                        ini: filtered[0].ini,
                        currentIni: Math.floor(Math.random()*(+20 - +1) + +1) + filtered[0].ini,
                        currentAC: filtered[0].armorclass,
                        currentHP: filtered[0].hitpoints,
                        baseAtk: filtered[0].baseAtk,
                        xp: filtered[0].xp || 0,
                        kmb: filtered[0].kmb || 0,
                        kmv: filtered[0].kmv || 0,
                        sortByIni: this.sortByIni,
                        handleCurrentACChange: this.handleCurrentACChange,
                        handleCurrentHPChange: this.handleCurrentHPChange,
                        handleCurrentTypeChange: this.handleCurrentTypeChange,
                        skills: filtered[0].skills == [] ? [] : filtered[0].skills.map(elem => {
                            let level = elem.CreatureSkill.skillLevel;
                            return `${elem.name} ${level}`
                        }),
                        size: filtered[0].size,
                        stats: JSON.parse(filtered[0].stats) || {},
                        saveThrows: JSON.parse(filtered[0].saveThrows) || {},
                        languages: filtered[0].languages == [] ? [] : filtered[0].languages.map(elem => {
                            return elem.name
                        }),
                        talents: filtered[0].talents == [] ? [] : filtered[0].talents.map(elem => {
                            return elem.name
                        }),
                        actions: filtered[0].actions == [] ? [] : filtered[0].actions.map(elem => {
                            return  {
                                name: elem.name,
                                rangeType: elem.rangeType,
                                range: elem.range,
                                attackBonus: elem.attackBonus,
                                damage: elem.damage,
                                critmod: elem.critMod,
                                damageType: elem.damageType,
                                additionalInfo: elem.additionalInfo
                            }
                        })
                    }
                )
            });
            this.creatures_to_add = creatures_to_add;
        }
        if (option.action == 'remove-value') {
            this.creatures_to_add = this.creatures_to_add.filter(elem => {
                return elem.name != option.removedValue.value
            })
        }
    }


    render(): any {
        return (
            <div className={style.encounterCreatureDialogContainer}>
                <div className={style.addDialog}>
                    <CreatureSelect
                        selectableOptions={this.composeSelectableOptions()}
                        onSelect={this.onSelect}
                        ref={ref => {
                            this.creatureSelect = ref
                        }}
                    />
                    <button className={style.creatureAddButton} type="button" onClick={this.addCreatures}>Add Creature
                    </button>
                </div>
                {this.state.creatureMap.map((creature, i) => {
                    return (
                        <Creature
                            id={creature.id}
                            name={creature.name}
                            type={creature.type}
                            hitpoints={creature.hitpoints}
                            label={creature.label}
                            attackProperties={creature.attackProperties}
                            key={uuidv4()}
                            xp={creature.xp}
                            armorclass={creature.armorclass}
                            alignment={creature.alignment}
                            creatureClass={creature.creatureClass}
                            challenge={creature.challenge}
                            movement={creature.movement}
                            image={creature.image}
                            ini={creature.ini}
                            currentIni={creature.currentIni}
                            currentHP = {creature.currentHP}
                            currentAC = {creature.currentAC}
                            baseAtk={creature.baseAtk}
                            size={creature.size}
                            stats={creature.stats}
                            kmb={creature.kmb}
                            kmv={creature.kmv}
                            sortByIni={creature.sortByIni}
                            handleCurrentACChange={creature.handleCurrentACChange}
                            handleCurrentHPChange={creature.handleCurrentHPChange}
                            handleCurrentTypeChange={creature.handleCurrentTypeChange}
                            handleRemoveFromEncounter={this.handleRemoveFromEncounter}
                            saveThrows={creature.saveThrows}
                            skills={creature.skills}
                            talents={creature.talents}
                            actions={creature.actions}
                            languages={creature.languages}
                            changeTypeOfRoundCreature={this.props.changeTypeOfRoundCreature}
                            changeCurrentACOfRoundCreature={this.props.changeCurrentACOfCreature}
                            changeCurrentHPOfRoundCreature={this.props.changeCurrentHPOfCreature}
                            changeCurrentIniOfRoundCreature={this.props.changeCurrentIniOfCreature}
                            removeCreatureFromRound={this.props.removeCreatureFromRound}
                        />
                    )
                })}
            </div>
        )
    }
}