import { observable, action } from 'mobx';
import * as layoutTypes from './types';

class LayoutStore {
    @observable protected theme: layoutTypes.LayoutThme = 'mix';

    @action('LAYOUT/CHANGE_THEME') public changeTheme(theme: layoutTypes.LayoutThme): void {
        if (this.theme !== theme) this.theme = theme;
    }
}

export const layoutStore = new LayoutStore();
