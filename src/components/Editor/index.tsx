import React, { Component } from 'react';
import { boundMethod } from 'autobind-decorator';
import DraftEditor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import styled, { createGlobalStyle } from 'styled-components';
import { EditorState, RichUtils } from 'draft-js';
import { DraftJsButtonProps } from 'draft-js-buttons';
import { InlineButtonStyle, ItalicButton } from './EditorButtons';
import { EditorTitle } from './EditorTitle';
import { defaultTheme, SidebarThemeStyles } from './sidebar-theme';

const EditorWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 2em;
`;

const EditorStyles = createGlobalStyle`
    .DraftEditor-root {
        font-size: 20px;
        line-height: 1.5;
    }
    .editor-inline-toolbar {
        position: absolute;
        background-color: ${(props) => props.theme.fontColors.backgroundMain};
        padding: .5em;
        border-radius: 5px;
        box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.12);
        display: flex;
    }
    .editor-inline-toolbar-separator {
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 6px;
        background-color: red;
    }
    .editor-inline-button {
        border: none;
        outline: none;
        background: none;
        svg, svg g {
            fill: ${(props) => props.theme.colors.accent};
        }
    }
    .editor-sidebar-button {
        display: none;
    }
`;

const inlineToolbarPlugin = createInlineToolbarPlugin({
    theme: {
        toolbarStyles: { toolbar: 'editor-inline-toolbar' },
    },
});
const sideToolbarPlugin = createSideToolbarPlugin({
    theme: defaultTheme,
});
const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

interface ComponentState {
    editorState: EditorState;
}

class Editor extends Component<any, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    @boundMethod private handleKeyCommand(command: string, editorState: EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.handleChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    @boundMethod private handleChange(editorState: EditorState): void {
        this.setState({ editorState });
    }

    @boundMethod private handleBold(): void {
        const { editorState } = this.state;
        this.handleChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    @boundMethod private handleItalic(): void {
        const { editorState } = this.state;
        this.handleChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }

    public render() {
        const { editorState } = this.state;

        return (
            <EditorWrapper>
                <EditorStyles />
                <SidebarThemeStyles />
                <EditorTitle />
                <DraftEditor
                    editorState={editorState}
                    plugins={plugins}
                    onChange={this.handleChange}
                    handleKeyCommand={this.handleKeyCommand}
                />
                <InlineToolbar>
                    {(externalProps) => (
                        <>
                            <ItalicButton {...externalProps} theme={{ button: 'editor-inline-button' }} />
                            <ItalicButton {...externalProps} theme={{ button: 'editor-inline-button' }} />
                            <ItalicButton {...externalProps} theme={{ button: 'editor-inline-button' }} />
                        </>
                    )}
                </InlineToolbar>
                <SideToolbar />
            </EditorWrapper>
        );
    }
}

export { Editor };
