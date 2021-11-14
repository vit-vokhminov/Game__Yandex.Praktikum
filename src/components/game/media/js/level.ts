import { loadStaticImage } from './loadImages';
import { Background } from './types';
import { Layer } from './layer';
import {
    // фоновые картинки
    /* level1 */
    l1_sky,
    l2_clouds,
    l3_pyramid,
    l4_bg_ground01,
    l5_bg_ground02,
    l6_bg_ground03,
    l7_ground,
    /* level2 */
    l2_l1_sky,
    l2_l3_clouds,
    l2_l2_mountains,
    l2_l4_bg_ground01,
    l2_l5_bg_ground02,
    l2_l6_ground,
    /* levels3 */
    l3_l1_wall,
    l3_l2_prop01,
    l3_l3_prop02,
    l3_l4_stones,
    l3_l5_crystals,
    l3_l6_ground,
    /* levels4 */
    l4_l1_sky,
    l4_l2_stars,
    l4_l4_clouds02,
    l4_l5_mountains,
    l4_l6_ground01,
    l4_l7_ground02,
    l4_l8_ground,
} from './assetsLinks';
import configGame from './configGame';

const speedLayer = [0, 0.0001, 0.0005, 0.001, 0.02, 0.08, 0.4];
export class Level {
    level1: Background[];

    constructor(x, y, speed, canvas, ctx, loadingSprite) {
        this.x = x;
        this.y = y;
        this.w = 1920;
        this.h = canvas.height;
        this.ctx = ctx;
        this.pause = false;
        this.speed = speed;
        this.loadingSprite = loadingSprite;
        this.activeLevel = 'level1';
        this.levelSprite = {
            level1: [],
            level2: [],
            level3: [],
            level4: [],
        };
        this.levels = {
            level1: undefined,
            level2: undefined,
            level3: undefined,
            level4: undefined,
        };
    }

    preloader() {

        this.levelSprite.level1 = [
            {
                path: loadStaticImage(l1_sky, this.loadingSprite),
                x: 0,
                x2: 0,
                speed: speedLayer[0],
            },
            {
                path: loadStaticImage(l2_clouds, this.loadingSprite),
                x: 0,
                x2: 0,
                speed: speedLayer[1],
            },
            {
                path: loadStaticImage(l3_pyramid, this.loadingSprite),
                x: 0,
                x2: 0,
                speed: speedLayer[2],
            },
            {
                path: loadStaticImage(l4_bg_ground01, this.loadingSprite),
                x: 0,
                x2: 0,
                speed: speedLayer[3],
            },
            {
                path: loadStaticImage(l5_bg_ground02, this.loadingSprite),
                x: 0,
                x2: 0,
                speed: speedLayer[4],
            },
            {
                path: loadStaticImage(l6_bg_ground03, this.loadingSprite),
                x: 0,
                x2: 0,
                speed: speedLayer[5],
            },
            {
                path: loadStaticImage(l7_ground, this.loadingSprite),
                x: 0,
                x2: 0,
                speed: speedLayer[6],
            },
        ];
        this.levelSprite.level2 = [
            {
                path: loadStaticImage(l2_l1_sky),
                x: 0,
                x2: 0,
                speed: speedLayer[0],
            },
            {
                path: loadStaticImage(l2_l3_clouds),
                x: 0,
                x2: 0,
                speed: speedLayer[1],
            },
            {
                path: loadStaticImage(l2_l2_mountains),
                x: 0,
                x2: 0,
                speed: speedLayer[3],
            },
            {
                path: loadStaticImage(l2_l4_bg_ground01),
                x: 0,
                x2: 0,
                speed: speedLayer[4],
            },
            {
                path: loadStaticImage(l2_l5_bg_ground02),
                x: 0,
                x2: 0,
                speed: speedLayer[5],
            },
            {
                path: loadStaticImage(l2_l6_ground),
                x: 0,
                x2: 0,
                speed: speedLayer[6],
            },
        ];

        this.levelSprite.level3 = [
            {
                path: loadStaticImage(l3_l1_wall),
                x: 0,
                x2: 0,
                speed: speedLayer[0],
            },
            {
                path: loadStaticImage(l3_l2_prop01),
                x: 0,
                x2: 0,
                speed: speedLayer[1],
            },
            {
                path: loadStaticImage(l3_l3_prop02),
                x: 0,
                x2: 0,
                speed: speedLayer[3],
            },
            {
                path: loadStaticImage(l3_l4_stones),
                x: 0,
                x2: 0,
                speed: speedLayer[4],
            },
            {
                path: loadStaticImage(l3_l5_crystals),
                x: 0,
                x2: 0,
                speed: speedLayer[5],
            },
            {
                path: loadStaticImage(l3_l6_ground),
                x: 0,
                x2: 0,
                speed: speedLayer[6],
            },
        ];

        this.levelSprite.level4 = [
            {
                path: loadStaticImage(l4_l1_sky),
                x: 0,
                x2: 0,
                speed: speedLayer[0],
            },
            {
                path: loadStaticImage(l4_l2_stars),
                x: 0,
                x2: 0,
                speed: speedLayer[1],
            },
            {
                path: loadStaticImage(l4_l4_clouds02),
                x: 0,
                x2: 0,
                speed: speedLayer[2],
            },
            {
                path: loadStaticImage(l4_l5_mountains),
                x: 0,
                x2: 0,
                speed: speedLayer[3],
            },
            {
                path: loadStaticImage(l4_l6_ground01),
                x: 0,
                x2: 0,
                speed: speedLayer[4],
            },
            {
                path: loadStaticImage(l4_l7_ground02),
                x: 0,
                x2: 0,
                speed: speedLayer[5],
            },
            {
                path: loadStaticImage(l4_l8_ground),
                x: 0,
                x2: 0,
                speed: speedLayer[6],
            },
        ];
    }

    update() {
        this.draw();
    }

    init() {
        this.levels.level1 = this.levelSprite.level1.map((layer) => {
            return new Layer(layer.path, this.speed, layer.speed, this.h, this.ctx);
        });
        this.levels.level2 = this.levelSprite.level2.map((layer) => {
            return new Layer(layer.path, this.speed, layer.speed, this.h, this.ctx);
        });
        this.levels.level3 = this.levelSprite.level3.map((layer) => {
            return new Layer(layer.path, this.speed, layer.speed, this.h, this.ctx);
        });
        this.levels.level4 = this.levelSprite.level4.map((layer) => {
            return new Layer(layer.path, this.speed, layer.speed, this.h, this.ctx);
        });
    }

    setPause() {
        this.levels[configGame.level].forEach(el => {
            el.speedGame = 0;
        })
    }

    draw() {
        const a = configGame.level;
        this.levels[a].forEach((level) => {
            level.update();
        })
    }
}