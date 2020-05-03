import {EntityToModelMapperInterface} from "../../EntityToModelMapperInterface";
import {DND5Skill} from "../../../db/schemas/DND5/DND5Skill";
import {DND5SkillModel} from "../../../model/dnd5/DND5SkillModel";

export class DND5SkillEntityToModelMapper implements EntityToModelMapperInterface<DND5Skill, DND5SkillModel> {
    map = (entity: DND5Skill): DND5SkillModel => {
        const skillLevel = entity['DND5CreatureSkill'] ?? null;
        return new DND5SkillModel(entity.uuid, entity.name, skillLevel)
    }

    mapMultiple = (entites?: DND5Skill[]): DND5SkillModel[] | null => {
        if (!entites) {
            return null;
        }
        return entites.map(entity => {
            return this.map(entity);
        })
    }
}