// preloader.js
export class Preloader {
    constructor() {
        this.assets = [];
    }

    addAsset(asset) {
        this.assets.push(asset);
    }

    loadAll() {
        return Promise.all(this.assets.map(asset => asset.load()));
    }
}
