import { generateMedia } from 'styled-media-query';

const customMedia = generateMedia({
    huge: '1440px',
    large: '1170px',
    medium: '780px',
    small: '450px',
});

export { customMedia as media };
