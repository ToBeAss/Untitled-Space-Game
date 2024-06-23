import { assetManager } from "../main.js";

export class Asset
{
    constructor(element, src)
    {
        this.element = element;
        this.type = element.tagName.toLowerCase();
        this.src = src;
        assetManager.addAsset(this);
    }

    load() {
        return new Promise((resolve) => {
            if (this.type === 'img') {
                this.element.onload = () => resolve();
            } else if (this.type === 'audio') {
                this.element.onloadeddata = () => resolve();
                this.element.preload = 'auto';
            }
            this.element.src = this.src;
        });
    }
}