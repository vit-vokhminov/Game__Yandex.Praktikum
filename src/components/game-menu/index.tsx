import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/UI/Button';
import s from './gameMenu.module.css';

type Props = {
    goOptions: () => void;
};

const GameMenu = ({ goOptions }: Props) => {
    const navigate = useNavigate();

    const handleOnClick = (link: string) => navigate(link);

    return (
        <div className={s.game_menu}>

            <Button
                type='button'
                fullwidth
                onClick={() => goOptions()}>
                Выбрать персонажа
            </Button>

            <div className={s.game_menu__btn_line}>
                <div className={s.game_menu__btn}>
                    <Button
                        type='button'
                        onClick={() => handleOnClick('forum')}>
                        Форум
                    </Button>
                </div>
                <div className={s.game_menu__btn}>
                    <Button
                        type='button'
                        onClick={() => handleOnClick('leaderboard')}>
                        Лидеры
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GameMenu;
