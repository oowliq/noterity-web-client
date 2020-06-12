import React, { FC } from 'react';
import { BaseIcon, IconProps } from '../BaseIcon';

const HeadOneIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 512 512" size={size} color={color}>
        <path
            d="M345.374,512h42.291L211.138,0.336h-31.486L0.571,512h42.356l55.269-157.912h192.698
	L345.374,512z M112.188,314.11l83.049-237.285l81.865,237.285H112.188z M483.161,122.358l-65.822-65.821l-65.821,65.821
	L323.25,94.09L417.34,0l94.09,94.09L483.161,122.358z"
        />
    </BaseIcon>
);

export { HeadOneIcon };
