import React, { Component } from 'react';
import { boundMethod } from 'autobind-decorator';
import DraftEditor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import styled from 'styled-components';
import { EditorState, RichUtils, ContentBlock } from 'draft-js';
import { ItalicButton, BoldButton, TitleButton, SubTitleButton } from './EditorButtons';
import { sidebarTheme, EditorGlobalStyles } from './EditorStyles';
import { createFirstLineHeader } from './plugins';
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;

const EditorWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 2em;
`;

const inlineToolbarPlugin = createInlineToolbarPlugin({
    theme: {
        toolbarStyles: { toolbar: 'editor-inline-toolbar' },
    },
});
const sideToolbarPlugin = createSideToolbarPlugin({
    theme: sidebarTheme,
});

const firstLineHeaderPlugin = createFirstLineHeader();

const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin, firstLineHeaderPlugin];

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
}

class Editor extends Component<any, ComponentState> {
    private editor: DraftEditor | null = null;

    private title: HTMLInputElement | null = null;

    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    public componentDidMount(): void {
        this.handleFocus();
    }

    private get editorLength(): number {
        const { editorState } = this.state;
        return editorState.getCurrentContent().getPlainText().length;
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

    @boundMethod private isEnabledInlineStyle(style: string): boolean {
        const { editorState } = this.state;
        const inlineStyle = editorState.getCurrentInlineStyle();
        return inlineStyle.has(style);
    }

    @boundMethod private inlineToolbarHandler(style: string, type: 'inline' | 'block'): void {
        const { editorState } = this.state;
        if (type === 'inline') this.handleChange(RichUtils.toggleInlineStyle(editorState, style));
        if (type === 'block') {
            this.handleChange(RichUtils.toggleBlockType(editorState, style));
        }
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

    @boundMethod private handleKeyCommand(command: string, editorState: EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        switch (command) {
            case 'backspace':
                this.handleFocusOnTtile();
                break;
            case 'split-block':
                this.handleNewLine();
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

    @boundMethod private myKeyBindingFn(e: React.KeyboardEvent<HTMLInputElement>): string | null {
        if (e.key === 'backspace') return 'ddd';
        return getDefaultKeyBinding(e);
    }

    public render() {
        const { editorState } = this.state;

        return (
            <EditorWrapper>
                <EditorGlobalStyles />
                <DraftEditor
                    editorState={editorState}
                    plugins={plugins}
                    blockStyleFn={this.getBlockStyle}
                    keyBindingFn={this.myKeyBindingFn}
                    onChange={this.handleChange}
                    handleKeyCommand={this.handleKeyCommand}
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
