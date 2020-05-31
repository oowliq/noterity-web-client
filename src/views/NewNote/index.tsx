import React, { FC } from 'react';
import { Editor, HeadField } from 'components';
import styled from 'styled-components';

const EditorWrapper = styled.div`
    margin-top: 1em;
    padding: 0 1em;
`;

const NewNoteView: FC = () => {
    return (
        <div>
            <HeadField placeholder="Note title" />
            <EditorWrapper>
                <Editor />
            </EditorWrapper>
        </div>
    );
};

export { NewNoteView };
