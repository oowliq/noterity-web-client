import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DashboardLayout } from 'layouts';

const Routes: FC = () => {
    return (
        <Switch>
            <Route path="/">
                <DashboardLayout />
            </Route>
        </Switch>
    );
};

export { Routes };
