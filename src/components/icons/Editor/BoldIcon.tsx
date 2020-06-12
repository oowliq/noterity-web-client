import React, { FC } from 'react';
import { BaseIcon, IconProps } from '../BaseIcon';

const BoldIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 512 512" size={size} color={color}>
        <path
            d="M366.885,213.55c23.174-22.623,37.588-54.183,37.588-89.05c0-68.649-55.851-124.5-124.5-124.5
	H30.5v40h59.973v432H30.5v40H330c83.537,0,151.5-67.963,151.5-151.5C481.5,289.682,432.654,230.064,366.885,213.55z M279.973,40
	c46.593,0,84.5,37.906,84.5,84.5s-37.907,84.5-84.5,84.5h-149.5V40H279.973z M330,472H130.473V249H330
	c61.481,0,111.5,50.019,111.5,111.5S391.481,472,330,472z"
        />
    </BaseIcon>
);

export { BoldIcon };
