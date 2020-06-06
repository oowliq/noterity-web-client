import React, { FC } from 'react';
import { BaseIcon, IconProps } from '../BaseIcon';

const ItalicIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 298.667 298.667" size={size} color={color}>
        <g>
            <polygon
                points="106.667,0 106.667,64 153.92,64 80.747,234.667 21.333,234.667 21.333,298.667 192,298.667 192,234.667
			144.747,234.667 217.92,64 277.333,64 277.333,0 		"
            />
        </g>
    </BaseIcon>
);

export { ItalicIcon };
