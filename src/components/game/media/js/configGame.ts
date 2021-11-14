export const pixelDevice: number = (window.devicePixelRatio > 1) ? 2 : 1;
// стартовая скорость игры
let startSpeed = 0;
if (pixelDevice <= 1) {
    startSpeed = 5;
} else {
    startSpeed = 3;
}
export default {
    defaultSpeed: startSpeed,
    speedGame: startSpeed,
    gravity: 0.4,
    isPause: true,
    isGameStopped: false,
    isGameStatic: true,
    level: 'level1',
    hero: 'angel1',
};
