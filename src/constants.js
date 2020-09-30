// const API_ROOT = 'http://localhost:8080/api';
export const API_ROOT = 'http://37.140.198.217:8080';
export const IMG_URL = id => `/image/${id}`;

export const colorBlack = "rgba(0, 0, 0)";
export const colorWhite = "rgb(249,249,249)";
export const baseColor = "rgb(0,0,255)";
export const colorRed = "red";
export const colorGrey = "rgba(0,0,0,0.41)";

export const defScaleValue = 8.4;
export const y3dcefficient = 0.75;
export const defPartitionWidth = 50;
export const doorLength = 800;

export const cos7 = Math.cos(7.1 * Math.PI / 180);
export const cos41 = Math.cos((90 - 41.25) * Math.PI / 180);
export const sin7 = Math.sin(7.1 * Math.PI / 180);
export const sin41 = Math.sin((90 - 41.25) * Math.PI / 180);

export const pol = new Image();
pol.crossOrigin = 'Anonymous';
export const fon = new Image();
fon.crossOrigin = 'Anonymous';
export const vagonka = new Image();
vagonka.crossOrigin = 'Anonymous';
export const imageTextureHeight = 500;
export const imageCoeffWidth = 3000 / 12000;
export const prices = {
    partition1m: 2.3,
    light: 500,
    door: 3000
};
