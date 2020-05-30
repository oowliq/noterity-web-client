import { Theme } from 'interfaces';

declare module 'styled-components' {
    interface DefaultTheme extends Theme {}
}
