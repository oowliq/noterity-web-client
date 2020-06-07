import React, { FC, useState, useRef, useEffect } from 'react';
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

interface EditorTitleProps {
    onInit: (ref: HTMLInputElement | null) => void;
    onEnter: () => void;
}

const EditorTitle: FC<EditorTitleProps> = ({ onInit, onEnter }) => {
    const [value, setValue] = useState<string>('');

    const title = useRef<HTMLInputElement>(null);

    useEffect((): void => {
        onInit(title.current);
    }, [title]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') onEnter();
    };

    return (
        <TitleWrapper content={!!value.length}>
            <TitleField
                placeholder="Note title"
                value={value}
                ref={title}
                onKeyDown={handleEnter}
                onChange={handleChange}
            />
        </TitleWrapper>
    );
};

export { EditorTitle };
