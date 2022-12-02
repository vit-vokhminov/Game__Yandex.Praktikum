import { GAME, BG, HERO, PUSSY, pixelDevice } from './parameters';
import drawImage from './drawImage';
import gameStop from './gameStop';
import { PussyEnemy } from './types';

export default function drawRunner(): void {
    GAME.ctx?.clearRect(0, 0, GAME.winWidth, GAME.winHeight);
    
    // отрисовка фоновых картинок
    const { level } = GAME;
    const _bg = BG[level];
    for (let i = 0; i < _bg.length; i++) {

        GAME.ctx?.drawImage(_bg[i].path, _bg[i].x, GAME.yPosBg);
        GAME.ctx?.drawImage(_bg[i].path, _bg[i].x2, GAME.yPosBg);

        // parallax
        if (_bg[i].speed) {
            _bg[i].x -= GAME.speed / _bg[i].speed;
            _bg[i].x2 -= GAME.speed / _bg[i].speed;
        }

        // спрайт фоновых картинок
        if (_bg[i].x < -GAME.winWidth - Math.abs(GAME.xPosBg)) {
            _bg[i].x = _bg[i].x2 + GAME.winWidth + Math.abs(GAME.xPosBg);
        }
        if (_bg[i].x2 < -GAME.winWidth - Math.abs(GAME.xPosBg)) {
            _bg[i].x2 = _bg[i].x + GAME.winWidth + Math.abs(GAME.xPosBg);
        }
    }

    // статистика
    if (GAME.ctx) {
        GAME.ctx.font = '120px Play';
        GAME.ctx.fillStyle = GAME.scoreColor;
        GAME.ctx.textAlign = 'center';
        GAME.ctx.fillText(
            String(Math.floor(GAME.score)),
            GAME.winWidth / 2,
            100
        );

        GAME.ctx.font = '25px Play';
        GAME.ctx.textAlign = 'left';
        GAME.ctx.fillText(`Рекорд: ${GAME.user?.record || 0}`, 10, 30);
    }

    // Варианты отрисовки главного героя
    if (GAME.isGameStopped) {
        drawImage(HERO.img.hurt, HERO.position.x - 20, GAME.y_positionLine, HERO.offset);
    } else if (HERO.event.run) {
        drawImage(HERO.img.run, HERO.position.x, HERO.position.y, HERO.offset);
    } else if (HERO.event.jump) {
        drawImage(HERO.img.jump, HERO.position.x, HERO.position.y, HERO.offset);
    }

    // отрисовка врагов
    if (!GAME.isGameStopped) {
        for (let i = 0; i < PUSSY.enemy.length; i += 1) {
            // отрисовка врага
            drawImage(PUSSY[level].run, PUSSY.enemy[i].x, PUSSY.enemy[i].y, PUSSY.enemy[i].offset);

            // новые координаты для следующей отрисовки
            PUSSY.enemy[i].x -= GAME.speed * PUSSY.enemy[i].distance;

            // ушедший за левый экран враг, респаунится за правым экраном
            if (PUSSY.enemy[i].x + PUSSY[level].run.width < -40) {
                const key = i === 0 ? PUSSY.enemy.length - 1 : i - 1;
                // нужно взять кординату х ушедшего i за левый экран
                // и установть рандомно от последнего не ушедшего за левый экран
                PUSSY.enemy[i].x = PUSSY.enemy[key].x + GAME.random([640, 1100]);
                // поменяем рандомно скин
                PUSSY.enemy[i].offset = PUSSY.skin[GAME.random([0, 2])];
            }
        }
    } else {
        PUSSY.enemy.forEach((elem: PussyEnemy) => {
            if (elem.attack) {
                drawImage(PUSSY[level].attack, elem.x + 20, elem.y, elem.offset);
            } else {
                drawImage(PUSSY[level].stop, elem.x, elem.y, elem.offset);
            }
        });
    }

    // Если конец игры. дальне не отрисовывать
    if (GAME.isGameStopped) {
        return;
    }

    // Увеличение скорости при увеличении счёта
    if (GAME.score - GAME.scoreCounter > 25) {
        GAME.speed += 1 / pixelDevice;
        GAME.scoreCounter = GAME.score;
    }

    // увеличение скорости игры
    GAME.score += GAME.speed / 100;

    // рекорд в игре
    if (GAME.score > GAME.localRecord) {
        GAME.localRecord = Math.floor(GAME.score);
    }

    // калибровка
    const calibration = 65;

    // столкновение героя и врага
    for (let i = 0; i < PUSSY.enemy.length; i++) {
        // фронтальное столкновение
        if (
            HERO.position.x + HERO.img.run.width - calibration * 1.5 >
            PUSSY.enemy[i].x + calibration
        ) {
            // столкновение сверху после прыжка
            if (
                HERO.position.y + HERO.img.run.height >
                PUSSY.enemy[i].y + calibration
            ) {
                // столкновение при приземлении, чтобы жопа не отхватила
                if (
                    HERO.position.x + calibration * 2 <
                    PUSSY.enemy[i].x + PUSSY[level].run.width - calibration
                ) {
                    PUSSY.enemy[i].attack = true;
                    gameStop();
                }
            }
        }
    }

    GAME.requestId = requestAnimationFrame(drawRunner);
}
