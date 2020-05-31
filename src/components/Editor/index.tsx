import React, { FC, useState } from 'react';
import { Editor as DraftEditor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

const StyledEditor = styled(DraftEditor)`
    display: none;
`;

const Editor: FC = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    return <StyledEditor editorState={editorState} onChange={setEditorState} placeholder="Здесь можно печатать..." />;
};

export { Editor };
