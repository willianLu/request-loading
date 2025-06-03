type IconType = 'default' | 'bar' | 'dot';
interface LoadingOptions {
    zIndex?: number;
    delay?: number;
    icon?: IconType;
}
interface ShowOptions {
    icon?: IconType;
    message?: string;
}
declare class Loading {
    private mask;
    private load;
    private icon;
    private message;
    private zIndex;
    private delay;
    private timestemp;
    private timeoutId;
    constructor();
    private init;
    private getIconTemplate;
    setConfig(options: LoadingOptions): void;
    private getViewTopZIndex;
    private getLoadContent;
    show(options?: ShowOptions): void;
    hide(): void;
}

declare const _default: Loading;

export { _default as default };
