import { observable, action } from 'mobx';
import makeInspectable from 'mobx-devtools-mst';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import * as editorTypes from './types';

class EditorStore {
    @observable public editorData: editorTypes.EditorData = this.loadData();

    @observable public lastSave: null | Date = null;

    @action('EDITOR/EDIT') public edit(data: editorTypes.EditorData): void {
        this.editorData = data;
    }

    @action('EDITOR/LOAD_DATA') public loadData(): editorTypes.EditorData {
        const savedData = localStorage.getItem('editor-state');

        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed) {
                const content = convertFromRaw(parsed);
                if (content) {
                    return EditorState.createWithContent(content);
                }
            }
        }
        return EditorState.createEmpty();
    }

    @action('EDITOR/SAVE_DATA') public saveData(): void {
        this.lastSave = new Date();
        localStorage.setItem('editor-state', JSON.stringify(convertToRaw(this.editorData.getCurrentContent())));
    }
}

export const editorStore = new EditorStore();

makeInspectable(editorStore);
