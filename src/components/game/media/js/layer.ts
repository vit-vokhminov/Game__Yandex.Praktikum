import configGame from "./configGame";

export class Layer {
    constructor(sprite, speed, speedLayer, canvas_height, ctx) {
        this.sprite = sprite;
        this.x = 0;
        this.y = 0;
        this.w = 1920;
        this.canvas_height = canvas_height;
        this.h = 1080;
        this.speedGame = speed;
        this.speedLayer = speedLayer;
        this.ctx = ctx;
        //this.speed = this.speedGame * this.speedLayer;
    }

    update() {
        if (!configGame.isPause) {
            const speed = configGame.speedGame * this.speedLayer;
            if (this.x <= -this.w) this.x = 0;
            this.x -= speed;
            this.x = this.x - speed;
        }

        this.draw();
    }

    draw() {
        this.ctx?.drawImage(this.sprite, this.x, this.canvas_height - this.h);
        this.ctx?.drawImage(this.sprite, this.x + this.w, this.canvas_height - this.h);
    }
}
