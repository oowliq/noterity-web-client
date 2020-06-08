import React, { Component } from 'react';
import { boundMethod } from 'autobind-decorator';
import DraftEditor from 'draft-js-plugins-editor';
import styled from 'styled-components';
import {
    EditorState,
    RichUtils,
    ContentBlock,
    getDefaultKeyBinding,
    KeyBindingUtil,
    convertToRaw,
    convertFromRaw,
} from 'draft-js';
import { EditorGlobalStyles } from './EditorStyles';
import { createFirstLineHeader } from './plugins';
import { EditorHeader } from './EditorHeader';
import { InlineToolbar } from './InlineToolbar';

const { hasCommandModifier } = KeyBindingUtil;

const EditorWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const firstLineHeaderPlugin = createFirstLineHeader();
const plugins = [firstLineHeaderPlugin];

const rs = ['B'];

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

interface ComponentState {
    editorState: EditorState;
    lastSave: Date | null;
}

class Editor extends Component<any, ComponentState> {
    private editor: DraftEditor | null = null;

    constructor(props: any) {
        super(props);

        this.state = {
            editorState: this.loadSavedData(),
            lastSave: null,
        };
    }

    public componentDidMount(): void {
        this.handleFocus();
    }

    // eslint-disable-next-line class-methods-use-this
    @boundMethod private getBlockStyle(block: ContentBlock): string {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            case 'note-title':
                return 'RichEditor-note-title';
            default:
                return '';
        }
    }

    // eslint-disable-next-line class-methods-use-this
    @boundMethod private loadSavedData(): EditorState {
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

    @boundMethod private handleFocus(): void {
        if (this.editor) this.editor.focus();
    }

    @boundMethod private handleFocusOnTtile(): void {
        if (window.requestAnimationFrame)
            window.requestAnimationFrame(() => {
                const { editorState } = this.state;
                const currentContent = editorState.getCurrentContent();
                const firstBlockKey = currentContent.getBlockMap().first().getKey();
                const currentBlockKey = editorState.getSelection().getAnchorKey();
                const isFirstBlock = currentBlockKey === firstBlockKey;
                const currentBlockType = RichUtils.getCurrentBlockType(editorState);
                const isHeading = currentBlockType === 'note-title';
                if (isFirstBlock !== isHeading) {
                    this.handleChange(RichUtils.toggleBlockType(editorState, 'note-title'));
                }
            });
    }

    @boundMethod private handleNewLine(): void {
        if (window.requestAnimationFrame)
            window.requestAnimationFrame(() => {
                const { editorState } = this.state;
                const styles = editorState.getCurrentInlineStyle().toArray();
                styles.forEach((style) => {
                    if (rs.includes(style)) {
                        this.handleChange(RichUtils.toggleInlineStyle(editorState, style));
                    }
                });
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
                this.handleSave();
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
        this.setState({ editorState });
    }

    @boundMethod private handleSave(): void {
        const { editorState } = this.state;
        this.setState({ lastSave: new Date() });
        localStorage.setItem('editor-state', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }

    public render() {
        const { editorState, lastSave } = this.state;

        return (
            <EditorWrapper className="editor-container">
                <EditorHeader editorState={editorState} lastSave={lastSave} onSave={this.handleSave} />
                <EditorGlobalStyles />
                <InlineToolbar editorState={editorState} />
                <DraftEditor
                    editorState={editorState}
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
