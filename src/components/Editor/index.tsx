import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';
import DraftEditor from 'draft-js-plugins-editor';
import * as utils from 'draftjs-utils';
import styled from 'styled-components';
import { EditorState, RichUtils, ContentBlock, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import { editorStore } from 'store';
import { EditorGlobalStyles } from './EditorStyles';
import { createFirstLineHeader } from './plugins';
import { EditorHeader } from './EditorHeader';
import { InlineToolbar } from './InlineToolbar';
import { stylesSchema, Block, getInlineStylesMapObject } from './styleSchema';
import { newLineClearStyles, prohibitionOfTitleDeletion } from './utils';

const { hasCommandModifier } = KeyBindingUtil;

const EditorWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const firstLineHeaderPlugin = createFirstLineHeader();
const plugins = [firstLineHeaderPlugin];

const styleMap = getInlineStylesMapObject();

@observer
class Editor extends Component {
    private editor: DraftEditor | null = null;

    public componentDidMount(): void {
        this.handleFocus();
    }

    /**
     * Blocks styling
     * @param block - block type
     * @returns css block style
     */
    @boundMethod private getBlockStyle(block: ContentBlock): string {
        const type = block.getType();

        for (const styleName in stylesSchema.block) {
            const current = stylesSchema.block[styleName as Block];
            if (current.style === type) return current.css;
        }
        return '';
    }

    /**
     * Focus on editor
     */
    @boundMethod private handleFocus(): void {
        if (this.editor) this.editor.focus();
    }

    /**
     * Hot-keys handler
     * @param e - Keyboard event
     * @returns editor command
     */
    @boundMethod private handleKeys(e: React.KeyboardEvent<HTMLInputElement>): string | null {
        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
            return 'editor-save';
        }
        return getDefaultKeyBinding(e);
    }

    /**
     * Editor commands handler
     * @param command - editor command
     * @param editorState - editor state
     * @returns handler status
     */
    @boundMethod private handleKeyCommand(command: string, editorState: EditorState): 'handled' | 'not-handled' {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        switch (command) {
            case 'backspace':
                prohibitionOfTitleDeletion();
                break;
            case 'split-block':
                newLineClearStyles();
                break;
            case 'editor-save':
                editorStore.saveData();
                break;
            default:
                break;
        }
        if (newState) {
            this.handleChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    /**
     * Editor state handler
     * @param editorState - new editor state
     */
    @boundMethod private handleChange(editorState: EditorState): void {
        editorStore.edit(editorState);
    }

    /**
     * Styling handler
     * @param type - block type
     * @param styleName - style name
     * @param clearStyles - list of clear styles
     */
    @boundMethod private handleStyling(type: 'inline' | 'block', styleName: string, clearStyles?: string[]): void {
        let newState = editorStore.editorData;
        if (clearStyles) {
            if (clearStyles.includes('all')) newState = utils.removeAllInlineStyles(newState);
            else {
                for (const style of clearStyles) {
                    if (RichUtils.getCurrentBlockType(newState) === style) {
                        newState = RichUtils.toggleBlockType(newState, style);
                    }
                    if (newState.getCurrentInlineStyle().has(style)) {
                        newState = RichUtils.toggleInlineStyle(newState, style);
                    }
                }
            }
        }
        if (type === 'inline') {
            this.handleChange(RichUtils.toggleInlineStyle(newState, styleName));
        }
        if (type === 'block') {
            this.handleChange(RichUtils.toggleBlockType(newState, styleName));
        }
    }

    public render() {
        return (
            <EditorWrapper className="editor-container">
                <EditorHeader lastSave={editorStore.lastSave} readingTime={editorStore.readingTime} />
                <EditorGlobalStyles />
                <InlineToolbar editorState={editorStore.editorData} onStyling={this.handleStyling} />
                <DraftEditor
                    editorState={editorStore.editorData}
                    plugins={plugins}
                    blockStyleFn={this.getBlockStyle}
                    onChange={this.handleChange}
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.handleKeys}
                    customStyleMap={styleMap}
                    ref={(element) => {
                        this.editor = element;
                    }}
                />
            </EditorWrapper>
        );
    }
}

export { Editor };
