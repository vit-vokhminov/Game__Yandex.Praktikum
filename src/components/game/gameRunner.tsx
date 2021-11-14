import React, { useRef, useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameStart, setLeaderboard } from '../../actions/app';
import './game.css';
import {
    GAME2,
    AUDIO,
} from './media/js/parameters';
import {
    GameOver,
    Smile,
} from './media/js/assetsLinks';
import configGame from './media/js/configGame';

function GameRunner(): ReactElement {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameBannerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const profile = useSelector(({ collections }) => collections.user);
    const classGame = useRef();

    useEffect(() => {
        if (canvasRef.current && gameBannerRef.current) {
            const { clientWidth, clientHeight } = document.body;
            canvasRef.current.width = clientWidth;
            canvasRef.current.height = clientHeight;

            window.addEventListener('resize', () => {
                canvasRef.current.width = document.body.clientWidth;
                canvasRef.current.height = document.body.clientHeight;
            });

            const game2 = new GAME2(canvasRef.current, true);
            classGame.current = game2;
            game2.Start();
            game2.dom = {
                canvas: canvasRef,
                gameBanner: gameBannerRef,
            };

            game2.setLeaderboard = (arg: number) => dispatch(setLeaderboard({
                score_charleston: arg,
                id: profile.id,
                login: profile.login,
                avatar: profile.avatar,
            }));
        }
    }, []);

    const handleRestart = () => {
        const game = classGame.current;
        game.restart();
        document.body.requestPointerLock();
        AUDIO.Theme1.play();
        AUDIO.Theme1.setVolume(0.08);
        document.body.requestPointerLock();
    };
    const handleGameExite = () => {
        const game = classGame.current;
        game.restart();
        game.pause = true;
        configGame.isPause = true;
        dispatch(setGameStart(false));
    };
    return (
        <div className="game">
            <canvas id="canvas" ref={canvasRef}>Эх... Ваш браузер не поддерживает Canvas, Вы не сможете сыграть в игру...</canvas>
            <div className="game_over hidden" ref={gameBannerRef}>
                <div className="game_over_main">
                    <img src={GameOver} className="img_game_over" alt="GameOver" />
                    <button type="button" className="game_restar" onClick={() => handleRestart()}>Повторить</button>
                    <button type="button" className="game_restar game_exit" onClick={() => handleGameExite()}>Выход</button>
                </div>
            </div>
        </div>
    );
}

export default GameRunner;
