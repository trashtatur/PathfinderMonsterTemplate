import {ModelInterface} from "./ModelInterface";
import {Damage} from "./dataModel/Damage";
import {RangeType} from "./dataModel/RangeType";
import {DamageType} from "./dataModel/DamageType";

export class ActionModel implements ModelInterface {
    private readonly _name: string;
    private readonly _rangeType: RangeType;
    private readonly _attackBonus: number;
    private readonly _range: number;
    private readonly _damage: Damage;
    private readonly _critMod: number;
    private readonly _damageTypes: DamageType;
    private readonly _additionalInfo: string;

    constructor(
        name: string,
        rangeType: RangeType,
        attackBonus: number,
        range: number,
        damage: Damage,
        critMod: number,
        damageType: DamageType,
        additionalInfo?: string
    ) {
        this._name = name;
        this._rangeType = rangeType;
        this._attackBonus = attackBonus;
        this._range = range;
        this._damage = damage;
        this._critMod = critMod;
        this._damageTypes = damageType;
        this._additionalInfo = additionalInfo;
    }

    get name(): string {
        return this._name;
    }

    get rangeType(): RangeType {
        return this._rangeType;
    }

    get attackBonus(): number {
        return this._attackBonus;
    }

    get range(): number {
        return this._range;
    }

    get damage(): Damage {
        return this._damage;
    }

    get critMod(): number {
        return this._critMod;
    }

    get damageTypes(): DamageType {
        return this._damageTypes;
    }

    get additionalInfo(): string {
        return this._additionalInfo;
    }
}