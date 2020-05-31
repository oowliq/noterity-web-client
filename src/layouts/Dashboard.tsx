import React, { FC } from 'react';
import AppSidebar from 'components/AppSidebar';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { NewNoteView } from 'views';

const StyledDashboard = styled.div`
    display: flex;
`;

const View = styled.div`
    background-color: ${(props) => props.theme.colors.secondary};
    width: 100%;
    margin: 1em;
    margin-top: 6em;
    position: relative;
    border-radius: 4px;
    ${(props) => props.theme.borders};
`;

const Title = styled.h1`
    position: absolute;
    top: -2em;
    left: 0;
    color: ${(props) => props.theme.fontColors.inactive};
    font-size: 30px;
    letter-spacing: 2px;
`;

const DashboardChild = styled.div``;

const Dashboard: FC = () => {
    return (
        <StyledDashboard>
            <AppSidebar />
            <Switch>
                <Route exact path="/new-note">
                    <View>
                        <Title>New note</Title>
                        <DashboardChild>
                            <NewNoteView />
                        </DashboardChild>
                    </View>
                </Route>
                <Route exact path="/notes">
                    <View>
                        <Title>Notes</Title>
                    </View>
                </Route>
            </Switch>
        </StyledDashboard>
    );
};

export default Dashboard;
