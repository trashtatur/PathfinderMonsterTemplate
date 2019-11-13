import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Creature} from "./Creature";
import {CreatureAction} from "./assocSchemas/CreatureAction";

@Table
export class Action extends Model<Action> {

    @PrimaryKey
    @Column({
        type:DataType.UUID
    })
    uuid: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    rangeType: string;

    @AllowNull(false)
    @Column
    attackBonus:string;

    @AllowNull(false)
    @Column(
        DataType.FLOAT
    )
    range;

    @AllowNull(false)
    @Column
    damage:string;

    @AllowNull(false)
    @Column
    critMod: string;

    @AllowNull(false)
    @Column
    damageType: string;

    @AllowNull(true)
    @Column
    additionalInfo: string;

    @BelongsToMany(()=>Creature, ()=>CreatureAction)
    creatures: Creature[]
}


