import React, { FC } from 'react';
import styled from 'styled-components';
import { Editor } from 'components';

const Wrapper = styled.div`
    background-color: ${(props) => props.theme.fontColors.backgroundMain};
    border-radius: 4px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    min-width: 1000px;
    padding: 1em;
`;

const NewNote: FC = () => {
    return (
        <Wrapper>
            <Editor />
        </Wrapper>
    );
};

export { NewNote };
