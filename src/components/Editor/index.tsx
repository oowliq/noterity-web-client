import React, { Component } from 'react';
import { boundMethod } from 'autobind-decorator';
import DraftEditor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import styled, { createGlobalStyle } from 'styled-components';
import { EditorState, RichUtils } from 'draft-js';

const EditorWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const EditorStyles = createGlobalStyle`
    .DraftEditor-root {
        width: 100%;
        height: 100%;
        font-size: 20px;
    }
`;

const ToolbarButton = styled.button`
    border: none;
    outline: none;
    background: none;
    padding: 1em;
`;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];

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
                <DraftEditor
                    editorState={editorState}
                    plugins={plugins}
                    onChange={this.handleChange}
                    handleKeyCommand={this.handleKeyCommand}
                />
                <InlineToolbar>
                    {(externalProps) => (
                        <>
                            <ToolbarButton type="button" onMouseDown={this.handleBold}>
                                Bold
                            </ToolbarButton>
                            <ToolbarButton type="button" onMouseDown={this.handleItalic}>
                                Italic
                            </ToolbarButton>
                        </>
                    )}
                </InlineToolbar>
            </EditorWrapper>
        );
    }
}

export { Editor };
