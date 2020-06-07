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

const SidebarStyles = createGlobalStyle`
    .editor-sidebar-button-wrapper {
        display: inline-block;
    };
    .editor-sidebar-button {
        background: red;
        color: #888;
        font-size: 18px;
        border: 0;
        padding-top: 5px;
        vertical-align: bottom;
        height: 34px;
        width: 36px;
        &:hover,
        &:focus {
            background: #f3f3f3;
            outline: 0; /* reset for :focus */
        }
        svg {
            fill: #888;
        }
    };
    .editor-sidebar-active {
        background: #efefef;
        color: #444;
        svg {
            fill: #444;
        }
    }
    .editor-sidebar-separator {
        display: inline-block;
        border-right: 1px solid #ddd;
        height: 24px;
        margin: 0 0.5em;
    }
    .editor-sidebar-blocktype {
       border: 1px solid ${(props) => props.theme.fontColors.tinted};
       border-radius: 20em;
       width: 30px;
       height: 30px;
       position: relative;
       display: flex;
       align-items: center;
       justify-content: center;
       left: 42px;
       top: 0px;
       svg {
           fill: ${(props) => props.theme.colors.accent};
       }
    }
    .editor-sidebar-spacer {
        position: absolute;
        left: 20px;
        width: 74px;
        height: 8px;
    }
    .editor-sidebar-popup {
        position: absolute;
        left: 57px;
        top: 30px;
        transform: translate(-50%);
        background: #efefef;
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 2px;

        z-index: 3;
        box-sizing: border-box;
        width: 74px;
        margin-top: 8px;
        padding: 1em;
        border-radius: 5px;

    }
    .editor-sidebar-toolbar-wrapper {
        position: absolute;
    }
`;

const sidebarTheme = {
    buttonStyles: {
        buttonWrapper: 'editor-sidebar-button-wrapper',
        button: 'editor-sidebar-wrapper',
        active: 'editor-sidebar-active',
        separator: 'editor-sidebar-separator',
    },
    blockTypeSelectStyles: {
        blockType: 'editor-sidebar-blocktype',
        spacer: 'editor-sidebar-spacer',
        popup: 'editor-sidebar-popup',
    },
    toolbarStyles: {
        wrapper: 'editor-sidebar-toolbar-wrapper',
    },
};

const EditorGlobalStyles: FC = () => (
    <>
        <EditorStyles />
        <SidebarStyles />
    </>
);

export { EditorGlobalStyles, sidebarTheme };
