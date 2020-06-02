import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import ClickOutHandler from 'react-onclickout';

const TopMenuWrapper = styled.div`
    position: fixed;
    top: 2em;
    left: 2em;
    background-color: ${(props) => props.theme.colors.backgroundAccent};
    border-radius: 0.9em;
`;

const ShowButton = styled.button<{ open: boolean }>`
    background: none;
    outline: none;
    border: none;
    width: 40px;
    height: 40px;
    position: relative;
    transition: all 0.1s ease;
    &::before {
        transition: all 0.1s ease;
        top: 10px;
        position: absolute;
        content: '';
        height: 3px;
        right: 10px;
        width: ${(props) => (props.open ? '0' : '10px')};
        border-radius: 20em;
        background-color: #fff;
    }
    &::after {
        transition: all 0.1s ease;
        bottom: 10px;
        position: absolute;
        content: '';
        left: 10px;
        height: 3px;
        width: ${(props) => (props.open ? '0' : '10px')};
        border-radius: 20em;
        background-color: #fff;
    }
    span {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        &::after {
            position: absolute;
            transition: all 0.1s ease;
            top: 0;
            content: '';
            left: 10px;
            top: 18px;
            height: 3px;
            width: 20px;
            border-radius: 20em;
            background-color: #fff;
            ${(props) =>
                props.open &&
                css`
                    transform: rotate(90deg);
                `}
        }
    }

    &:hover {
        cursor: pointer;
    }

    ${(props) =>
        !props.open &&
        css`
            &:hover {
                cursor: pointer;

                &::before {
                    width: 20px;
                }

                &::after {
                    width: 20px;
                }
            }
        `}
`;

const PosedTopMenuWrapper = posed(TopMenuWrapper)({
    open: { width: '300px', height: '100px' },
    closed: { width: '40px', height: '40px' },
});

const TopMenu: FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleToggle = (): void => setOpen((o) => !o);

    const handleClose = (): void => {
        if (open) setOpen(false);
    };

    return (
        <ClickOutHandler onClickOut={handleClose}>
            <PosedTopMenuWrapper pose={open ? 'open' : 'closed'}>
                <ShowButton open={open} onClick={handleToggle}>
                    <span />
                </ShowButton>
            </PosedTopMenuWrapper>
        </ClickOutHandler>
    );
};

export { TopMenu };
