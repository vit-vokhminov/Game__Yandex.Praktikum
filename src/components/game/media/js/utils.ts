export const displayText = (ctx, score, localStorageRecord) => {
    if (ctx) {
        ctx.font = '120px Play';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(
            String(Math.floor(score)),
            ctx.canvas.width / 2, 100,
        );

        ctx.font = '25px Play';
        ctx.textAlign = 'left';
        ctx.fillText(`Рекорд: ${localStorageRecord}`, 10, 30);
    }
};

export function gameStop(this) {
    this.speed = 0;
    this.isGameStopped = true;
    this.enemiesList = [];
    this.hero.actions.run = false;
    this.dom.gameBanner.current?.classList.remove('hidden');
    document.exitPointerLock();
    // остановить аудио
    if (this.audioPlayed) {
        this.audioPlayed = false;
        AUDIO.Dead.play();
    }
    AUDIO.Theme1.stop();
    this.setLeaderboard(Math.floor(this.score));
    // запись нового рекорда
    if (this.localRecord > this.localStorageRecord) {
        const record = Math.floor(this.score);
        localStorage.setItem('localStorageRecord', String(record));
        this.localStorageRecord = record;
    }
}

export const randomRange = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

import { Track } from './types';

/** Функция добавления любого количества аудио файлов
 * @arr {string} массив с путями аудио файла в различных форматах
 * @vol {number} уровень громкости
 */

export const loadAudio = (audioPath: string[] | (() => string), vol = 1): Track => {
    let audio = document.createElement('audio');
    const selectAudioPath = () => {
        audio.innerHTML = '';
        if (typeof audioPath === 'function') {
            const theme = audioPath();
            audio = new Audio(theme);
        } else {
            for (let i = 0, len = audioPath.length; i < len; i += 1) {
                const source = document.createElement('source');
                source.src = audioPath[i];
                audio.appendChild(source);
            }
        }
    };

    audio.volume = vol;
    const track = {
        dom: audio,
        state: 'stop',
        play() {
            selectAudioPath();
            audio.play();
            this.state = 'play';
        },
        restart() {
            selectAudioPath();
            audio.currentTime = 0;
            audio.play();
            this.state = 'play';
        },
        pause() {
            audio.pause();
            this.state = 'pause';
        },
        stop() {
            audio.pause();
            audio.currentTime = 0;
            this.state = 'stop';
        },
        setVolume(_vol: number) {
            audio.volume = _vol;
        },
    };
    track.dom = audio;
    return track;
}
