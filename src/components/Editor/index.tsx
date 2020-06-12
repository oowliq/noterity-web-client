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
import { blocksSchema, nonClearStyles } from './styleSchema';

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

    // eslint-disable-next-line class-methods-use-this
    @boundMethod private getBlockStyle(block: ContentBlock): string {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            case blocksSchema.noteTitle:
                return 'RichEditor-note-title';
            case blocksSchema.title:
                return 'RichEditor-title';
            case blocksSchema.subTitle:
                return 'RichEditor-sub-title';
            case blocksSchema.blockQuote:
                return 'RichEditor-blockquote';
            default:
                return '';
        }
    }

    @boundMethod private handleFocus(): void {
        if (this.editor) this.editor.focus();
    }

    @boundMethod private handleFocusOnTtile(): void {
        if (window.requestAnimationFrame)
            window.requestAnimationFrame(() => {
                const currentContent = editorStore.editorData.getCurrentContent();
                const firstBlockKey = currentContent.getBlockMap().first().getKey();
                const currentBlockKey = editorStore.editorData.getSelection().getAnchorKey();
                const isFirstBlock = currentBlockKey === firstBlockKey;
                const currentBlockType = RichUtils.getCurrentBlockType(editorStore.editorData);
                const isHeading = currentBlockType === 'note-title';
                if (isFirstBlock !== isHeading) {
                    this.handleChange(RichUtils.toggleBlockType(editorStore.editorData, 'note-title'));
                }
            });
    }

    @boundMethod private handleNewLine(): void {
        if (window.requestAnimationFrame)
            window.requestAnimationFrame(() => {
                const styles = editorStore.editorData.getCurrentInlineStyle().toArray();
                styles.forEach((style) => {
                    if (!nonClearStyles.includes(style)) {
                        this.handleChange(RichUtils.toggleInlineStyle(editorStore.editorData, style));
                    }
                });
                const currentBlockStyles = RichUtils.getCurrentBlockType(editorStore.editorData).toString();
                if (!nonClearStyles.includes(currentBlockStyles)) {
                    this.handleChange(RichUtils.toggleBlockType(editorStore.editorData, currentBlockStyles));
                }
            });
    }

    // eslint-disable-next-line class-methods-use-this
    @boundMethod private handleKeys(e: React.KeyboardEvent<HTMLInputElement>): string | null {
        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
            return 'editor-save';
        }
        return getDefaultKeyBinding(e);
    }

    @boundMethod private handleKeyCommand(command: string, editorState: EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        switch (command) {
            case 'backspace':
                this.handleFocusOnTtile();
                break;
            case 'split-block':
                this.handleNewLine();
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
