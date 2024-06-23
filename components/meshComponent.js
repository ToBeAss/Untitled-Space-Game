import { Asset } from "./Asset.js";

export class MeshComponent extends Asset
{
    constructor(src, alpha)
    {
        super(new Image(), src);
        this.alpha = alpha || 1;
    }
}