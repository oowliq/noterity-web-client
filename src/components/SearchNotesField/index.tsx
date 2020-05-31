import React, { FC } from 'react';
import styled from 'styled-components';
import { SearchIcon } from 'components/icons';

const FieldWrapper = styled.div`
    margin-top: 4em;
    background: ${(props) => props.theme.colors.backgroundAccent};
    border-radius: 1.2em;
    overflow: hidden;
    padding: 1em;
    display: flex;
`;

const Field = styled.input`
    border: none;
    outline: none;
    background: none;
    display: flex;
    width: 100%;
    height: 100%;
    font-size: 18px;
    color: ${(props) => props.theme.fontColors.backgroundMain};
    margin-left: 1em;

    &:focus {
        &::placeholder {
            opacity: 0;
        }
    }

    &::placeholder {
        transition: all 0.2s ease;
        color: ${(props) => props.theme.fontColors.tinted};
    }
`;

const SearchIconWrap = styled.div`
    position: relative;
    top: 1px;
    left: 1px;
`;

const SearchNotesField: FC = () => {
    return (
        <FieldWrapper>
            <SearchIconWrap>
                <SearchIcon size={18} color="#fff" />
            </SearchIconWrap>

            <Field placeholder="Search notes on the web..." />
        </FieldWrapper>
    );
};

export { SearchNotesField };
