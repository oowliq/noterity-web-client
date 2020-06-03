import React, { FC } from 'react';
import styled from 'styled-components';
import { adjustHue } from 'polished';
import { MainPage } from 'views';
import { AddIcon } from 'components/icons';
import { TopMenu } from 'components';
import { Switch, Route } from 'react-router-dom';

const StyledDashboard = styled.div`
    display: flex;
`;
const DashboardChild = styled.div``;

const NewNoteButton = styled.button`
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
`;

const DashboardLayout: FC = () => (
    <div>
        <TopMenu />
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
        </Switch>
        <NewNoteButton>
            <AddIcon size={20} color="#fff" />
        </NewNoteButton>
    </div>
);

export { DashboardLayout };
