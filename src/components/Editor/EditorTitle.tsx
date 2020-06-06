import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

const TitleWrapper = styled.div<{ content: boolean }>`
    margin-bottom: 2em;
    position: relative;
    ${(props) =>
        props.content &&
        css`
            &::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0;
                right: 0;
                height: 1px;
                background-color: ${props.theme.fontColors.tinted};
            }
        `}
`;

const TitleField = styled.input`
    border: none;
    outline: none;
    background: none;
    font-size: 25px;

    &::placeholder {
        color: ${(props) => props.theme.fontColors.tinted};
    }

    &:focus {
        &::placeholder {
            opacity: 0;
        }
    }
`;

const EditorTitle: FC = () => {
    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
    };

    return (
        <TitleWrapper content={value.length}>
            <TitleField placeholder="Note title" value={value} onChange={handleChange} />
        </TitleWrapper>
    );
};

export { EditorTitle };
