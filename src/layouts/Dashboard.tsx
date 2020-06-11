import React, { FC } from 'react';
import styled from 'styled-components';
import { adjustHue } from 'polished';
import { MainPage, NewNote } from 'views';
import { AddIcon } from 'components/icons';
import { TopMenu } from 'components';
import { Switch, Route, NavLink } from 'react-router-dom';

const NewNoteButton = styled(NavLink)`
    position: fixed;
    bottom: 2em;
    right: 2em;
    background: none;
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.colors.accent};
    background: linear-gradient(
        45deg,
        ${(props) => props.theme.colors.accent} 0%,
        ${(props) => adjustHue(30, props.theme.colors.accent)} 100%
    );
    border-radius: 1.5em;
    padding: 1.5em;
    transition: all 0.1s ease;
    &:hover {
        cursor: pointer;
        transform: scale(1.2);
    }
    &:active {
        cursor: pointer;
        transform: scale(0.8);
    }

    &.active {
        display: none;
    }
`;

const DashboardChild = styled.div`
    margin-top: 6em;
    padding: 0 2em;
    height: 87vh;
    display: flex;

    justify-content: center;
`;

const DashboardLayout: FC = () => {
    return (
        <div>
            <TopMenu />
            <DashboardChild>
                <Switch>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route path="/new-note" exact>
                        <NewNote />
                    </Route>
                </Switch>
            </DashboardChild>
            <NewNoteButton to="/new-note">
                <AddIcon size={20} color="#fff" />
            </NewNoteButton>
        </div>
    );
};

export { DashboardLayout };
