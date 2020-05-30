import { ThemeColor } from 'interfaces';

export enum LayoutActionTypes {
    SET_THEME = '@@layout/SET_THEME',
}

export interface LayoutState {
    readonly theme: ThemeColor;
}

export type Theme = ThemeColor;
