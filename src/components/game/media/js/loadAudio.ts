import { Track } from './types';

/** Функция добавления любого количества аудио файлов
 * @arr {string} массив с путями аудио файла в различных форматах
 * @vol {number} уровень громкости
 */

export default function loadAudio(audioPath: string[] | (() => string), vol = 1): Track {
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
