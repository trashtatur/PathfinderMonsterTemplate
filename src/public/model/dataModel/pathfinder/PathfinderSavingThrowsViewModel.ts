import {ApplyEffects} from "@/public/model/effects/decorator/DecoratorFunctions";

export class PathfinderSavingThrowsViewModel {
    private _reflex: number;
    private _wisdom: number;
    private _fortitude: number;

    constructor(
        reflex: number,
        wisdom: number,
        fortitude: number
    ) {
        this._reflex = reflex;
        this._wisdom = wisdom;
        this._fortitude = fortitude;
    }

    @ApplyEffects
    get reflex(): number {
        return this._reflex;
    }

    set reflex(value: number) {
        this._reflex = value;
    }

    @ApplyEffects
    get wisdom(): number {
        return this._wisdom;
    }

    set wisdom(value: number) {
        this._wisdom = value;
    }

    @ApplyEffects
    get fortitude(): number {
        return this._fortitude;
    }

    set fortitude(value: number) {
        this._fortitude = value;
    }
}