export interface Theme {
    colors: {
        background: string;
        main: string;
        backgroundAccent: string;
        accent: string;
        green: string;
        blue: string;
        orange: string;
    };
    fontColors: {
        main: string;
        backgroundMain: string;
        description: string;
        tinted: string;
    };
}

export type ThemeColor = 'light' | 'dark';
