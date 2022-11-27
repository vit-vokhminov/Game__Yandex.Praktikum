import {
    // фоновые картинки
    // level1
    img_11_sky,
    img_12_clouds,
    img_13_pyramid,
    img_14_bg_ground01,
    img_15_bg_ground02,
    img_16_bg_ground03,
    img_17_ground,

    // level2
    img_21_sky,
    img_23_clouds,
    img_22_mountains,
    img_24_bg_ground01,
    img_25_bg_ground02,
    img_26_ground,
    
    // levels3
    img_31_wall,
    img_32_prop01,
    img_33_prop02,
    img_34_stones,
    img_35_crystals,
    img_36_ground,

    // levels4
    img_41_sky,
    img_42_stars,
    img_44_clouds02,
    img_45_mountains,
    img_46_ground01,
    img_47_ground02,
    img_48_ground,

    // главный герой
    HeroRun,
    HeroJump,
    HeroStand,
    HeroDeath,

    // враги
    Pussy_level1,
    Pussy_level1_Attack,
    Pussy_level1_Stop,

    Pussy_level2,
    Pussy_level2_Attack,
    Pussy_level2_Stop,

    Pussy_level3,
    Pussy_level3_Attack,
    Pussy_level3_Stop,

    Pussy_level4,
    Pussy_level4_Attack,
    Pussy_level4_Stop,

    // аудио файлы
    Sound_Jump,
    Sound_Death,
    OST_level_1,
    OST_level_2,
    OST_level_3,
    OST_level_4,
} from './assetsLinks';
import {
    Game,
    Background,
    Hero
} from './types';
import { loadStaticImage, loadSpriteImage } from './loadImages';
import loadAudio from './loadAudio';

import Angel1 from 'assets/img/Angels1.png';
import Angel2 from 'assets/img/Angels2.png';
import Angel3 from 'assets/img/Angels3.png';
import Angel4 from 'assets/img/Angels4.png';
import Level1 from 'assets/img/level1.jpg';
import Level2 from 'assets/img/level2.jpg';
import Level3 from 'assets/img/level3.jpg';
import Level4 from 'assets/img/level4.jpg';

export const ANGELS: any = {
    hero1: {
        name: "Джуниор",
        avatar: Angel1
    },
    hero2: {
        name: "Мидл",
        avatar: Angel2
    },
    hero3: {
        name: "Cеньор",
        avatar: Angel3
    },
    hero4: {
        name: "Тимлид",
        avatar: Angel4
    },
}

export const LEVELS: any = {
    level1: {
        name: "Долина ветра",
        avatar: Level1
    },
    level2: {
        name: "Тихий лес",
        avatar: Level2
    },
    level3: {
        name: "Чернильные топи",
        avatar: Level3
    },
    level4: {
        name: "Блуждающие огни",
        avatar: Level4
    },
}

const clientHeight = window.innerHeight;
const clientWidth = window.innerWidth;

const spriteHeight = 150;
// соотношение разрешения дисплея текущего устройства
export const pixelDevice: number = window.devicePixelRatio;

// стартовая скорость игры
const startSpeed: number = 8 / pixelDevice;

