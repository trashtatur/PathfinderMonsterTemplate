import {DND5CreaturePropertiesViewModel} from "../../model/dnd5/DND5CreaturePropertiesViewModel";
import {DiceRollSpecification} from "../../model/dataModel/DiceRollSpecification";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {DND5CreatureTypeEnum} from "../../model/enumeration/dnd5/DND5CreatureTypeEnum";
import {DND5CreatureStatsModel} from "../../model/dataModel/dnd5/DND5CreatureStatsModel";
import {DND5CreatureSizesEnum} from "../../model/enumeration/dnd5/DND5CreatureSizesEnum";
import {DND5SpellSlotsViewModel} from "../../model/dataModel/dnd5/DND5SpellSlotsViewModel";
import {DND5SavingThrowsModel} from "../../../model/dataModel/dnd5/DND5SavingThrowsModel";
import {TypeEnum} from "../../model/enumeration/TypesEnum";

export class DND5CreaturePropertiesViewModelFactory {
    createEmpty = (): DND5CreaturePropertiesViewModel => {
        return new DND5CreaturePropertiesViewModel(
            '',
            TypeEnum.NONE,
            null,
            null,
            '',
            null,
            new DiceRollSpecification(null, null),
            AlignmentEnum.NONE,
            [],
            DND5CreatureTypeEnum.NONE,
            null,
            null,
            new DND5CreatureStatsModel(
                null,
                null,
                null,
                null,
                null,
                null
            ),
            DND5CreatureSizesEnum.NONE,
            '',
            new DND5SpellSlotsViewModel(
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ),
            [],
            [],
            [],
            [],
            [],
            new DND5SavingThrowsModel(),
            '',
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        )
    }

    createSummon = (): DND5CreaturePropertiesViewModel => {
        return null;
    }
}