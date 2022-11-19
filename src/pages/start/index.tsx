import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CN from 'classnames';
import { setGameStart } from 'redux/store/userReducer';
import { Main, HeaderMenu, GameMenu, GameRunner, StartOptions } from 'components';
import { AUDIO } from 'components/game/media/js/parameters';
import ForwardBtn from 'components/UI/ForwardBtn';
import s from './start.module.css';

function Start(): ReactElement {

    const dispatch = useDispatch();
    const gameRunner = useSelector((state: any) => state.userReducer.gameRunner);
    const [isOptions, setIsOptions] = useState(false);

    const handleStartGame = () => {
        dispatch(setGameStart(true));
        AUDIO.ostMusic.play();
    };

    const visibility = CN([s.start__main], {
        [s.visibility_options]: isOptions,
    });

    const goOptions = () => {
        setIsOptions(prev => !prev);
    };

    if (gameRunner) {
        return <GameRunner />;
    }
    const Title = () => {
        return (
            <div>
                <ForwardBtn className={s.position_icon} onClick={goOptions} />
                Новая игра
            </div>
        );
    };
    return (
        <>
            <HeaderMenu />
            <Main title={isOptions ? <Title /> : 'GAME'} offBtnIcon>
                <div className={s.start}>
                    <div className={visibility}>
                        <div className={s.start__menu}>
                            <div>
                                <div className={s.start__menu__topic}>
                                    Как играть?
                                </div>
                                <div className={s.start__menu__description}>
                                    Ваша задача перепрыгивать всё, что попадется
                                    у вас на пути и любой ценой избежать
                                    столкновений.
                                </div>
                                <div className={s.start__menu__topic}>
                                    Управление
                                </div>
                                <div className={s.start__menu__description}>
                                    Управлять персонажем Вы можете с помощью
                                    ЛЕВОЙ КЛАВИШИ МЫШИ или кнопки ПРОБЕЛ на
                                    клавиатуре
                                </div>
                            </div>
                            <GameMenu goOptions={goOptions} />
                        </div>
                        <div className={s.start__options}>
                            <StartOptions handleStartGame={handleStartGame} />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}

export default Start;
