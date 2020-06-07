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
        if (this.editorLength) return;

        setTimeout(() => {
            if (this.title) this.title.focus();
        }, 100);
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

    public render() {
        const { editorState } = this.state;

        return (
            <EditorWrapper>
                <EditorGlobalStyles />
                <DraftEditor
                    editorState={editorState}
                    plugins={plugins}
                    blockStyleFn={this.getBlockStyle}
                    onChange={this.handleChange}
                    handleKeyCommand={this.handleKeyCommand}
                    customStyleMap={styleMap}
                    ref={(element) => {
                        this.editor = element;
                    }}
                />
                <InlineToolbar>
                    {(externalProps) => (
                        <>
                            <ItalicButton toggled={this.isEnabledInlineStyle} onToggle={this.inlineToolbarHandler} />
                            <BoldButton toggled={this.isEnabledInlineStyle} onToggle={this.inlineToolbarHandler} />
                            <TitleButton toggled={this.isEnabledInlineStyle} onToggle={this.inlineToolbarHandler} />
                            <SubTitleButton toggled={this.isEnabledInlineStyle} onToggle={this.inlineToolbarHandler} />
                        </>
                    )}
                </InlineToolbar>
                <SideToolbar />
            </EditorWrapper>
        );
    }
}

export { Editor };
