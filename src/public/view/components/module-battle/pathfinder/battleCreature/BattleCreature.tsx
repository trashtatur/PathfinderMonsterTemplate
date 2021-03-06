import * as React from "react";
import {CreatureCard} from "../creaturecard/CreatureCard";
import {ReactElement} from "react";
import {PathfinderCreatureSizeEnum} from "@/public/model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {ProgressBar} from "@/public/view/components/uiBasic/progressBar/ProgressBar";
import {PathfinderSavingThrowsViewModel} from "@/public/model/pathfinder/PathfinderSavingThrowsViewModel";
import {PathfinderTalentViewModel} from "@/public/model/pathfinder/PathfinderTalentViewModel";
import {PathfinderActionViewModel} from "@/public/model/pathfinder/PathfinderActionViewModel";
import {NamedPropertyViewModel} from "@/public/model/NamedPropertyViewModel";
import {PathfinderStatsViewModel} from "@/public/model/pathfinder/PathfinderStatsViewModel";
import {TypeEnum} from "@/public/model/enumeration/TypesEnum";
import {AlignmentEnum} from "@/public/model/enumeration/AlignmentEnum";
import {PathfinderLanguageViewModel} from "@/public/model/pathfinder/PathfinderLanguageViewModel";
import {PathfinderSkillViewModel} from "@/public/model/pathfinder/PathfinderSkillViewModel";
import * as style from './battleCreature.css';


export interface CreatureProps {
    id: string;
    name: string;
    type: TypeEnum;
    hitpoints: number;
    armorclass: number;
    label?: number;
    alignment: AlignmentEnum;
    creatureClass: string;
    attackProperties?: NamedPropertyViewModel[];
    challenge: number;
    movement: number;
    image?;
    ini: number;
    currentIni: number;
    currentAC: number;
    currentHP: number;
    baseAtk: number;
    xp?: number;
    size: PathfinderCreatureSizeEnum;
    stats: PathfinderStatsViewModel;
    sortByIni: Function;
    handleCurrentHPChange: Function;
    handleCurrentACChange: Function;
    handleCurrentTypeChange: Function;
    handleRemoveFromEncounter: Function;
    saveThrows: PathfinderSavingThrowsViewModel;
    languages?: PathfinderLanguageViewModel[];
    skills?: PathfinderSkillViewModel[];
    talents?: PathfinderTalentViewModel[];
    actions?: PathfinderActionViewModel[];

    changeCurrentHPOfRoundCreature: Function;
    changeCurrentACOfRoundCreature: Function;
    changeCurrentIniOfRoundCreature: Function;
    changeTypeOfRoundCreature: Function;
    removeCreatureFromRound: Function;
}

export interface CreatureState {
    hitpoints: number;
    armorclass: number;
    currentIni: number;
    currentAC: number;
    currentHP: number;
    type: TypeEnum;
}

export class BattleCreature extends React.Component<CreatureProps, CreatureState> {

