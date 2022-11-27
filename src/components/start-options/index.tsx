import React, { ReactElement, useState } from 'react';
import CN from 'classnames';
import { GAME, ANGELS, LEVELS, checkHero, checkLevel } from 'components/game/media/js/parameters';
import { Button } from 'components/UI/Button';
import s from './startOptions.module.css';

type Props = {
    handleStartGame: () => void;
};

function StartOptions({ handleStartGame }: Props): ReactElement {

    const [heroKey, setHeroKey] = useState(GAME.heroName);
    const [levelKey, setLevelKey] = useState(GAME.level);

    const selectHero = (e: any) => {
        setHeroKey(e.target.getAttribute('data-name'));
        checkHero(e.target.getAttribute('data-name'));
    };
    const selectLevel = (e: any) => {
        setLevelKey(e.target.getAttribute('data-name'));
        checkLevel(e.target.getAttribute('data-name'));
    };

    return (
        <>
            <div>
                Выберите персонажа: <b>{ANGELS[heroKey].name}</b>
            </div>
            <div className={s.list__hero}>
                {Object.entries(ANGELS).map(([key, value]: any) => (
                    <img
                        key={key}
                        src={value.avatar}
                        data-name={key}
                        alt={key}
                        className={CN(s.hero, { [s.active]: heroKey === key })}
                        onClick={selectHero}
                    />
                ))}
            </div>
            <div>
                Выберите уровень: <b>{LEVELS[levelKey].name}</b>
            </div>
            <div className={s.list__levels}>
                {Object.entries(LEVELS).map(([key, level]: any) => (
                    <img
                        key={key}
                        src={level.avatar}
                        data-name={key}
                        alt={key}
                        className={CN(s.level, { [s.active]: levelKey === key })}
                        onClick={selectLevel}
                    />
                ))}
            </div>
            <div className={s.btn__group}>
                <Button
                    type='button'
                    fullwidth
                    onClick={handleStartGame}>
                    Старт
                </Button>
            </div>
        </>
    );
}

export default StartOptions;
