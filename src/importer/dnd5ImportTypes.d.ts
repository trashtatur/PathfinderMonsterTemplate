export type monsterLocation = {
	index: string;
	name: string;
	url: string;
}

export type actionImport = {
	name: string;
	attack_bonus: string;
	damage: damageImport[];
}

export type damageImport = {
	damage_type: {
		name: string;
	};
	damage_dice: string;
	damage_bonus: string;
}

export type proficiencyImport = {
	name: string;
	value: string;
}

export type monsterImport = {
	name: string;
	size: string;
	type: string;
	subtype: string;
	alignment: string;
	armor_class: number;
	hit_points: number;
	hit_dice: string;
	speed: object;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	proficiencies: proficiencyImport[];
	damage_vulnerabilities: string[];
	damage_resistances: string[];
	damage_immunities: string[];
	condition_immunities: string[];
	senses: object;
	languages: string;
	challenge_rating: string;
	actions: damageImport[];
}

export type spell = {
	name: string;
	desc: string[],
	higher_level: string[]; // higherLevelDescription
	range: string;
	components: string[];
	material: string;
	material: string;
	ritual: boolean;
	duration: string;
	concentration: boolean;
	casting_time: string; // castingTime
	level: number;
	school: {name: string;};
	classes: {name: string;}[];
	subclasses: {name: string;}[];
}