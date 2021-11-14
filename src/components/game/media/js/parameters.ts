/* eslint-disable camelcase */
//eslint-disable-line
import {
    HeroRun,
    HeroJump,
    HeroStand,
    HeroDeath2,

    Pussy_attack_all2,
    Pussy_level1,
    Pussy_level2,
    Pussy_level3,
    Pussy_level4,
    // аудио файлы
    Jump,
    Death,
    theme1,
    theme2,
    theme3,
    theme4,
} from './assetsLinks';

import { displayText, randomRange } from './utils';
import { loadSpriteImage } from './loadImages';
import loadAudio from './loadAudio';
import { Hero as Heero } from './hero';
import { Enemy } from './enemy';
import { Level } from './level';
import configGame from './configGame';
// import drawRunner from './drawRunner';

// соотношение разрешения дисплея текущего устройства
export const pixelDevice: number = (window.devicePixelRatio > 1) ? 2 : 1;
// стартовая скорость игры
const startSpeed: number = 8 / pixelDevice;

// настройки игры и canvas

type SkinsEnemyType = {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
}

const skinsEnemy: SkinsEnemyType = {
    level1: 0,
    level2: 1,
    level3: 2,
    level4: 3,
};


export class GAME2 {
    score: number;

    hero: Heero;

    gravity: number;

    canvas: HTMLCanvasElement;

