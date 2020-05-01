import {Service} from "@tsed/di";
import {DND5LanguageModel} from "../../model/dnd5/DND5LanguageModel";

@Service()
export class DND5LanguageRepository {

    create = async(dnd5LanguageModel: DND5LanguageModel): Promise<DND5LanguageModel> => {

    }

    bulkCreate = async(dnd5Languagemodels: DND5LanguageModel[]): Promise<DND5LanguageModel[]> => {

    }

    delete = async(id: string): Promise<boolean> => {

    }

    update = async(dnd5Language: DND5LanguageModel): Promise<DND5LanguageModel> => {

    }

    findOneBy = async(key, value): Promise<DND5LanguageModel> => {

    }

    findAll = async(): Promise<DND5LanguageModel[]> => {

    }
}