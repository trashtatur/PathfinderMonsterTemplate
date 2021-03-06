import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import Dropzone from "react-dropzone-uploader";
import Switch from "react-switch";
import axios from "axios";
import {CreatureViewModel} from "@/public/model/CreatureViewModel";
import {CreatureViewModelFactory} from "@/public/factory/CreatureViewModelFactory";
import {PathfinderCreaturePropertiesViewModel} from "@/public/model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {uploadCreatureImage} from "@/public/service/http.service";
import {setCreatureImagePath} from "@/public/service/imagePath.service";
import * as style from './pathfinderAddSummon.css';

interface AddSummonProps {
    addToEncounter: Function;
}

interface AddSummonState {
    isDisplayed: boolean;
    summonedCreature: CreatureViewModel<PathfinderCreaturePropertiesViewModel>;
    submitToDB: boolean;
    howMany: number | string;
}

const IS_DISPLAYED: CSSProperties = {visibility: "visible", opacity: 1, maxHeight: "500px", marginTop: "20px"};
const IS_NOT_DISPLAYED: CSSProperties = {visibility: "hidden", opacity: 0, maxHeight: "0px", marginTop: "-200px"};

export class PathfinderAddSummon extends React.Component<AddSummonProps, AddSummonState> {

    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            summonedCreature: this.creatureViewModelFactory.createSummonedCreature(PathfinderCreaturePropertiesViewModel),
            submitToDB: false,
            howMany: 1,
        }
    }

    creatureViewModelFactory = new CreatureViewModelFactory()

    handleSubmit = async (event): Promise<void> => {
        event.preventDefault();
        if (this.state.submitToDB) {
            uploadCreatureImage(
                this.state.summonedCreature.creatureProperties.image,
                this.state.summonedCreature.name,
                this.state.summonedCreature.creatureProperties.challenge
            );
            try {
                const creature = this.state.summonedCreature;
                if (typeof creature.creatureProperties.image !== "string") {
                    creature.creatureProperties.image =
                        setCreatureImagePath(creature.name, creature.creatureProperties.challenge, creature.creatureProperties.image);
                }
                await axios.post('/V1/Creature', creature);
                alert('Created entry in database');
            } catch (error) {
                console.log(error)
            }
        }
        this.addSummonsToEncounter();
        this.setState(
            {summonedCreature:
                    this.creatureViewModelFactory.createSummonedCreature(
                        PathfinderCreaturePropertiesViewModel
                    )
            })
    };

    addSummonsToEncounter = (): void => {
        for(let i=0; i < this.state.howMany; i++) {
            this.props.addToEncounter(this.state.summonedCreature);
        }
    }

    handleImageChange = ({meta, file}, status): void => {
        const creature = this.state.summonedCreature;
        creature.creatureProperties.image = file;
        this.setState({summonedCreature: creature});
        if (status === "removed") {
            creature.creatureProperties.image = null;
            this.setState({summonedCreature: creature})
        }
    };

    handleNameChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.name = event.target.value;
        this.setState({summonedCreature: summonedCreature})
    };

    handleHitpointsChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.creatureProperties.hitpoints = null;
        if (!isNaN(parseInt(event.target.value))) summonedCreature.creatureProperties.hitpoints = parseInt(event.target.value);
        this.setState({summonedCreature: summonedCreature})
    };

    handleArmorClassChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.creatureProperties.armorclass = null;
        if (!isNaN(parseInt(event.target.value))) summonedCreature.creatureProperties.armorclass = parseInt(event.target.value);
        this.setState({summonedCreature: summonedCreature})
    };

    handleIniChange = (event): void => {
        const summonedCreature = this.state.summonedCreature;
        summonedCreature.creatureProperties.ini = null;
        if (!isNaN(parseInt(event.target.value))) summonedCreature.creatureProperties.ini = parseInt(event.target.value);
        this.setState({summonedCreature: summonedCreature})
    };

    handleSubmitToDBChange = (event): void => {
        this.setState({submitToDB: event})
    };

    handleHowManyChange = (event): void => {
        let howMany = '';
        if (!isNaN(parseInt(event.target.value))) howMany = event.target.value;
        this.setState({howMany: howMany})
    };

    shouldDisplay = (): CSSProperties => {
        if (this.state.isDisplayed) {
            return IS_DISPLAYED;
        }
        return IS_NOT_DISPLAYED;
    };

    toggleDisplayForm = (): void => {
        this.setState({isDisplayed: !this.state.isDisplayed})
    };

    render(): ReactNode {
        return (
            <div className={style.addSummonDialog}>
                <div className={style.summonButtonContainer}>
                    <img
                        className={style.summonDialogButton} src={'images/summon-button.png'}
                        onClick={this.toggleDisplayForm}
                    />
                </div>
                <div className={style.addSummonFormContainer} style={this.shouldDisplay()}>
                    <h3 className={style.summonFormHeader}>Summon a creature</h3>
                    <form className={style.summonForm} onSubmit={this.handleSubmit}>
                        <div className={style.summonFormSection}>
                            <label className={style.summonFormTextInputLabel}>
                                Name:
                                <input
                                    className={style.SummonFormTextInputField}
                                    value={this.state.summonedCreature.name}
                                    onChange={this.handleNameChange}
                                    required
                                />
                            </label>
                            <label className={style.summonFormTextInputLabel}>
                                Hitpoints:
                                <input
                                    className={style.SummonFormTextInputField}
                                    type={"number"}
                                    value={this.state.summonedCreature.creatureProperties.hitpoints}
                                    onChange={this.handleHitpointsChange}
                                    required
                                />
                            </label>
                            <label className={style.summonFormTextInputLabel}>
                                Armorclass:
                                <input
                                    className={style.SummonFormTextInputField}
                                    type={"number"}
                                    value={this.state.summonedCreature.creatureProperties.armorclass}
                                    onChange={this.handleArmorClassChange}
                                    required
                                />
                            </label>
                            <label className={style.summonFormTextInputLabel}>
                                Ini:
                                <input
                                    className={style.SummonFormTextInputField}
                                    type={"number"}
                                    value={this.state.summonedCreature.creatureProperties.ini}
                                    onChange={this.handleIniChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className={style.summonFormSection}>
                            <label>
                                <Dropzone
                                    onChangeStatus={this.handleImageChange}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    accept="image/*"
                                    inputContent="Drop an Image"
                                    styles={{
                                        dropzone: {
                                            width: "12em",
                                            height: "6em",
                                            float: "right",
                                            color: "lightgrey",
                                            overflow: "hidden",
                                            margin: "0em"
                                        },
                                        dropzoneActive: {borderColor: 'purple'}
                                    }}
                                />
                            </label>
                        </div>
                        <div className={style.keepCreatureText}>
                            <span>Keep it forever?</span>
                        </div>
                        <Switch
                            checked={this.state.submitToDB}
                            onChange={this.handleSubmitToDBChange}
                            className={style.submitToDBSwitch}
                            onColor={'#8B008B'}
                        />
                        <button type={"submit"} className={style.summonSubmit}/>
                        <div className={style.howManyFormSection}>
                            <label className={style.howManyInputLabel}>
                                How many?
                                <input
                                    className={style.howManyInputField}
                                    type={"number"}
                                    value={this.state.howMany}
                                    onChange={this.handleHowManyChange}
                                    required
                                />
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}