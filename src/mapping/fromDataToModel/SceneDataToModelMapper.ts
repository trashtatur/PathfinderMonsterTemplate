import {DataToModelMapperInterface} from "../DataToModelMapperInterface";
import {SceneModel} from "../../model/SceneModel";
import {sceneData} from "../../types/backendTypes";
import {PersonModel} from "../../model/PersonModel";

export class SceneDataToModelMapper implements DataToModelMapperInterface<SceneModel> {
    map(data: sceneData): SceneModel {
        return new SceneModel(
            data._id,
            data._adventureId,
            data._number,
            data._name,
            data._hook,
            data._token,
            data._act,
            data._resolve,
            this.mapNestedScenes(data._parentScenes),
            data._additionalDescription,
            data._images,
            data._treasure,
            []
        )
    }

    private mapNestedScenes = (data: sceneData[]): SceneModel[] => {
        const sceneModels = [];
        data.forEach(data => {
            sceneModels.push(new SceneModel(
                data._id,
                data._adventureId,
                data._number,
                data._name,
                data._hook,
                data._token,
                data._act,
                data._resolve,
                null,
                data._additionalDescription,
                data._images,
                data._treasure,
                null
            ));
        })
        return sceneModels;
    }
}