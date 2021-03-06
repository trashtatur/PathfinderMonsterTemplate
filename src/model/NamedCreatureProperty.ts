import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class NamedCreatureProperty {
    @JsonProperty({name: 'name'})
    private readonly _name: string;
    @JsonProperty({name: 'property'})
    private readonly _property: string;

    constructor(
        name: string,
        property: string
    ) {
        this._name = name;
        this._property = property;
    }

    get name(): string {
        return this._name;
    }

    get property(): string {
        return this._property;
    }
}