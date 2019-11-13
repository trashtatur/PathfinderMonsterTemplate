import {BodyParams, Controller, Get, PathParams, Post, Put} from "@tsed/common";
import {Language} from "../../db/schemas/Language";
import {Talent} from "../../db/schemas/Talent";
import {Skill} from "../../db/schemas/Skill";
import {Sense} from "../../db/schemas/Sense";
import {Action} from "../../db/schemas/Action";
import {CreatureService} from "./Services/CreatureService";
import {Includeable} from "sequelize";


@Controller('/creature')
export class CreatureResourceController {
    private creatureService: CreatureService;

    constructor(creatureService: CreatureService) {
        this.creatureService = creatureService;
    }

    /**
     * creatureData defined as follow:
     * {
     *      name: string,
     *      hitpoints: int,
     *      alignment: string,
     *      armorclass: number,
     *      creatureClass: string,
     *      challenge: int,
     *      movement: int,
     *      ini: int,
     *      baseAtk: int,
     *      ?xp: int,
     *      ?image: string,
     *      size: string',
     *      stats:{"str":int,"dex":int,"wis":int,"int":int,"ch":int,"con":int},
     *      saveThrows:{"REF":int,"WILL":int,"FORT":int},
     *      ?languages: [string],
     *      ?skills: [string],
     *      ?talents: [string],
     *      ?actions: [Action],
     *      ?senses: [string]
     * }
     * @param creatureData
     */
    @Post()
    async createCreature(@BodyParams('creatureData')creatureData:object): Promise<string> {
        let includeList = this.determineIncludeList(creatureData);
        let creature = await this.creatureService.create(creatureData,includeList);
        return JSON.stringify(creature)
    }

    @Put('/name/:creatureName')
    async updateOneCreature(@BodyParams('creatureData') creatureData:object): Promise<string> {
        let includeList = this.determineIncludeList(creatureData);
        let updated_creature = await this.creatureService.update(creatureData,includeList);
        return JSON.stringify(updated_creature)
    }

    @Get()
    async allCreatures(): Promise<string> {
        let creatures = await this.creatureService.findAll([Language,Talent,Skill,Sense,Action]);
        return JSON.stringify(creatures)
    }

    @Get('/name/:creatureName')
    async creatureByName(@PathParams("creatureName") creatureName: string): Promise<string> {
        let creature = await this.creatureService.findOneBy('name',creatureName,[Language,Talent,Skill,Sense,Action]);
        return JSON.stringify(creature)
    }

    private determineIncludeList(creatureData:object): Includeable[] {
        let includeList = [];
        if ("languages" in creatureData) includeList.push(Language);
        if ("skills" in creatureData) includeList.push(Skill);
        if ("talents" in creatureData) includeList.push(Talent);
        if ("actions" in creatureData) includeList.push(Action);
        if ("senses" in creatureData) includeList.push(Sense);
        return includeList
    }
}