    ctx: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement, pause) {
        this.canvas = canvas;
        this.ctx = null;
        this.dom = undefined;
        this.audioPlayed = true;
        this.score = 0;
        this.step = 0.0005;
        this.localRecord = 0;
        this.localStorageRecord = 0;
        this.gravity = configGame.gravity;
        this.pause = pause;
        this.speed = configGame.speedGame;
        this.isGameStopped = configGame.isGameStopped;
        this.isGameStatic = configGame.isGameStatic;
        this.hero = undefined;
        this.enemiesList = [];
        this.skinEnemies = [];
        this.level = undefined;
        this.initialSpawnTimer = 200;
        this.spawnTimer = this.initialSpawnTimer;
        this.countSprites = 4;
        this.countLoadedSprites = 0;
        this.setLeaderboard = () => null;
    }

    Start(): void {
        this.ctx = this.canvas.getContext('2d');
        this.level = new Level(0, 0, this.speed, this.canvas, this.ctx, this.loadingSprite);
        this.hero = new Heero(this.canvas, this.ctx, this.gravity, this.speed);
        this.Preloader();
        this.level.init();
        this.EventListener();
        this.Update();
        if (localStorage.getItem('localStorageRecord')) {
            this.localStorageRecord = Number(localStorage.getItem('localStorageRecord')) || 0;
        }
    }

    Update() {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (configGame.isPause) {
            configGame.speedGame = 0;
            this.level.pause = true;
            this.hero.isStaticHero();
        } else {
            this.hero.actions.stand = false;
            this.level.pause = false;
        }
        this.level.update();
        this.score += configGame.speedGame / 100;
        if (this.score > this.localRecord) {
            this.localRecord = Math.floor(this.score);
        }

        this.spawnTimer--;
        if (!configGame.isPause) {
            if (this.spawnTimer <= 0) {
                this.createEnemies(this.skinEnemies[skinsEnemy[configGame.level]]);
                this.spawnTimer = this.initialSpawnTimer - this.speed * 8;

                if (this.spawnTimer < 60) {
                    this.spawnTimer = 60;
                }
            }
        }

        for (let i = 0; i < this.enemiesList.length; i++) {
            let enemy = this.enemiesList[i];
            if (enemy.x + enemy.w < 0) {
                this.enemiesList.splice(i, 1);
            }
            if (
                this.hero.x < enemy.x + enemy.w - 80 &&
                this.hero.x + this.hero.w - 80 > enemy.x &&
                this.hero.y < enemy.y + enemy.h &&
                this.hero.y + this.hero.h > enemy.y + 35
            ) {
                this.hero.actions.run = false;
                this.hero.deathHero();

                enemy.actions.run = false;
                enemy.actions.attack = true;

                this.gameStopp();
            }
            //enemy.speed += this.step;
            enemy.Move();
        }

        if (!this.hero.actions.hurt) {
            this.hero.Move();
        }

        this.hero.speed += this.step;
        this.level.speed += this.step;
        this.speed += this.step;
        configGame.speedGame = this.speed;

        if (!configGame.isPause) {
            displayText(this.ctx, this.score, this.localStorageRecord);
        }

        if (!this.isGameStopped) {
            requestAnimationFrame(() => this.Update());
        }
    }

    EventListener(): void {
        const handlerKeypressDown = (event: { keyCode: number; }) => {
            if (event.keyCode === 32) {
                this.hero.actions.jump = !configGame.isPause && true;
                this.hero.actions.run = false;
            }
        };
        const handlerKeypressUp = (event: { keyCode: number; }) => {
            if (event.keyCode === 32) {
                this.hero.actions.jump = false;
            }
        };
        const handlerMouseDown = () => {
            this.hero.actions.jump = !configGame.isPause && true;
            this.hero.actions.run = false;
        };
        const handlerMouseUp = () => {
            this.hero.actions.jump = false;
        };
        document.addEventListener('mousedown', handlerMouseDown);
        document.addEventListener('mouseup', handlerMouseUp);
        document.addEventListener('keydown', handlerKeypressDown);
        document.addEventListener('keyup', handlerKeypressUp);
    }

    Preloader() {
        this.hero.skins.stand = loadSpriteImage(HeroStand, 200, 200, 18, 1);
        this.hero.skins.run = loadSpriteImage(HeroRun, 200, 200, 12, 1);
        this.hero.skins.jump = loadSpriteImage(HeroJump, 200, 200, 12, 1);
        this.hero.skins.hurt = loadSpriteImage(HeroDeath2, 200, 200, 1, 1);
        this.skinEnemies[0] = loadSpriteImage(Pussy_level1, 200, 200, 18, 1);
        this.skinEnemies[1] = loadSpriteImage(Pussy_level2, 200, 200, 12, 1);
        this.skinEnemies[2] = loadSpriteImage(Pussy_level3, 200, 200, 12, 1);
        this.skinEnemies[3] = loadSpriteImage(Pussy_level4, 200, 200, 12, 1);
        this.skinEnemies[4] = loadSpriteImage(Pussy_attack_all2, 200, 200, 1, 1);

        this.level.preloader();
    }

    loadedSprite() {
        this.countLoadedSprites += 1;
    }

    restart() {
        this.dom.gameBanner.current?.classList.add('hidden');
        this.enemiesList = [];
        this.score = 0;
        this.spawnTimer = this.initialSpawnTimer;
        this.speed = configGame.defaultSpeed;
        this.isGameStopped = false;
        this.Start();
    }

    gameStopp() {
        this.speed = 0;
        this.isGameStopped = true;
        this.enemiesList = [];
        this.hero.actions.run = false;
        this.dom.gameBanner.current?.classList.remove('hidden');
        document.exitPointerLock();
        // остановить аудио
        if (this.audioPlayed) {
            this.audioPlayed = false;
            AUDIO.Dead.play();
        }
        AUDIO.Theme1.stop();
        this.setLeaderboard(Math.floor(this.score));
        // запись нового рекорда
        if (this.localRecord > this.localStorageRecord) {
            const record = Math.floor(this.score);
            localStorage.setItem('localStorageRecord', String(record));
            this.localStorageRecord = record;
        }
    }

    createEnemies(skin) {
        let size = randomRange(250, 450);
        let typeSkin = randomRange(0, 2);
        const skinEnemy = Object.assign({}, skin, { attack: this.skinEnemies[4] });
        let obstacle = new Enemy(
            this.canvas.width + size,
            this.canvas.height - 200 * 1.5,
            this.speed, this.canvas, this.ctx, skinEnemy, typeSkin);
        this.enemiesList.push(obstacle);
    }
}

// аудио файлы
const selectAudioLevel = () => {
    switch (configGame.level) {
        case 'level1':
            return theme1;
        case 'level2':
            return theme2;
        case 'level3':
            return theme3;
        case 'level4':
            return theme4;
        default:
            return theme1;
    }
};
export const AUDIO = {
    Jump: loadAudio([Jump], 0.4),
    Dead: loadAudio([Death], 0.1),
    Theme1: loadAudio(() => selectAudioLevel(), 0.1),
};
