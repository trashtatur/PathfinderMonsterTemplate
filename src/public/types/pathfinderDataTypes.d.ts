import {RangeTypeEnum} from "../model/enumeration/RangeTypeEnum";
import {TypeEnum} from "../model/enumeration/TypesEnum";
import {AlignmentEnum} from "../model/enumeration/AlignmentEnum";
import {PathfinderCreatureSizeEnum} from "../model/enumeration/pathfinder/PathfinderCreatureSizeEnum";
import {PathfinderDamageTypesEnum} from "../model/enumeration/pathfinder/PathfinderDamageTypesEnum";
import {attackPropertyData, creatureStatsData, damageData, languageData, skillData} from "./commonDataTypes";

type pathfinderCreaturePropertiesData = {
    _id: string;
    _type: TypeEnum;
    _armorclass: number;
    _hitpoints: number;
    _alignment: AlignmentEnum;
    _creatureClass: string;
    _challenge: number;
    _movement: number;
    _ini: number;
    _baseAtk: number;
    _size: PathfinderCreatureSizeEnum;
    _stats: creatureStatsData;
    _saveThrows: pathfinderSavingThrowsData;
    _xp?: number;
    _image?: string;
    _actions?: pathfinderActionData[];
    _languages?: languageData[];
    _skills?: skillData[];
    _talents?: pathfinderTalentData[];
    _attackProperties?: attackPropertyData[];
}
type pathfinderSavingThrowsData = {
    _reflex: number;
    _wisdom: number;
    _fortitude: number;
}
export type pathfinderActionData = {
    _id: string;
    _name: string;
    _range: number;
    _rangeType: RangeTypeEnum.MELEE | RangeTypeEnum.RANGED;
    _critMod: number;
    _attackBonus: number;
    _damage: damageData;
    _damageTypes: pathfinderDamageTypesData;
    _additionalInfo?: string;
}
type pathfinderDamageTypesData = {
    _damageTypes: Array<PathfinderDamageTypesEnum>;
    _isMagic: boolean;
    _isHybrid: boolean;
}
export type pathfinderTalentData = {
    _id: string;
    _name: string;
    _type: string;
    _description: string;
    _benefits: string;
    _conditions?: string;
    _note?: string;
}