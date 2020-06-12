import React, { FC } from 'react';
import { BaseIcon, IconProps } from '../BaseIcon';

const ItalicIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 512 512" size={size} color={color}>
        <g>
            <polygon
                points="386.5,40 386.5,0 331.232,0 306.5,0 226.5,0 226.5,40 281.768,40 189.327,472 
	125.5,472 125.5,512 205.5,512 221.673,512 285.5,512 285.5,472 230.232,472 322.673,40 "
            />
        </g>
    </BaseIcon>
);

export { ItalicIcon };
