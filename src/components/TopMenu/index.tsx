import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import posed from 'react-pose';
import ClickOutHandler from 'react-onclickout';
import { ListIcon, UserIcon } from 'components/icons';
import { TopMenuItem } from './TopMenuItem';

const TopMenuWrapper = styled.div`
    position: fixed;
    top: 2em;
    left: 2em;
    background-color: ${(props) => props.theme.colors.backgroundAccent};
    border-radius: 0.9em;
    overflow: hidden;
    z-index: 2;
`;

const ShowButton = posed(styled.button<{ open: boolean }>`
    background: none;
    outline: none;
    border: none;
    width: 40px;
    height: 40px;
    position: absolute;
    transition: all 0.1s ease;
    z-index: 1;
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
`)({ open: { y: '29px' }, closed: { y: 0 } });

const PosedTopMenuWrapper = posed(TopMenuWrapper)({
    open: { width: '300px', height: '100px' },
    closed: { width: '40px', height: '40px' },
});

const TopMenuList = posed(styled.div`
    display: flex;
    position: absolute;
    left: 3em;
    top: 1.5em;
`)({
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-200%' },
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
                <ShowButton open={open} pose={open ? 'open' : 'closed'} onClick={handleToggle}>
                    <span />
                </ShowButton>
                <TopMenuList pose={open ? 'open' : 'closed'}>
                    <TopMenuItem>
                        <ListIcon size={20} color="#894EC7" />
                    </TopMenuItem>
                    <TopMenuItem>
                        <UserIcon size={20} color="#894EC7" />
                    </TopMenuItem>
                </TopMenuList>
            </PosedTopMenuWrapper>
        </ClickOutHandler>
    );
};

export { TopMenu };
