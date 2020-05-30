import { action } from 'typesafe-actions';
import { AnyAction } from 'redux';
import { LayoutActionTypes, Theme } from './types';

export const setTheme = (theme: Theme): AnyAction => action(LayoutActionTypes.SET_THEME, theme);
