import React, { useRef, useEffect, ReactElement } from 'react';
import { GAME } from './media/js/parameters';
import drawStatic from './media/js/drawStatic';
import s from './game.module.css';

export default function GameStatic(): ReactElement {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = GAME.winWidth;
            canvasRef.current.height = GAME.winHeight;

            GAME.ctx = canvasRef.current.getContext('2d');
            GAME.dom = {
                canvas: canvasRef,
            };
            // дожидаемся загрузки всех изображений
            const int = setInterval(() => {
                if (GAME.allCount === GAME.loadCount) {
                    clearInterval(int);
                    drawStatic();
                }
            }, 1000 / 60);
        }
    }, []);
    
    return (
        <canvas id={s.canvas_static} ref={canvasRef} width={GAME.winWidth} height={GAME.winHeight}>Эх... Ваш браузер не поддерживает Canvas, Вы не сможете сыграть в игру...</canvas>
    );
}
