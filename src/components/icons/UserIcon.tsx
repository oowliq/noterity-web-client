import React, { FC } from 'react';
import { BaseIcon, IconProps } from './BaseIcon';

const UserIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 512 512" size={size} color={color}>
        <g>
            <g>
                <path
                    d="M256,0c-71.017,0-128.789,57.772-128.789,128.789S184.983,257.578,256,257.578s128.789-57.772,128.789-128.789
			S327.017,0,256,0z M256,219.699c-50.127,0-90.91-40.783-90.91-90.91c0-50.127,40.783-90.91,90.91-90.91s90.91,40.783,90.91,90.91
			C346.91,178.916,306.127,219.699,256,219.699z"
                />
            </g>
        </g>
        <g>
            <g>
                <path
                    d="M256,303.033c-113.284,0-202.022,91.787-202.022,208.967h37.879c0-97.539,70.569-171.088,164.143-171.088
			S420.143,414.467,420.143,512h37.879C458.022,394.821,369.284,303.033,256,303.033z"
                />
            </g>
        </g>
    </BaseIcon>
);

export { UserIcon };