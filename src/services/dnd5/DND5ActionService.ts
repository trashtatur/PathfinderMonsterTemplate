import {Service} from "@tsed/di";
import {DND5ActionModel} from "../../model/dnd5/DND5ActionModel";
import {DND5ActionForm} from "../../validation/dnd5/DND5ActionForm";
import {DND5ActionRepository} from "../../repositories/dnd5/DND5ActionRepository";
import {DataValidationException} from "../../exception/DataValidationException";
import {deserialize} from "typescript-json-serializer";

@Service()
export class DND5ActionService
{
    private dnd5ActionForm: DND5ActionForm;
    private dnd5ActionRepository: DND5ActionRepository;

    constructor(
        dnD5ActionForm: DND5ActionForm,
        dnD5ActionRepository: DND5ActionRepository
    ) {
        this.dnd5ActionForm = dnD5ActionForm;
        this.dnd5ActionRepository = dnD5ActionRepository;
    }

    create = async (actionData): Promise<DND5ActionModel> => {
        const validatedData = this.dnd5ActionForm.validate(actionData)
        if (validatedData) {
            const actionModel = deserialize(actionData, DND5ActionModel);
            return this.dnd5ActionRepository.create(actionModel);
        } else {
            throw new DataValidationException(`DND5 Action could not be created, data is not valid`)
        }
    }

    bulkCreate = async (actionDataArray: Array<any>): Promise<DND5ActionModel[]> => {
        const viewModels = actionDataArray.map(actionDataEntry => {
            const validatedData = this.dnd5ActionForm.validate(actionDataEntry)
            if (validatedData) {
                return deserialize(validatedData, DND5ActionModel);
            } else {
                throw new DataValidationException(`DND5 Action could not be created, data is not valid`)
            }
        })
        return this.dnd5ActionRepository.bulkCreate(viewModels)
    }

    delete = async (id: string): Promise<boolean> => {
        return this.dnd5ActionRepository.delete(id);
    }

    update = async (actionData): Promise<DND5ActionModel> => {
        const validatedData = this.dnd5ActionForm.validate(actionData)
        if (validatedData) {
            const actionModel = deserialize(validatedData, DND5ActionModel);
            return this.dnd5ActionRepository.update(actionModel);
        } else {
            throw new DataValidationException(`DND5 Action could not be updated, data is not valid`)
        }
    }

    findOneBy = async (key, value): Promise<DND5ActionModel> => {
        return this.dnd5ActionRepository.findOneBy(key, value);
    }

    findAll = async (): Promise<DND5ActionModel[]> => {
        return this.dnd5ActionRepository.findAll();
    }
}