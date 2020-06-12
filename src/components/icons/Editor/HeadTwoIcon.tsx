import React, { FC } from 'react';
import { BaseIcon, IconProps } from '../BaseIcon';

const HeadTwoIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 512 512" size={size} color={color}>
        <path
            d="M251.591,451.899h42.385L163.708,74.319h-31.556L0,451.899h42.45l33.656-96.161h142.308
	L251.591,451.899z M90.13,315.671l57.642-164.693l56.819,164.693H90.13z M417.7,182.732l-94.3-94.3l28.331-28.331l65.969,65.969
	l65.969-65.969L512,88.432L417.7,182.732z"
        />
    </BaseIcon>
);

export { HeadTwoIcon };
