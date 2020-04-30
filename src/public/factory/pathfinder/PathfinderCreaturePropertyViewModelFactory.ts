import {PathfinderCreaturePropertiesViewModel} from "../../model/pathfinder/PathfinderCreaturePropertiesViewModel";
import {AlignmentEnum} from "../../model/enumeration/AlignmentEnum";
import {CreatureSizesEnum} from "../../model/enumeration/CreatureSizesEnum";
import {PathfinderStatsViewModel} from "../../model/dataModel/pathfinder/PathfinderStatsViewModel";
import {PathfinderSavingThrowsViewModel} from "../../model/dataModel/pathfinder/PathfinderSavingThrowsViewModel";

export class PathfinderCreaturePropertiesViewModelFactory {

    createEmpty = (): PathfinderCreaturePropertiesViewModel => {
        return new PathfinderCreaturePropertiesViewModel(
            null,
            null,
            null,
            null,
            AlignmentEnum.NONE,
            '',
            null,
            null,
            null,
            null,
            CreatureSizesEnum.EMPTY,
            new PathfinderStatsViewModel(
                null,
                null,
                null,
                null,
                null,
                null,
                CreatureSizesEnum.EMPTY,
                null),
            new PathfinderSavingThrowsViewModel(
                null,
                null,
                null
            ),
            0,
            '',
            [],
            [],
            [],
            [],
            []
        )
    }

    createSummon = (): PathfinderCreaturePropertiesViewModel => {
        return new PathfinderCreaturePropertiesViewModel(
            null,
            null,
            null,
            null,
            AlignmentEnum.NONE,
            'summoned Entity',
            1,
            9,
            null,
            0,
            CreatureSizesEnum.MEDIUM,
            new PathfinderStatsViewModel(10, 10, 10, 10, 10, 10, CreatureSizesEnum.MEDIUM, 0),
            new PathfinderSavingThrowsViewModel(0, 0, 0),
            0,
            '',
            null,
            null,
            null,
            null,
            null
        )
    }
}