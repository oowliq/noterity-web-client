import React, { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { CloseIcon } from 'components/icons';

const FieldWrapper = posed(styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 5px;
    background-color: #fff;
    display: flex;
    align-items: center;
`)({
    s: {
        y: 0,
        opacity: 1,
        transition: {
            y: {
                type: 'spring',
                stiffness: 1000,
                damping: 500,
            },
        },
    },
    hidden: {
        y: '100%',
        opacity: 0,
        transition: {
            y: {
                type: 'spring',
                stiffness: 1000,
                damping: 500,
            },
        },
    },
});

const Field = styled.input`
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
`;

const CloseButton = styled.button`
    border: none;
    outline: none;
    background: none;
    &:hover {
        cursor: pointer;
    }
`;

interface InlineToolbarFieldProps {
    showed: boolean;
    title: string | undefined;
    onClose: () => void;
}

const InlineToolbarField: FC<InlineToolbarFieldProps> = ({ showed, title, onClose }) => {
    const field = useRef<HTMLInputElement>(null);

    const handleClose = (): void => {
        onClose();
    };

    useEffect((): void => {
        if (showed && field.current) field.current.focus();
    }, [showed]);

    return (
        <FieldWrapper pose={showed ? 's' : 'hidden'}>
            <Field type="text" placeholder={title} ref={field} />
            <CloseButton onClick={handleClose}>
                <CloseIcon size={10} />
            </CloseButton>
        </FieldWrapper>
    );
};

export { InlineToolbarField };
