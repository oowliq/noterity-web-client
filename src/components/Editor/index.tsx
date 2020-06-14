import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { boundMethod } from 'autobind-decorator';
import DraftEditor from 'draft-js-plugins-editor';
import styled from 'styled-components';
import { EditorState, RichUtils, ContentBlock, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import { editorStore } from 'store';
import { EditorGlobalStyles } from './EditorStyles';
import { createFirstLineHeader } from './plugins';
import { EditorHeader } from './EditorHeader';
import { InlineToolbar } from './InlineToolbar';
import { stylesSchema, Block } from './styleSchema';
import { newLineClearStyles, prohibitionOfTitleDeletion } from './utils';

const { hasCommandModifier } = KeyBindingUtil;

const EditorWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const firstLineHeaderPlugin = createFirstLineHeader();
const plugins = [firstLineHeaderPlugin];

const styleMap = {
    B: {
        fontWeight: 600,
    },
    I: {
        fontStyle: 'italic',
    },
    TITLE: {
        fontSize: '40px',
        display: 'block',
    },
    SUBTITLE: {
        fontSize: '25px',
    },
};

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

    public render() {
        return (
            <EditorWrapper className="editor-container">
                <EditorHeader lastSave={editorStore.lastSave} readingTime={editorStore.readingTime} />
                <EditorGlobalStyles />
                <InlineToolbar editorState={editorStore.editorData} onChange={this.handleChange} />
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
