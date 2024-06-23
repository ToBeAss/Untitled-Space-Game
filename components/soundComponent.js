import { Asset } from "./Asset.js";

export class SoundComponent extends Asset
{
    constructor(src, volume)
    {
        super(new Audio(), src);
        this.volume = volume || 1;
    }
}