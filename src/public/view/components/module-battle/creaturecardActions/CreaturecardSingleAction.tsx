import * as React from "react";
import {ReactElement} from "react";
import {ActionViewModel} from "../../../../model/pathfinder/ActionViewModel";
import * as style from './creaturecardAction.css';

export interface SingleActionProps {
    action: ActionViewModel;
}

export class CreaturecardSingleAction extends React.Component<SingleActionProps> {

    render(): ReactElement {
        return (
            <div className={style.singleAction}>
                <span className={style.actionTitle}>{this.props.action.name}</span>
                <div className={style.action}>
                    <div className={style.actionLabelContainer}>
                     <span className={style.actionLabel}
                           style={{backgroundColor: 'coral', borderColor: 'coral'}}
                     >{this.props.action.rangeType}</span>
                        {this.props.action.attackBonus > 0 &&
                        <span className={style.actionLabel}
                              style={{backgroundColor: '#f24848', borderColor: '#f24848'}}
                        >+{this.props.action.attackBonus} to hit</span>
                        }
                        <span className={style.actionLabel}
                              style={{backgroundColor: '#e8de22', borderColor: '#e8de22'}}
                        >reach {this.props.action.range}</span>&nbsp;
                        <span className={style.actionLabel}
                              style={{backgroundColor: 'orange', borderColor: 'orange'}}
                        >{this.props.action.damage.getFullDamageString()}(x{this.props.action.critMod})</span>
                        <span className={style.actionLabel}
                              style={{backgroundColor: '#ef2867', borderColor: '#ef2867'}}
                        >{this.props.action.damageType.getFullDamageTypeString()}</span>
                    </div>
                    { this.props.action.additionalInfo &&
                        <div className={style.additionalInfo}>
                            {this.props.action.additionalInfo}
                        </div>
                    }
                </div>
            </div>
        )
    }
}