// настройки игры и canvas
export const GAME: Game = {
    ctx: null,
    user: null,
    winWidth: clientWidth,
    winHeight: clientHeight,
    // координа на которой расположены персонажы
    y_positionLine: clientHeight - 220 - spriteHeight,
    // наименование Героя, просто указываю первый ключ в объекте
    heroName: Object.keys(ANGELS)[0],
    // наименование уровня, просто указываю первый ключ в объекте
    level: Object.keys(LEVELS)[0],
    // сколько всего картинок
    allCount: 42,
    // сколько загрузилось
    loadCount: 0,
    // выравнивание картинок исходя из пропорций экрана
    yPosBg: clientHeight <= 1080 ? clientHeight - 1080 : 1080 - clientHeight,
    xPosBg: clientWidth <= 1920 ? clientWidth - 1920 : 1920 - clientWidth,
    // скорость игры
    speed: startSpeed,
    // балансная переменная для увеличения скорости игры
    scoreCounter: 0,
    // счёт в игре
    score: 0,
    // цвет счёта в игре
    scoreColor: '#000000',
    // игра остановлена
    isGameStopped: false,
    // рекодр набирающий значения в процессе игры
    localRecord: 0,
    // разрешает воспроизведение аудио файлов
    audioPlayed: true,
    // html элементы dom
    dom: {},
    // получить рандомное значение из двух аргументов
    random: range => {
        const min = range[0];
        const max = range[1];
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    // используется для остановки requestAnimationFrame
    requestId: 0,
    setLeaderboard: () => null,
};

// фоновые картинки
const level1: Background[] = [
    {
        path: loadStaticImage(img_11_sky, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_12_clouds, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_13_pyramid, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_14_bg_ground01, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 40,
    },
    {
        path: loadStaticImage(img_15_bg_ground02, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 20,
    },
    {
        path: loadStaticImage(img_16_bg_ground03, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 10,
    },
    {
        path: loadStaticImage(img_17_ground, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 1,
    },
];

const level2: Background[] = [
    {
        path: loadStaticImage(img_21_sky, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_23_clouds, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 50,
    },
    {
        path: loadStaticImage(img_22_mountains, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_24_bg_ground01, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 40,
    },
    {
        path: loadStaticImage(img_25_bg_ground02, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 20,
    },
    {
        path: loadStaticImage(img_26_ground, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 1,
    },
];

const level3: Background[] = [
    {
        path: loadStaticImage(img_31_wall, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_32_prop01, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_33_prop02, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 40,
    },
    {
        path: loadStaticImage(img_34_stones, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 20,
    },
    {
        path: loadStaticImage(img_35_crystals, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 10,
    },
    {
        path: loadStaticImage(img_36_ground, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 1,
    },
];

const level4: Background[] = [
    {
        path: loadStaticImage(img_41_sky, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_42_stars, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_44_clouds02, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 70,
    },
    {
        path: loadStaticImage(img_45_mountains, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 0,
    },
    {
        path: loadStaticImage(img_46_ground01, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 20,
    },
    {
        path: loadStaticImage(img_47_ground02, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 10,
    },
    {
        path: loadStaticImage(img_48_ground, GAME),
        x: GAME.xPosBg,
        x2: clientWidth,
        speed: 1,
    },
];

export const BG: any = { level1, level2, level3, level4 };

export const HERO: Hero = {
    img: {
        run: loadSpriteImage(HeroRun, 200, 200, 12, 1, GAME),
        jump: loadSpriteImage(HeroJump, 200, 200, 6, 1, GAME),
        hurt: loadSpriteImage(HeroDeath, 200, 200, 1, 1, GAME),
        stand: loadSpriteImage(HeroStand, 200, 200, 18, 1, GAME),
    },
    position: {
        x: 65,
        y: GAME.y_positionLine,
    },
    event: {
        run: false,
        jump: false,
    },
    offset: 0,
};

// пиздюки
const pussyDistance = [[640, 1250], [1400, 2010], [2160, 2920]];

export const PUSSY: any = {
    level1: {
        run: loadSpriteImage(Pussy_level1, 200, 200, 18, 4, GAME),
        attack: loadSpriteImage(Pussy_level1_Attack, 200, 200, 1, 1, GAME),
        stop: loadSpriteImage(Pussy_level1_Stop, 200, 200, 1, 1, GAME),
    },
    level2: {
        run: loadSpriteImage(Pussy_level2, 200, 200, 12, 4, GAME),
        attack: loadSpriteImage(Pussy_level2_Attack, 200, 200, 1, 1, GAME),
        stop: loadSpriteImage(Pussy_level2_Stop, 200, 200, 1, 1, GAME),
    },
    level3: {
        run: loadSpriteImage(Pussy_level3, 200, 200, 12, 4, GAME),
        attack: loadSpriteImage(Pussy_level3_Attack, 200, 200, 1, 1, GAME),
        stop: loadSpriteImage(Pussy_level3_Stop, 200, 200, 1, 1, GAME),
    },
    level4: {
        run: loadSpriteImage(Pussy_level4, 200, 200, 12, 4, GAME),
        attack: loadSpriteImage(Pussy_level4_Attack, 200, 200, 1, 1, GAME),
        stop: loadSpriteImage(Pussy_level4_Stop, 200, 200, 1, 1, GAME),
    },
    skin: [0, 200, 400],
    enemy: [
        {
            x: 1280 + GAME.random(pussyDistance[0]),
            y: GAME.y_positionLine,
            offset: 0,
            distance: 1.5,
            attack: false,
        },
        {
            x: 1280 + GAME.random(pussyDistance[1]),
            y: GAME.y_positionLine,
            offset: 200,
            distance: 1.5,
            attack: false,
        },
        {
            x: 1280 + GAME.random(pussyDistance[2]),
            y: GAME.y_positionLine,
            offset: 400,
            distance: 1.5,
            attack: false,
        },
    ],
};

// аудио файлы
const selectAudioLevel = () => {
    switch (GAME.level) {
        case 'level1':
            return OST_level_1;
        case 'level2':
            return OST_level_2;
        case 'level3':
            return OST_level_3;
        case 'level4':
            return OST_level_4;
        default:
            return OST_level_1;
    }
};

export const AUDIO = {
    jump: loadAudio([Sound_Jump], 0.4),
    dead: loadAudio([Sound_Death], 0.1),
    ostMusic: loadAudio(() => selectAudioLevel(), 0.1),
};

export function checkHero(hero: string = ANGELS.hero1.name): void {
    GAME.heroName = hero;
    switch (hero) {
        case 'hero1':
            HERO.offset = 0;
            break;
        case 'hero2':
            HERO.offset = 200;
            break;
        case 'hero3':
            HERO.offset = 400;
            break;
        case 'hero4':
            HERO.offset = 600;
            break;
        default:
            HERO.offset = 0;
            break;
    }
}

export function checkLevel(level: string= LEVELS.level1.name): void {
    GAME.level = level;
}

export function restart(): void {
    window.cancelAnimationFrame(GAME.requestId);

    GAME.speed = startSpeed;
    GAME.scoreCounter = 0;
    GAME.score = 0;
    GAME.isGameStopped = false;
    GAME.localRecord = 0;
    GAME.audioPlayed = true;

    // сброс BG
    const { level } = GAME;
    const _bg = BG[level];
    for (let i = 0; i < _bg.length; i += 1) {
        _bg[i].x = GAME.xPosBg;
        _bg[i].x2 = GAME.winWidth;
    }
    // сброс PUSSY
    for (let i = 0; i < PUSSY.enemy.length; i += 1) {
        PUSSY.enemy[i].x = 1280 + GAME.random(pussyDistance[i]);
        PUSSY.enemy[i].y = GAME.y_positionLine;
        PUSSY.enemy[i].distance = 1.5;
        PUSSY.enemy[i].attack = false;
    }

    // сброс HERO
    HERO.position.x = 65;
    HERO.position.y = GAME.y_positionLine;
    HERO.event.run = true;
    HERO.event.jump = false;

    // скроем баннер
    GAME.dom.gameBanner.current?.classList.add('hidden');
    // скроем курсор
    if(GAME?.dom?.canvas?.current){
        GAME.dom.canvas.current.style.cursor = "none"
    }
}
