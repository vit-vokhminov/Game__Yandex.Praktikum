declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.mp3';
declare module '*.wav';

declare type Id = string | number;

declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}