/* eslint-disable camelcase */
import { RefObject } from 'react';
import { Iuser } from 'redux/reducers/user/userTypes';

export type Game = {
    ctx: CanvasRenderingContext2D | null;
    user: Iuser | null;
    winWidth: number;
    winHeight: number;
    y_positionLine: number;
    allCount: number;
    loadCount: number;
    yPosBg: number;
    xPosBg: number;
    speed: number;
    scoreCounter: number;
    score: number;
    scoreColor: string;
    isGameStopped: boolean;
    localRecord: number;
    audioPlayed: boolean;
    dom: Record<
        string,
        RefObject<HTMLCanvasElement> | RefObject<HTMLDivElement>
    >;
    setLeaderboard: (arg: number) => void;
    random: (range: number[]) => number;
    requestId: number;
    heroName: string;
    level: string;
};

export type Background = {
    path: any,
    x: number,
    x2: number,
    speed: number,
};

export type BgImage = {
    dom: HTMLImageElement,
    width: number,
    height: number,
};

export type SpriteImage = {
    dom: HTMLImageElement,
    width: number,
    height: number,
    colFrames: number,
    ticksFrame: number,
    tickCount: number,
    frameIndex: number,
};

export type Hero = {
    img: {
        run: SpriteImage;
        jump: SpriteImage;
        hurt: SpriteImage;
        stand: SpriteImage;
    };
    position: {
        x: number;
        y: number;
    };
    event: {
        run: boolean;
        jump: boolean;
    };
    offset: number;
};

export type Track = {
    dom: HTMLAudioElement,
    state: string,
    play: () => void,
    restart: () => void,
    pause: () => void,
    stop: () => void,
    setVolume: (arg: number) => void,
};

export type PussyLevels = {
    run: SpriteImage;
    attack: SpriteImage;
    stop: SpriteImage;
}

export type PussyEnemy = {
    x: number;
    y: number;
    offset: number;
    distance: number;
    attack: boolean;
    skin: number;
};

export type TypePussy = {
    level1: PussyLevels;
    level2: PussyLevels;
    level3: PussyLevels;
    level4: PussyLevels;
    enemy: PussyEnemy[];
};
