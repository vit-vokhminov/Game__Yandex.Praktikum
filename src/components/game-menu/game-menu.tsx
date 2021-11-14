import React, { useCallback, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import './game-menu.css';

type Props = {
    handleStartGame: () => void;
};

const GameMenu = ({ handleStartGame }: Props): ReactElement => {
    const history = useHistory();
    const handleOnClick = useCallback(
        (link) => history.push(`/${link}`),
        [history],
    );

    const handleNewGame = () => {
        handleStartGame();
    };

    return (
        <div className="game-menu">
            <button
                type="button"
                className="btn fullwidth"
                onClick={() => handleNewGame()}
            >
                Старт
            </button>
            <div className="game-menu__block">
                <button
                    type="button"
                    className="btn mr"
                    onClick={() => handleOnClick('forum')}
                >
                    Форум
                </button>
                <button
                    type="button"
                    className="btn"
                    onClick={() => handleOnClick('leaderboard')}
                >
                    Лидеры
                </button>
            </div>
        </div>
    );
};

export default GameMenu;
