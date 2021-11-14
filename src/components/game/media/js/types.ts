/* eslint-disable camelcase */
import { RefObject } from 'react';

export type Game = {
    ctx: CanvasRenderingContext2D | null,
    winWidth: number,
    winHeight: number,
    y_positionLine: number,
    allCount: number,
    loadCount: number,
    yPosBg: number,
    speed: number,
    scoreCounter: number,
    score: number,
    scoreColor: string,
    isGameStopped: boolean,
    localStorageRecord: number,
    localRecord: number,
    audioPlayed: boolean,
    dom: Record<string, RefObject<HTMLCanvasElement> | RefObject<HTMLDivElement>>,
    setLeaderboard: ((arg: number) => void),
    random: (range: number[]) => number,
    requestId: number,
    heroName: string,
    level: string,
};

export type Background = {
    path: HTMLImageElement,
    x: number,
    x2: number,
    speed: number,
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
        run: SpriteImage,
        jump: SpriteImage,
        hurt: SpriteImage,
        stand: SpriteImage,
    },
    position: {
        x: number,
        y: number,
    },
    event: {
        run: boolean,
        jump: boolean,
    },
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

export type PussyEnemy = {
    x: number,
    y: number,
    distance: number,
    attack: boolean,
    skin: number,
};

export type TypePussy = {
    run: SpriteImage,
    attack: SpriteImage,
    stop: SpriteImage,
    enemy: PussyEnemy[],
};
