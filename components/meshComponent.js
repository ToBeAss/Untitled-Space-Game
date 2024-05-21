export class MeshComponent
{
    constructor(src, alpha)
    {
        this.image = new Image();
        this.src = src;
        this.alpha = alpha || 1;
    }

    load() {
        return new Promise((resolve) => {
            this.image.onload = () => {
                resolve();
            };
            this.image.src = this.src;
        });
    }
}