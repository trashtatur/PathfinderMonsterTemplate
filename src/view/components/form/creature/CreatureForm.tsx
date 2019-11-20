import {creature} from "../../encounter/Encounter";
import * as React from "react";
import Select from 'react-select';
import axios from "axios";
import {uuidv4} from "../../helper/helperFunctions";
import {createCreature} from "./helper/creatureCreator";
import * as style from "./creatureForm.module.css";


interface ICreatureFormProps {
    creature?: creature;
    type: "edit" | "create";
}


interface ICreatureFormState {
    creature: creature;
    creatureData: any[]
    languageData: any[]
    talentData: any[]
    senseData: any[]
    skillData: any[]
    actionData: any[]
}

export class CreatureForm extends React.Component<ICreatureFormProps, ICreatureFormState> {

    constructor(props) {
        super(props);
        this.state = {
            creature: this.props.type == "edit" ? this.props.creature : createCreature(),
            creatureData: [],
            languageData: [],
            talentData: [],
            senseData: [],
            skillData: [],
            actionData: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.conditionalCreatureSelect = this.conditionalCreatureSelect.bind(this);
        this.addOneMoreAttackProperty = this.addOneMoreAttackProperty.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
        this.handleCreatureClassChange = this.handleCreatureClassChange.bind(this);
        this.handleHPChange = this.handleHPChange.bind(this);
        this.handleACChange = this.handleACChange.bind(this);
        this.handleActionsChange = this.handleActionsChange.bind(this);
        this.handleAttackPropertiesNameChange = this.handleAttackPropertiesNameChange.bind(this);
        this.handleAttackPropertiesValueChange = this.handleAttackPropertiesValueChange.bind(this);
        this.handleBaseAtkChange = this.handleBaseAtkChange.bind(this);
        this.handleChallengeChange = this.handleChallengeChange.bind(this);
        this.handleIniChange = this.handleIniChange.bind(this);
        this.handleLanguagesChange = this.handleLanguagesChange.bind(this);
        this.handleMovementChange = this.handleMovementChange.bind(this);
        this.handleSaveThrowsChange = this.handleSaveThrowsChange.bind(this);
        this.handleSensesChange = this.handleSensesChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSkillsChange = this.handleSkillsChange.bind(this);
        this.handleStatsChange = this.handleStatsChange.bind(this);
        this.handleTalentsChange = this.handleTalentsChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleXPChange = this.handleXPChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }


    /**
     * Composes dropdown to select creatures
     */
    composeSelectableCreatureOptions(): any[] {
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

        this.state.creatureData.forEach(entry => {
            if (entry.type == "monster") {
                selectables[0].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/monster-icon.png" height="20px"
                                     width="20px"/>{entry.name} CR:{entry.challenge}</div>
                })
            } else if (entry.type == "player") {
                selectables[1].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/player-icon.png" height="20px"
                                     width="20px"/>{entry.name}</div>
                })
            } else if (entry.type == "ally") {
                selectables[2].options.push({
                    value: entry.name,
                    label: <div><img src="images/selectableLableIcons/ally-icon.png" height="20px"
                                     width="20px"/>{entry.name} CR:{entry.challenge}</div>
                })

            }
        });
        return selectables
    }

    addOneMoreAttackProperty() {
        let creature = this.state.creature;
        creature.attackProperties.push({property: "", name: "", id: uuidv4()});
        this.setState({creature: creature})
    }

    composeSelectableAttributeOptions(attribute: "Talent" | "Sense" | "Skill" | "Action" | "Language") {
        let selectables = [];
        switch (attribute) {
            case "Language":
                this.state.languageData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Sense":
                this.state.senseData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Action":
                this.state.actionData.forEach(elem => {
                    selectables.push({value: elem.name + " " + elem.damage, label: elem.name + " " + elem.damage})
                });
                break;
            case "Skill":
                this.state.skillData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            case "Talent":
                this.state.talentData.forEach(elem => {
                    selectables.push({value: elem.name, label: elem.name})
                });
                break;
            default:
                break;
        }
        return selectables;
    }


    async getAll(whatToGet: "Creature" | "Talent" | "Sense" | "Skill" | "Action" | "Language") {
        return await axios.get(
            `/V1/${whatToGet}`
        )
    }


    componentDidMount(): void {
        if (this.props.type == "edit") {
            this.getAll('Creature').then(result => {
                this.setState({creatureData: result.data})
            }).catch(function (error) {
                console.log(error)
            });
        }

        this.getAll("Talent").then(result => {
            if (Array.isArray(result.data)) this.setState({talentData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Language").then(result => {
            if (Array.isArray(result.data)) this.setState({languageData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll('Skill').then(result => {
            if (Array.isArray(result.data)) this.setState({skillData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Sense").then(result => {
            if (Array.isArray(result.data)) this.setState({senseData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

        this.getAll("Action").then(result => {
            if (Array.isArray(result.data)) this.setState({actionData: result.data})
        }).catch(function (error) {
            console.log(error)
        });

    }

    conditionalCreatureSelect() {
        if (this.props.type == "edit") {
            return (
                <Select
                    options={this.composeSelectableCreatureOptions()}
                    isSearchable={true}
                    onChange={this.onSelect}
                    className={style.creatureSelectContainer}
                />
            )
        }
    }

    onSelect() {
        //For the part when this is an edit form
    }

    uploadImage(data: File | string) {
        if (data == null) return true;
        if (typeof data != "string") {
            let file_ext = data.name.substring(data.name.lastIndexOf('.'));
            let filename = this.state.creature.name +'-'+this.state.creature.challenge+ file_ext;
            const formattedFile = new File([data], filename, {type: data.type});
            const form = new FormData();
            form.append('file', formattedFile);
            axios.put(
                '/V1/creature/image', form
            ).then(
                function (result) {
                    console.log(result);
                    return result.data
                }
            ).catch(function (error) {
                console.log(error);
                return false
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.uploadImage(this.state.creature.image);
        let that = this;
            axios.post('/V1/Creature', this.setCreatureImageName()).then(
                function (response) {
                    console.log(response);
                    alert('Created entry in database');
                    that.resetForm()
                }
            ).catch(function (error) {
                console.log(error)
            });

    }

    resetForm() {
        this.setState({creature: createCreature()})
    }

    setCreatureImageName():creature {
        if (this.state.creature.image != null && typeof this.state.creature.image != "string") {
            let creature = this.state.creature;
            creature.image =
                //@ts-ignore
                `images/creatureImages/${creature.name}-${creature.challenge}/${creature.name}-${creature.challenge}${creature.image.name.substring(creature.image.name.lastIndexOf('.'))}`;
            console.log(creature);
            return creature;
        }
        return this.state.creature
    }

    handleNameChange(event) {
        let creature = this.state.creature;
        creature.name = event.target.value;
        this.setState({creature: creature})
    }

    handleTypeChange(event) {
        let creature = this.state.creature;
        creature.type = event.target.value;
        this.setState({creature: creature})
    }

    handleHPChange(event) {
        let creature = this.state.creature;
        creature.hitpoints = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleACChange(event) {
        let creature = this.state.creature;
        creature.armorclass = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleAlignmentChange(value, option) {
        let creature = this.state.creature;
        creature.alignment = value.value;
        this.setState({creature: creature})
    }

    handleCreatureClassChange(event) {
        let creature = this.state.creature;
        creature.creatureClass = event.target.value;
        this.setState({creature: creature})
    }

    handleAttackPropertiesNameChange(event) {
        let creature = this.state.creature;
        creature.attackProperties = creature.attackProperties.map((elem) => {
            if (elem.id + '-name' !== event.target.id) return elem;
            return {name: event.target.value, property: elem.property, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }

    handleAttackPropertiesValueChange(event) {
        let creature = this.state.creature;
        creature.attackProperties = creature.attackProperties.map((elem) => {
            if (elem.id + '-prop' !== event.target.id) return elem;
            return {name: elem.name, property: event.target.value, id: elem.id};
        });
        this.setState({
            creature: creature
        });
    }


    handleChallengeChange(event) {
        let creature = this.state.creature;
        creature.challenge = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleMovementChange(event) {
        let creature = this.state.creature;
        creature.movement = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleIniChange(event) {
        let creature = this.state.creature;
        creature.ini = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleImageChange(event) {
        console.log(event.target.files[0]);
        let creature = this.state.creature;
        creature.image = event.target.files[0];
        this.setState({creature: creature})
    }

    handleBaseAtkChange(event) {
        let creature = this.state.creature;
        creature.baseAtk = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleXPChange(event) {
        let creature = this.state.creature;
        creature.xp = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleSizeChange(value, option) {
        let creature = this.state.creature;
        creature.size = value.value;
        this.setState({creature: creature})
    }

    handleStatsChange(event, stat: "str" | "dex" | "wis" | "int" | "cha" | "con") {
        let creature = this.state.creature;
        creature.stats[stat] = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleSaveThrowsChange(event, saveThrow: "ref" | "will" | "fort") {
        let creature = this.state.creature;
        creature.saveThrows[saveThrow] = parseInt(event.target.value);
        this.setState({creature: creature})
    }

    handleLanguagesChange(value, option) {
        let creature = this.state.creature;
        creature.languages = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleSensesChange(value, option) {
        let creature = this.state.creature;
        creature.senses = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleSkillsChange(value, option) {
        let creature = this.state.creature;
        creature.skills = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleTalentsChange(value, option) {
        let creature = this.state.creature;
        creature.talents = value.map(elem => {
            return elem.value
        });
        this.setState({creature: creature})
    }

    handleActionsChange(value, option) {
        let creature = this.state.creature;
        let actions = [];
        value.forEach(selectedValue => {
            let action = this.state.actionData.filter(elem => {
                return elem.name == selectedValue.value.substr(0, selectedValue.value.lastIndexOf(" "))
            });

            actions.push(action[0]);
        });
        let actions_formatted = actions.map(elem => {
            return {
                name: elem.name,
                rangeType: elem.rangeType,
                attackBonus: elem.attackBonus,
                damage: elem.damage,
                critmod: elem.critMod,
                damageType: elem.damageType,
                additionalInfo: elem.additionalInfo
            }
        });
        creature.actions = creature.actions.concat(actions_formatted);
        let creature_actions_set = [];
        creature.actions.forEach(elem => {
            let filter = creature_actions_set.filter(set_elem => {
                return elem.name == set_elem.name
            });
            if (filter.length == 0) creature_actions_set.push(elem)
        });
        creature.actions = creature_actions_set;
        this.setState({creature: creature})
    }

    render(): any {
        return (
            <div className={style.creatureFormContainer}>
                {this.conditionalCreatureSelect()}
                <div className={style.actualCreatureForm}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={style.formPart}>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                name:
                                <input type="text" value={this.state.creature.name} onChange={this.handleNameChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                type:
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                       value={"player"}/> player
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                       value={"monster"}/> monster
                                <input type="radio" name="creatureType" onChange={this.handleTypeChange}
                                       value={"ally"}/> ally
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                hitpoints:
                                <input type="number" value={this.state.creature.hitpoints}
                                       onChange={this.handleHPChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                armorclass:
                                <input type="number" value={this.state.creature.armorclass}
                                       onChange={this.handleACChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                alignment:
                                <Select
                                    options={[
                                        {
                                            value: "chaotic evil",
                                            label: <div><img src={"/images/alignments/chaotic-evil.png"}
                                                             height={"20 px"} width={"20px"}/>chaotic evil</div>
                                        },
                                        {
                                            value: "neutral evil",
                                            label: <div><img src={"/images/alignments/neutral-evil.png"}
                                                             height={"20 px"} width={"20px"}/>neutral evil</div>
                                        },
                                        {
                                            value: "lawful evil",
                                            label: <div><img src={"/images/alignments/lawful-evil.png"} height={"20 px"}
                                                             width={"20px"}/>lawful evil</div>
                                        },
                                        {
                                            value: "chaotic neutral",
                                            label: <div><img src={"/images/alignments/chaotic-neutral.png"}
                                                             height={"20 px"} width={"20px"}/>chaotic neutral</div>
                                        },
                                        {
                                            value: "neutral",
                                            label: <div><img src={"/images/alignments/neutral-neutral.png"}
                                                             height={"20 px"} width={"20px"}/>neutral</div>
                                        },
                                        {
                                            value: "lawful neutral",
                                            label: <div><img src={"/images/alignments/lawful-neutral.png"}
                                                             height={"20 px"} width={"20px"}/>lawful neutral</div>
                                        },
                                        {
                                            value: "chaotic good",
                                            label: <div><img src={"/images/alignments/chaotic-good.png"}
                                                             height={"20 px"} width={"20px"}/>chaotic good</div>
                                        },
                                        {
                                            value: "neutral good",
                                            label: <div><img src={"/images/alignments/neutral-good.png"}
                                                             height={"20 px"} width={"20px"}/>neutral good</div>
                                        },
                                        {
                                            value: "lawful good",
                                            label: <div><img src={"/images/alignments/lawful-good.png"} height={"20 px"}
                                                             width={"20px"}/>lawful good</div>
                                        }
                                    ]}
                                    onChange={this.handleAlignmentChange}
                                    className={style.creatureFormSelect}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                creature class:
                                <input type="text" value={this.state.creature.creatureClass}
                                       onChange={this.handleCreatureClassChange}/>
                            </label>
                            <label>
                                attack Properties:
                                <button type={"button"} onClick={this.addOneMoreAttackProperty}
                                        className={style.formAddButton}>+</button>
                                {
                                    this.state.creature.attackProperties.map((elem, i) => {
                                        return (
                                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}
                                                   key={i}>
                                                name:
                                                <input type="text" value={elem.name} id={elem.id + "-name"}
                                                       key={i + "name"}
                                                       onChange={this.handleAttackPropertiesNameChange}/>
                                                property:
                                                <input type="text" value={elem.property} id={elem.id + "-prop"}
                                                       key={i + "prop"}
                                                       onChange={this.handleAttackPropertiesValueChange}/>
                                            </label>)
                                    })}
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                challenge:
                                <input type="number" value={this.state.creature.challenge}
                                       onChange={this.handleChallengeChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                movement:
                                <input type="number" value={this.state.creature.movement}
                                       onChange={this.handleMovementChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                initiative modifier:
                                <input type="number" value={this.state.creature.ini} onChange={this.handleIniChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                base Attack bonus:
                                <input type="number" value={this.state.creature.baseAtk}
                                       onChange={this.handleBaseAtkChange}/>
                            </label>
                        </div>
                        <div className={style.formPart}>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                xp:
                                <input type="number" value={this.state.creature.xp} onChange={this.handleXPChange}/>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                size:
                                <Select
                                    options={[
                                        {value: "fine", label: "fine"},
                                        {value: "diminutive", label: "diminutive"},
                                        {value: "tiny", label: "tiny"},
                                        {value: "small", label: "small"},
                                        {value: "medium", label: "medium"},
                                        {value: "large", label: "large"},
                                        {value: "huge", label: "huge"},
                                        {value: "gargantuan", label: "gargantuan"},
                                        {value: "colossal", label: "colossal"}
                                    ]}
                                    onChange={this.handleSizeChange}
                                    className={style.creatureFormSelect}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                stats:
                                <label>
                                    str:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.str}
                                           onChange={e => this.handleStatsChange(e, "str")}/>
                                </label>
                                <label>
                                    dex:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.dex}
                                           onChange={e => this.handleStatsChange(e, "dex")}/>
                                </label>
                                <label>
                                    int:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.int}
                                           onChange={e => this.handleStatsChange(e, "int")}/>
                                </label>
                                <label>
                                    wis:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.wis}
                                           onChange={e => this.handleStatsChange(e, "wis")}/>
                                </label>
                                <label>
                                    con:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.con}
                                           onChange={e => this.handleStatsChange(e, "con")}/>
                                </label>
                                <label>
                                    cha:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.stats.cha}
                                           onChange={e => this.handleStatsChange(e, "cha")}/>
                                </label>
                            </label>
                            <label className={`${style.formInputArea} ${style.formTextInputArea}`}>
                                save throws:
                                <label>
                                    ref:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.saveThrows.ref}
                                           onChange={e => this.handleSaveThrowsChange(e, "ref")}/>
                                </label>
                                <label>
                                    will:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.saveThrows.will}
                                           onChange={e => this.handleSaveThrowsChange(e, "will")}/>
                                </label>
                                <label>
                                    fort:
                                    <input className={style.subInput} type="number"
                                           value={this.state.creature.saveThrows.fort}
                                           onChange={e => this.handleSaveThrowsChange(e, "fort")}/>
                                </label>
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                languages:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Language")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleLanguagesChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                senses:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Sense")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleSensesChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                skills:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Skill")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleSkillsChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                talents:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Talent")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleTalentsChange}
                                />
                            </label>
                            <label className={`${style.formInputArea} ${style.formSelectContainer}`}>
                                actions:
                                <Select
                                    options={this.composeSelectableAttributeOptions("Action")}
                                    className={style.creatureFormSelect}
                                    isMulti={true}
                                    onChange={this.handleActionsChange}
                                />
                            </label>
                            <label className={style.imageUploadContainer}>
                                Image
                                <input type="file" name="file"
                                       onChange={this.handleImageChange}

                                />
                            </label>
                        </div>
                        <button type={"submit"} className={style.creatureFormSubmit}>submit</button>
                    </form>
                </div>
            </div>
        )
    }
}