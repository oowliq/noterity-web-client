import { observable, computed, action } from 'mobx';
import makeInspectable from 'mobx-devtools-mst';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import * as editorTypes from './types';

class EditorStore {
    /**
     * Save timeout
     */
    private saveTimeout: null | ReturnType<typeof setTimeout> = null;

    /**
     *  Editor data state
     */
    @observable public editorData: editorTypes.EditorData = this.loadData();

    /**
     * Last save timestamp
     */
    @observable public lastSave: null | Date = null;

    /**
     * Reading time "words / 200"
     */
    @computed public get readingTime(): { mins: number; text: string } {
        const words: string[] = this.editorData
            .getCurrentContent()
            .getPlainText()
            .split(/\r\n|\r|\n|\s+/g)
            .filter((word) => !!word);

        const mins = Math.ceil(words.length / 200);
        return {
            mins,
            text: `${mins} min read`,
        };
    }

    @action('EDITOR/CREATE_SAVE_TIMEOUT') private createSaveTimeout(): void {
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout((): void => {
            this.saveData();
        }, 3000);
    }

    /**
     * Edit editor data
     * @param data - editor data
     */
    @action('EDITOR/EDIT') public edit(data: editorTypes.EditorData): void {
        this.editorData = data;
        this.createSaveTimeout();
    }

    /**
     * Load saved data
     * @returns saved editor data
     */
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

    /**
     * Save editor data
     */
    @action('EDITOR/SAVE_DATA') public saveData(): void {
        this.lastSave = new Date();
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        localStorage.setItem('editor-state', JSON.stringify(convertToRaw(this.editorData.getCurrentContent())));
    }
}

export const editorStore = new EditorStore();

makeInspectable(editorStore);
