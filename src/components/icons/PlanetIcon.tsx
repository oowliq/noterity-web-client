import React, { FC } from 'react';
import { BaseIcon, IconProps } from './BaseIcon';

const PlanetIcon: FC<IconProps> = ({ size, color }) => (
    <BaseIcon viewBox="0 0 512 512" size={size} color={color}>
        <path d="m123.132 373.416a6 6 0 0 0 4.244-10.242 161.177 161.177 0 0 1 -23.48-29.789 6 6 0 0 0 -10.238 6.261 173.184 173.184 0 0 0 25.23 32.011 5.984 5.984 0 0 0 4.244 1.759z" />
        <path d="m85.217 190.36a6 6 0 0 0 -7.612 3.75 172.51 172.51 0 0 0 -3.47 99.754 6 6 0 0 0 11.6-3.057 160.54 160.54 0 0 1 3.228-92.835 6 6 0 0 0 -3.746-7.612z" />
        <path d="m35.459 66.715a30.082 30.082 0 0 1 18.928 18.943 6 6 0 0 0 11.385 0 30.081 30.081 0 0 1 18.928-18.943 6 6 0 0 0 0-11.383 30.082 30.082 0 0 1 -18.928-18.943 6 6 0 0 0 -11.385 0 30.085 30.085 0 0 1 -18.928 18.943 6 6 0 0 0 0 11.383zm24.621-15.4a42.344 42.344 0 0 0 9.7 9.705 42.348 42.348 0 0 0 -9.7 9.706 42.392 42.392 0 0 0 -9.7-9.706 42.368 42.368 0 0 0 9.7-9.702z" />
        <path d="m435.75 438.463a30.082 30.082 0 0 1 -18.927-18.942 6 6 0 0 0 -11.385 0 30.079 30.079 0 0 1 -18.928 18.942 6 6 0 0 0 0 11.384 30.081 30.081 0 0 1 18.928 18.942 6 6 0 0 0 11.385 0 30.083 30.083 0 0 1 18.927-18.943 6 6 0 0 0 0-11.384zm-24.62 15.4a42.363 42.363 0 0 0 -9.7-9.705 42.324 42.324 0 0 0 9.7-9.7 42.368 42.368 0 0 0 9.7 9.7 42.407 42.407 0 0 0 -9.7 9.702z" />
        <path d="m358.871 483.631a11.685 11.685 0 1 0 11.68 11.684 11.7 11.7 0 0 0 -11.68-11.684z" />
        <path d="m120.292 28.369a11.685 11.685 0 1 0 -11.68-11.684 11.7 11.7 0 0 0 11.68 11.684z" />
        <path d="m470.583 7.182a6 6 0 0 0 0 8.485c14.237 14.248 21.612 33.6 21.919 57.309a6.089 6.089 0 0 0 6 6.024h.079a6.062 6.062 0 0 0 5.922-6.179c-.35-26.949-8.906-49.049-25.431-65.586a6 6 0 0 0 -8.489-.053z" />
        <path d="m494.451 109.714a6 6 0 0 0 -7.269 4.378c-1.408 5.676-3.115 11.589-5.075 17.575a6 6 0 1 0 11.4 3.734c2.05-6.264 3.84-12.461 5.318-18.419a6 6 0 0 0 -4.374-7.268z" />
        <path d="m302.817 50.569a208.834 208.834 0 0 0 -209.473 51.706c-56.627 56.669-73.778 138.1-51.48 209.78a6.029 6.029 0 0 0 -1.089 1.4c-38.913 68.896-43.832 120.976-14.224 150.605 12.677 12.685 29.581 19.017 50.211 19.016 23.483 0 51.791-8.208 84.155-24.591q8.757-4.431 17.785-9.593a208.564 208.564 0 0 0 261.014-261.243c12.248-21.484 21.408-41.718 27.088-60.022 12.612-40.638 8.6-71.656-11.92-92.192-29.874-29.896-82.431-24.635-152.067 15.134zm-200.984 60.189a196.788 196.788 0 0 1 199.11-48.19 6.042 6.042 0 0 0 1.4.443 193.724 193.724 0 0 1 29.638 12.589 6.043 6.043 0 0 0 1.04.541 198.165 198.165 0 0 1 79.957 79.069c-10.426 20.048-24.368 42.1-41.476 65.189a45.25 45.25 0 0 0 -8.087-.736 45.989 45.989 0 0 0 -43.028 62.179c-7.546 8.176-15.368 16.337-23.323 24.3-50.412 50.449-103.955 91.622-150.82 115.99a196.586 196.586 0 0 1 -44.411-33.394c-76.585-76.638-76.585-201.338 0-277.98zm246.367-39.786c38-17.572 66.534-20.545 79.114-7.957 12.927 12.936 9.38 41.811-7.951 79.222a210.581 210.581 0 0 0 -71.163-71.265zm46.939 182.5a33.974 33.974 0 1 1 -31.722-21.8 33.872 33.872 0 0 1 31.72 21.796zm-261.862 175.039c-38.043 17.615-66.534 20.6-79.154 7.968-12.589-12.6-9.608-41.185 7.98-79.244a209.421 209.421 0 0 0 71.174 71.276zm22.223 19.268c-23.947 12.121-53.051 23.35-78.689 23.349-15.96 0-30.58-4.353-41.77-15.551-12.936-12.943-17.829-31.677-14.541-55.699 2.868-20.972 11.819-45.507 26.6-73.007q3.517 8.88 7.882 17.479c-10.929 22.015-17.581 41.481-19.757 57.88-2.51 18.926.994 33.3 10.417 42.732 7.425 7.43 18.072 11.118 31.483 11.117 19.437 0 44.673-7.753 74.262-23.092 48.021-24.893 102.774-66.929 154.173-118.364 7.1-7.1 14.1-14.365 20.891-21.657a46.36 46.36 0 0 0 10.749 10.449c-6.872 7.376-13.922 14.695-21.045 21.822-52.985 53.015-111.539 97.68-160.655 122.542zm276.61-153.74a196.412 196.412 0 0 1 -239.172 146.391c42.525-26.27 88.222-63.2 131.7-106.71 8.024-8.031 15.957-16.3 23.652-24.627a46.007 46.007 0 0 0 58.05-59.928 45.207 45.207 0 0 0 -2.973-6.257c10.346-13.976 19.665-27.694 27.887-41.011a197.472 197.472 0 0 1 .854 92.142zm23.236-169.968c-9.743 31.392-30.3 68.948-59.6 108.95a46.663 46.663 0 0 0 -12.246-8.681c17.024-23.263 31.022-45.667 41.524-66.343.023-.041.042-.084.064-.126a267.583 267.583 0 0 0 13.992-32.227c11.52-32.851 10.382-57.444-3.28-71.112-9.424-9.432-23.792-12.932-42.709-10.425-16.363 2.173-35.779 8.812-57.737 19.718q-8.544-4.367-17.458-7.914c26.745-14.387 50.688-23.232 71.305-26.325 24.744-3.71 43.985 1.111 57.195 14.331 17.125 17.137 20.135 44.104 8.948 80.154z" />
    </BaseIcon>
);

export { PlanetIcon };
