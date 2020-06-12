import React, { FC } from 'react';
import { BaseIcon, IconProps } from '../BaseIcon';

const UnderlineIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 512 512" size={size} color={color}>
        <path
            d="M512,512H0v-40h512V512z M422,258.5V0h-40v258.5c0,69.201-56.523,125.5-126,125.5
	s-126-56.299-126-125.5V0H90v258.5C90,349.757,164.468,424,256,424S422,349.757,422,258.5z"
        />
    </BaseIcon>
);

export { UnderlineIcon };
