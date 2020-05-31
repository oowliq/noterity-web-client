import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

const FieldWrapper = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 2px;
        background-color: ${(props) => props.theme.colors.accent};
    }
`;

const Field = styled.input`
    border: none;
    outline: none;
    width: inherit;
    font-size: 20px;
    padding: 1em;
    letter-spacing: 1px;
`;

type HeadFieldProps = HTMLAttributes<HTMLInputElement>;

const HeadField: FC<HeadFieldProps> = (props) => {
    return (
        <FieldWrapper>
            <Field {...props} />
        </FieldWrapper>
    );
};

export { HeadField };
