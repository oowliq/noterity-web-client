import React, { FC } from 'react';
import { GlobalStyle } from 'theme';

const Root: FC = ({ children }) => (
    <div>
        <GlobalStyle />
        {children}
    </div>
);

export { Root };
