import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './game-menu.css';

type Props = {
	goOptions: () => void;
};

const GameMenu = ({ goOptions }: Props) => {
	const history = useHistory();
	const handleOnClick = useCallback(
		(link) => history.push(`/${link}`),
		[history],
	);

	return (
		<div className="game-menu">
			<button
				type="button"
				className="btn fullwidth"
				onClick={() => goOptions()}
			>
				Выбрать персонажа
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
