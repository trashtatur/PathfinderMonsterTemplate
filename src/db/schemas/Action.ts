import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureAction} from "./assocSchemas/CreatureAction";

@Table
export class Action extends Model<Action> {

    @PrimaryKey
    @Column({
        type:DataType.UUID, defaultValue:DataType.UUIDV4
    })
    uuid: string;

    @AllowNull(false)
    @Column({
        unique:'name_dmg'
    })
    name: string;

    @AllowNull(false)
    @Column
    rangeType: string;

    @AllowNull(false)
    @Column
    attackBonus:number;

    @AllowNull(false)
    @Column(
        DataType.FLOAT
    )
    range;

    @AllowNull(false)
    @Column({
        unique:'name_dmg'
    })
    damage:string;

    @AllowNull(false)
    @Column
    critMod: number;

    @AllowNull(false)
    @Column
    damageType: string;

    @AllowNull(true)
    @Column
    additionalInfo: string;

    @BelongsToMany(()=>Creature, ()=>CreatureAction)
    creatures: Creature[]
}


