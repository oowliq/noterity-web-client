import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';

const EditorStyles = createGlobalStyle`
    .DraftEditor-root {
        font-size: 20px;
        line-height: 1.5;
    }
    .RichEditor-blockquote {
        font-size: 40px;
    }
    .RichEditor-note-title {
        font-weight: 300;
        font-size: 35px;
        letter-spacing: 2px;
        text-transform: uppercase;
        position: relative;
        margin-bottom: 1em;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            width: 100%;
            background-color: ${(props) => props.theme.fontColors.tinted};
        }
    }
    .RichEditor-title {
        font-weight: 300;
        font-size: 35px;
        letter-spacing: 2px;
        text-transform: uppercase;
        position: relative;
        margin-bottom: 1em;
    }
    .RichEditor-sub-title {
        font-weight: 300;
        font-size: 35px;
        letter-spacing: 2px;
        text-transform: uppercase;
        position: relative;
        margin-bottom: 1em;
    }
    .RichEditor-blockquote {
        border-left: 2px solid ${(props) => props.theme.fontColors.tinted};
        padding-left: 1em;
        font-size: 20px;
    }
    .editor-inline-toolbar {
        position: absolute;
        background-color: ${(props) => props.theme.fontColors.backgroundMain};
        padding: .5em;
        border-radius: 5px;
        box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.12);
        display: flex;
        background-color: #fff;
        z-index: 1;
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

const EditorGlobalStyles: FC = () => (
    <>
        <EditorStyles />
    </>
);

export { EditorGlobalStyles };
