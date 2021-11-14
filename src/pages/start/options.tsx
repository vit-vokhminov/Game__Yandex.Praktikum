import React, { ReactElement, useState } from 'react';
import Angel1 from '../../assets/img/Angels1.png';
import Angel2 from '../../assets/img/Angels2.png';
import Angel3 from '../../assets/img/Angels3.png';
import Angel4 from '../../assets/img/Angels4.png';
import Level1 from '../../assets/img/level1.jpg';
import Level2 from '../../assets/img/level2.jpg';
import Level3 from '../../assets/img/level3.jpg';
import Level4 from '../../assets/img/level4.jpg';
import configGame from '../../components/game/media/js/configGame';

type Props = {
    handleStartGame: () => void;
};

function StartOptions({
    handleStartGame,
}: Props): ReactElement {
    const [hero, setHero] = useState('angel1');
    const [level, setLevel] = useState('level1');

    const selectHero = (e) => {
        setHero(e.target.getAttribute('data-name'));
        configGame.hero = e.target.getAttribute('data-name');
    };
    const selectLevel = (e) => {
        setLevel(e.target.getAttribute('data-name'));
        configGame.level = e.target.getAttribute('data-name');
    };

    return (
        <>
            <div>Выберите персонажа:</div>
            <div onClick={selectHero} className="list__hero">
                <img src={Angel1} data-name="angel1" alt="angel1" className={`hero ${hero === 'angel1' && 'active__option'} `} />
                <img src={Angel2} data-name="angel2" alt="angel2" className={`hero ${hero === 'angel2' && 'active__option'} `} />
                <img src={Angel3} data-name="angel3" alt="angel3" className={`hero ${hero === 'angel3' && 'active__option'} `} />
                <img src={Angel4} data-name="angel4" alt="angel4" className={`hero ${hero === 'angel4' && 'active__option'} `} />
            </div>
            <div>Выберите уровень:</div>
            <div onClick={selectLevel} className="list__levels">
                <img src={Level1} data-name="level1" alt="level1" className={`level ${level === 'level1' && 'active__option'} `} />
                <img src={Level2} data-name="level2" alt="level2" className={`level ${level === 'level2' && 'active__option'} `} />
                <img src={Level3} data-name="level3" alt="level3" className={`level ${level === 'level3' && 'active__option'} `} />
                <img src={Level4} data-name="level4" alt="level4" className={`level ${level === 'level4' && 'active__option'} `} />
            </div>
            <div className="btn__group">
                <button
                    type="button"
                    className="btn fullwidth"
                    onClick={handleStartGame}
                >
                    Старт
                </button>
            </div>

        </>
    );
}

export default StartOptions;
