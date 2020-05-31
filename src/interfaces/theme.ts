export interface Theme {
    borders?: string;
    colors: {
        accent: string;
        primary: string;
        secondary: string;
    };
    fontColors: {
        inactive: string;
        disabled: string;
        default: string;
    };
}

export type ThemeColor = 'light' | 'dark';
