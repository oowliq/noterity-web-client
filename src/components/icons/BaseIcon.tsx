import React, { FC } from 'react';
import IconBase from 'react-icon-base';

export interface IconProps {
    size: number;
    color?: string;
}

type BaseIconProps = React.HTMLProps<HTMLDivElement> & {
    viewBox: string;
} & IconProps;

const BaseIcon: FC<BaseIconProps> = ({ children, viewBox, size, color }) => (
    <IconBase viewBox={viewBox} size={size} color={color || '#000'}>
        {children}
    </IconBase>
);

export { BaseIcon };
