import { SpriteImage } from './types';
import condigGame from './configGame';

type SkinsHeroType = {
    angel1: number;
    angel2: number;
    angel3: number;
    angel4: number;
};

const skinsHero: SkinsHeroType = {
    angel1: 0,
    angel2: 200,
    angel3: 400,
    angel4: 600,
};

export class Hero {
    x: number;

    y: number;

    vy: number;

    jumpTimer: number;

    grounded: boolean;

    jumpForce: number;

    ctx: CanvasRenderingContext2D | null;

    actionRun: boolean;

    actionJump: boolean;

    gravity: number;

    canvas: HTMLCanvasElement;

    skins: {
        run: SpriteImage | undefined,
        jump: SpriteImage | undefined,
        hurt: SpriteImage | undefined,
        stand: SpriteImage | undefined,
    };

    skinHero: string;

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D | null,
        gravity: number, speed,
    ) {
        this.x = 70;
        this.w = 136;
        this.h = 136;
        this.y = -200;
        this.vy = 0;
        this.speed = speed;
        this.canvas = canvas;
        this.ctx = ctx;
        this.gravity = gravity;
        this.jumpForce = 10;
        this.grounded = false;
        this.jumpTimer = 0;
        this.skinHero = condigGame.hero;
        this.landing = false;
        this.skins = {
            run: undefined,
            jump: undefined,
            hurt: undefined,
            stand: undefined,
        };
        this.actions = {
            run: true,
            jump: false,
            hurt: false,
            stand: false,
        };
    }

    Move(): void {
        const offset: number = skinsHero[this.skinHero];
        if (this.actions.jump) {
            this.actions.run = false;
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }
        //Gravity
        this.y += this.vy;
        if (this.y + this.h * 2.7 < this.canvas.height) {
            this.vy += this.gravity;
            this.grounded = false;
        } else {
            this.vy = 0;
            this.grounded = true;
            if (!this.actions.stand) {
                this.actions.run = true;
            }
            this.y = this.canvas.height - this.h * 2.7;
        }

        this.Show();
    }

    Jump(): void {
        if (this.grounded && this.jumpTimer === 0) {
            this.jumpTimer = 1;
            this.vy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < this.jumpForce + 10) {
            this.jumpTimer += 1;
            this.vy = -this.jumpForce - (this.jumpTimer / 100);
        } else if (this.grounded) {
            console.log('stoooop')
            //this.actions.jump = false;
            //this.actions.run = true;
        }
    }

    deathHero() {
        this.actions.hurt = true;
        this.Draw(this.skins.hurt, this.x, this.y, skinsHero[condigGame.hero]);
    }

    Show(): void {
        if (this.actions.run) {
            this.actions.jump = false;
            this.actions.hurt = false;
            this.actions.stand = false;
            this.Draw(this.skins.run, this.x, this.y, skinsHero[condigGame.hero]);
        } else if (this.actions.jump || !this.grounded) {
            this.actions.run = false;
            this.actions.hurt = false;
            this.actions.stand = false;
            this.Draw(this.skins.jump, this.x, this.y, skinsHero[condigGame.hero]);
        } else if (this.actions.stand) {
            this.actions.run = false;
            this.actions.jump = false;
            this.actions.hurt = false;
            this.Draw(this.skins.stand, this.x, this.y, skinsHero[condigGame.hero]);
        } else if (this.actions.hurt) {
            this.actions.run = false;
            this.actions.jump = false;
            this.actions.stand = false;
            this.Draw(this.skins.hurt, this.x, this.y, skinsHero[condigGame.hero]);
        }
    }

    isStaticHero() {
        this.actions.run = false;
        this.actions.jump = false;
        this.actions.stand = true;
        this.actions.hurt = false;
    }

    isGoHero() {
        this.actions.run = true;
        this.actions.jump = false;
        this.actions.stand = false;
        this.actions.hurt = false;
    }

    Draw(sprite: SpriteImage | undefined, x: number, y: number, offset: number) {
        sprite.tickCount += this.speed / 20;
        if (sprite.tickCount > sprite.ticksFrame) {
            sprite.tickCount = 0;
            if (sprite.frameIndex < sprite.colFrames - 1) {
                sprite.frameIndex += 1;
            } else {
                sprite.frameIndex = 0;
            }
        }
        // отрисовка изображения на canvas
        this.ctx?.drawImage(
            sprite.dom,
            sprite.frameIndex * sprite.width,
            0 + offset,
            sprite.width,
            sprite.height,
            x,
            y,
            sprite.width,
            sprite.height,
        );
    }
}