    constructor(props) {
        super(props);
        this.state = {
            hitpoints: this.props.hitpoints || 0,
            armorclass: this.props.armorclass || 0,
            currentIni: this.props.currentIni || 0,
            currentAC: this.props.currentAC || 0,
            currentHP: this.props.currentHP || 0,
            type: this.props.type,
        };
        this.handleIniChange = this.handleIniChange.bind(this);
        this.handleACChange = this.handleACChange.bind(this);
        this.handleHPChange = this.handleHPChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    MONSTER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(47,2,2,1) 70%, rgba(255,0,9,1) 100%)";
    PLAYER_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(9,115,121,1) 70%, rgba(0,241,255,1) 100%)";
    ALLY_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(2,47,18,1) 70%, rgba(0,255,128,1) 100%)";
    SUMMON_GRADIENT = "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(67,1,64,1) 70%, rgba(67,1,64,1) 100%)";
    DEFAULT_BG = "black";

    handleIniChange(event): void {
        this.setState({currentIni: event.target.value})
    }

    handleACChange(event): void {
        this.setState({currentAC: event.target.value})
    }

    handleHPChange(event): void {
        this.setState({currentHP: event.target.value})
    }

    handleTypeChange(event): void {
        this.setState({type: event.target.value})
    }

    determineGradientType(): object {
        switch (this.state.type) {
            case 'monster':
                return {
                    background: this.MONSTER_GRADIENT
                };
            case 'ally':
                return {
                    background: this.ALLY_GRADIENT
                };
            case 'player':
                return {
                    background: this.PLAYER_GRADIENT
                };
            case 'summon':
                return {
                    background: this.SUMMON_GRADIENT
                };
            default:
                return {
                    background: this.DEFAULT_BG
                }
        }
    }

    typeChecked(fieldValue: string): boolean {
        return this.state.type == fieldValue;
    }

    render(): ReactElement {
        return (
            <table className={style.encounterEntity}>
                <tbody>
                <tr>
                    <td>
                        <div className={style.creatureDisplayContainer}>
                            <CreatureCard
                                name={this.props.name}
                                hitpoints={this.props.hitpoints}
                                challenge={this.props.challenge}
                                armorclass={this.props.armorclass}
                                label={this.props.label}
                                attackProperties={this.props.attackProperties}
                                alignment={this.props.alignment}
                                baseAtk={this.props.baseAtk}
                                creatureClass={this.props.creatureClass}
                                ini={this.props.ini}
                                movement={this.props.movement}
                                image={this.props.image}
                                saveThrows={this.props.saveThrows}
                                size={this.props.size}
                                xp={this.props.xp}
                                stats={this.props.stats}
                                foldable={true}
                                languages={this.props.languages}
                                skills={this.props.skills}
                                talents={this.props.talents}
                                actions={this.props.actions}
                            />
                            <ProgressBar min={0} max={this.props.hitpoints} current={this.state.currentHP} color={'#5ac111'} />
                            <div className={style.creatureCurrentContainer}>
                                <div className={style.nextToTitleContainer}>
                                    <p className={style.statDisplay}>HP: <input type="number"
                                                                                className={style.inputField}
                                                                                defaultValue={this.state.currentHP}
                                                                                onBlur={e => {
                                                                                    this.handleHPChange(e);
                                                                                    this.props.handleCurrentHPChange(e, this.props.id, this.props.label);
                                                                                    this.props.changeCurrentHPOfRoundCreature(e.target.value, this.props.id, this.props.label);
                                                                                }}/></p>
                                    <p className={style.statDisplay}>AC: <input type="number"
                                                                                className={style.inputField}
                                                                                defaultValue={this.state.currentAC}
                                                                                onBlur={e => {
                                                                                    this.handleACChange(e);
                                                                                    this.props.handleCurrentACChange(e, this.props.id, this.props.label);
                                                                                    this.props.changeCurrentACOfRoundCreature(e.target.value, this.props.id, this.props.label);
                                                                                }}/></p>
                                    <p className={style.statDisplay}>INI:<input type="number"
                                                                                className={style.inputField}
                                                                                defaultValue={this.state.currentIni}
                                                                                onBlur={e => {
                                                                                    this.handleIniChange(e);
                                                                                    this.props.changeCurrentIniOfRoundCreature(e.target.value, this.props.id, this.props.label);
                                                                                    this.props.sortByIni(e, this.props.id, this.props.label);
                                                                                }}/></p>
                                    <p className={style.statDisplay}>Type:
                                        <input name={this.props.id + "type"} type="radio" value={"ally"}
                                               checked={this.typeChecked('ally')} onChange={e => {
                                            this.handleTypeChange(e);
                                            this.props.changeTypeOfRoundCreature(e.target.value, this.props.id, this.props.label);
                                            this.props.handleCurrentTypeChange(e, this.props.id, this.props.label);
                                        }}/>Ally
                                        <input name={this.props.id + "type"} type="radio" value={"monster"}
                                               checked={this.typeChecked('monster')} onChange={e => {
                                            this.handleTypeChange(e);
                                            this.props.changeTypeOfRoundCreature(e.target.value, this.props.id, this.props.label);
                                            this.props.handleCurrentTypeChange(e, this.props.id, this.props.label);
                                        }}/>Monster
                                        <input name={this.props.id + "type"} type="radio" value={"player"}
                                               checked={this.typeChecked('player')} onChange={e => {
                                            this.handleTypeChange(e);
                                            this.props.changeTypeOfRoundCreature(e.target.value, this.props.id, this.props.label);
                                            this.props.handleCurrentTypeChange(e, this.props.id, this.props.label);
                                        }}/>Player
                                        <input name={this.props.id + "type"} type="radio" value={"summon"}
                                               checked={this.typeChecked('summon')} onChange={e => {
                                            this.handleTypeChange(e);
                                            this.props.changeTypeOfRoundCreature(e.target.value, this.props.id, this.props.label);
                                            this.props.handleCurrentTypeChange(e, this.props.id, this.props.label);
                                        }}/>Summon
                                    </p>
                                </div>
                                <div className={style.titleContainer}>
                                    <h1 className={style.currentInfoContainer} style={this.determineGradientType()}>Current</h1>
                                    <div className={style.edge}/>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button
                            className={style.removeCreatureButton}
                            type={"button"}
                            onClick={() => {
                                this.props.handleRemoveFromEncounter(this.props.id, this.props.label);
                                this.props.removeCreatureFromRound(this.props.id, this.props.label);
                            }
                            }> X
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}