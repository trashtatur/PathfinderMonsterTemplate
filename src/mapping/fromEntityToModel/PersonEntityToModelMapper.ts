import {EntityToModelMapperInterface} from "../EntityToModelMapperInterface";
import {PersonModel} from "../../model/PersonModel";
import {Person} from "../../db/schemas/Person";
import {SceneEntityToModelMapper} from "./SceneEntityToModelMapper";
import {AdventureEntityToModelMapper} from "./AdventureEntityToModelMapper";
import {Service} from "@tsed/di";
import {AdventureModel} from "../../model/AdventureModel";
import {SceneModel} from "../../model/SceneModel";

export class PersonEntityToModelMapper implements EntityToModelMapperInterface{

    map(entity: Person): PersonModel {
        let adventures = [];
        if (entity.adventures !== undefined) {
            adventures = entity.adventures.map(adventure => {
                new AdventureModel(
                    adventure.uuid,
                    adventure.name,
                    adventure.core
                )
            })
        }
        let scenes = [];
        if (entity.scenes !== undefined) {
            scenes = entity.scenes.map(scene => {
                new SceneModel(
                    scene.uuid,
                    scene.number,
                    scene.name,
                    scene.hook,
                    scene.token,
                    scene.act,
                    scene.resolve,
                    [],
                    [],
                    scene.additionalDescription,
                    null,
                    null,
                    null
                )
            })
        }
        return new PersonModel(
            entity.id,
            entity.name,
            entity.type,
            entity.needs,
            entity.desires,
            entity.weaknesses,
            entity.enemies,
            entity.image,
            this.mapCustomFields(entity.customFields),
            entity.additionalDescription,
            adventures,
            scenes
        );
    }

    mapCustomFields = (customFieldsData: string): Map<string, string> => {
        const customFields: Map<string,string> =  new Map();
        return customFields;
    };

}