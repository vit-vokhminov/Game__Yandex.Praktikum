import { GAME, LEVELS, HERO, AUDIO } from './parameters';
import { API } from 'api';

export default function gameStop(): void {
    GAME.speed = 0;
    GAME.isGameStopped = true;
    HERO.event.run = false;
    
    GAME.dom.gameBanner.current?.classList.remove('hidden');

    // остановить аудио
    if (GAME.audioPlayed) {
        GAME.audioPlayed = false;
        AUDIO.dead.play();
    }
    AUDIO.ostMusic.stop();
    GAME.setLeaderboard(Math.floor(GAME.score));

    // запись нового рекорда
    if (GAME.localRecord > Number(GAME.user.record)) {
        const record = Math.floor(GAME.score);

        GAME.user.avatar = GAME.heroName;
        GAME.user.level = LEVELS[GAME.level].name;
        GAME.user.record = record;

        API.editRecordLeader(GAME.user);
    }
}
