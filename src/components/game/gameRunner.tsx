import React, { useRef, useEffect, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { userSlice } from 'redux/reducers/user/userSlice';
import { GAME, HERO, AUDIO, restart } from './media/js/parameters';
import drawRunner from './media/js/drawRunner';
import jump from './media/js/jump';
import { GameOver, Smile } from './media/js/assetsLinks';
import s from './game.module.css';

function GameRunner(): ReactElement {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameBannerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { setGameStart } = userSlice.actions;
    const { user } = useAppSelector((store: any) => store.userSlice);

    useEffect(() => {
        if (canvasRef.current && gameBannerRef.current) {
            canvasRef.current.width = GAME.winWidth;
            canvasRef.current.height = GAME.winHeight;

            GAME.ctx = canvasRef.current.getContext('2d');
            GAME.dom = {
                canvas: canvasRef,
                gameBanner: gameBannerRef
            };
            GAME.user = { ...user };
            HERO.event.run = true;
            document.addEventListener('mousedown', jump);

            // дожидаемся загрузки всех изображений
            const int = setInterval(() => {
                if (GAME.allCount === GAME.loadCount) {
                    clearInterval(int);
                    restart();
                    drawRunner();
                }
            }, 1000 / 60);
        }
        return () => {
            // удаление событий мыши
            document.removeEventListener('mousedown', jump);
        };
    }, []);

    const handleRestart = () => {
        restart();
        drawRunner();
        AUDIO.ostMusic.play();
    };

    const handleGameExite = () => {
        restart();
        dispatch(setGameStart(false));
    };

    return (
        <div className={s.game}>
            <canvas
                id={s.canvas}
                ref={canvasRef}>
                Эх... Ваш браузер не поддерживает Canvas, Вы не сможете сыграть в игру...
            </canvas>
            <div
                className={`${s.game_over} hidden`}
                ref={gameBannerRef}>
                <div className={s.game_over_main}>
                    <img
                        src={Smile}
                        className={s.img_smile}
                        alt='Smile'
                    />
                    <img
                        src={GameOver}
                        className={s.img_game_over}
                        alt='GameOver'
                    />
                    <button
                        type='button'
                        className={s.game_restar}
                        onClick={() => handleRestart()}>
                        Повторить
                    </button>
                    <button
                        type='button'
                        className={`${s.game_restar} ${s.game_exit}`}
                        onClick={() => handleGameExite()}>
                        Выход
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameRunner;
