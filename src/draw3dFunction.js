import {cos41, cos7, imageCoeffWidth, imageTextureHeight, sin41, sin7} from "./constants";
import {getImageFromMap} from "./variable";
// import {filterFrontDoor, filterLeftDoor, isSerialized, parseDataTo3DCreate} from "./functions";
// import {getShapes} from "./variable";
//
// export function build(ctx) {
//
//     let drawBasisRight1 = ({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, w, h}) => {
//         draw3dRigth({
//             name,
//             x1,
//             x2,
//             x3,
//             x4,
//             y1,
//             y2,
//             y3,
//             y4,
//             h1,
//             h2,
//             color: 'rgb(205,128,0)',
//             w,
//             h
//         }, 'rgb(205,128,0)');
//     };
//
//     let drawKarkasInner1 = ({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, w, h}) => {
//         draw3dBack({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color: 'rgb(205,128,0)', w, h}, 'rgb(205,128,0)')
//     };
//
//
//     let draw3dBack = ({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal}, strokeStyle) => {
//         ctx.save();
//         ctx.beginPath();
//         ctx.strokeStyle = strokeStyle || 'rgb(0,0,0)';
//         ctx.fillStyle = color;
//         ctx.moveTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h1);
//         ctx.lineTo(x2 * cos7 + sin41 * y2, y2 * cos41 - sin7 * x2 - h1);
//         ctx.lineTo(x2 * cos7 + sin41 * y2, y2 * cos41 - sin7 * x2 - h2);
//         ctx.lineTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h2);
//         ctx.lineTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h1);
//         ctx.stroke();
//         color && ctx.fill();
//         ctx.closePath();
//         ctx.restore();
//     };
//
//     let drawKarkasBottom = ({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, w, h}) => {
//         let x = x1 * cos7 + sin41 * y1;
//         let y = y1 * cos41 - sin7 * x1 - h1;
//         ctx.save();
//         ctx.beginPath();
//         ctx.setTransform(1, -0.126, 1.145, 1, -y * 114.5 / 100, x * 12.6 / 100);
//         ctx.drawImage(pol, 0, 0, imageCoeffWidth * w, imageTextureHeight, x, y, (w / scale) - 4 * defScaleValue / scale, h * 0.49 / scale);
//         ctx.closePath();
//         ctx.restore();
//     }
//
//     return {
//         drawBasisRight1, drawKarkasInner1, draw3dRoof, draw3dBack, drawKarkasBottom
//     };
// }

export function draw3dRoof(canvasData, {name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal}) {
    let {ctx, scale, cos7, sin41, cos41, sin7} = canvasData;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.fillStyle = color;
    ctx.moveTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h2);
    ctx.lineTo(x2 * cos7 + sin41 * y2, y2 * cos41 - sin7 * x2 - h2);
    ctx.lineTo(x3 * cos7 + sin41 * y3, y3 * cos41 - sin7 * x3 - h2);
    ctx.lineTo(x4 * cos7 + sin41 * y4, y4 * cos41 - sin7 * x4 - h2);
    ctx.lineTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h2);
    ctx.stroke();
    color && ctx.fill();
    ctx.closePath();
    ctx.restore();
};
//
// export function drawKarkasInner2({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, w, h}) {
//     let karkasDepth1 = karkasDepth * defScaleValue / scale;
//     let x11 = x1 + karkasDepth1;
//     let y11 = y1 + karkasDepth1 * y3dcefficient;
//
//     ctx.save();
//     ctx.beginPath();
//     let x = x11 * cos7 + sin41 * y11;
//     let y = y11 * cos41 - sin7 * x11 - h2;
//     ctx.setTransform(1, -0.1217, 0, 1, 0, x * 12.17 / 100);
//     ctx.drawImage(vagonka, 0, 0, imageCoeffWidth * w, imageTextureHeight, x, y, ((w / scale) - 2.3 * karkasDepth1), karkasHeight / scale);
//     ctx.closePath();
//     ctx.restore();
//     draw3dBack({name, x1: x11, x2: x2 - (karkasDepth1), x3, x4, y1: y11, y2: y11, y3, y4, h1, h2, color, w, h})
// }
//
// export function drawKarkasRight2({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, w, h}) {
//     let karkasDepth1 = karkasDepth * defScaleValue / scale;
//     let x11 = x2 - karkasDepth1;
//     let y11 = y2 + karkasDepth1 * y3dcefficient;
//     ctx.save();
//     ctx.beginPath();
//     let x = x11 * cos7 + sin41 * y11;
//     let y = y11 * cos41 - sin7 * x11 - h2;
//     ctx.setTransform(1, 0.875, 0, 1, 0, -x * 87.5 / 100);
//     ctx.drawImage(vagonka, 0, 0, imageCoeffWidth * h * 0.58, imageTextureHeight, x, y, h * 0.55 / scale, karkasHeight / scale);
//     ctx.closePath();
//     ctx.restore();
//     draw3dRigth({
//         name,
//         x1,
//         x2: x2 - karkasDepth1,
//         x3: x3 - karkasDepth1,
//         x4,
//         y1,
//         y2: y2 + karkasDepth1 * y3dcefficient,
//         y3: y3 - karkasDepth1,
//         y4,
//         h1,
//         h2,
//         color,
//         w,
//         h
//     })
// }
//
// export function drawFrontImage({name, x1, x2, x3, x4, y1, y2, y3, y4, hh, h1, h2, h, w, color, image, gorizontal}) {
//     let img = imageMap.get(image);
//     let x = x4 * cos7 + sin41 * y4;
//     let y = y4 * cos41 - sin7 * x4 - h2;
//
//     ctx.save();
//     ctx.beginPath();
//     ctx.setTransform(1, -0.1217, 0, 1, 0, x * 12.17 / 100);
//     img && ctx.drawImage(img, x, y, w / scale, hh / scale);
//
//     ctx.closePath();
//     ctx.restore();
// }
//
//
// export function draw3dPartition({name, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal, shape}) {
//     if (gorizontal) {
//         let x = x4 * cos7 + sin41 * y4;
//         let y = y4 * cos41 - sin7 * x4 - h2;
//         ctx.save();
//         ctx.beginPath();
//         ctx.setTransform(1, -0.1217, 0, 1, 0, x * 12.17 / 100);
//         ctx.drawImage(vagonka, 0, 0, imageCoeffWidth * w, imageTextureHeight, x, y, w / scale - 4 * defScaleValue / scale, karkasHeight / scale);
//         ctx.closePath();
//         ctx.restore();
//     } else {
//         ctx.save();
//         ctx.beginPath();
//         let x = x1 * cos7 + sin41 * y1;
//         let y = y1 * cos41 - sin7 * x1 - h2;
//         ctx.setTransform(1, 0.875, 0, 1, 0, -x * 87.5 / 100);
//         ctx.drawImage(vagonka, 0, 0, imageCoeffWidth * h, imageTextureHeight, x, y, h * 0.565 / scale, karkasHeight / scale);
//         ctx.closePath();
//         ctx.restore();
//     }
//     draw3dLeft({name, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color: gorizontal && color, gorizontal});
//     draw3dFront({name, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color: !gorizontal && color, gorizontal});
//     draw3dRoof({name, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal});
//
//     shape.getDoorsIfExist().forEach(door => {
//         let data3D = parseDataTo3DCreate(door);
//         if (gorizontal) {
//             !!data3D.image ? drawFrontImage(data3D) : draw3dFront(data3D);
//         } else {
//             !!data3D.image ? drawLeftImage(data3D) : draw3dLeft(data3D);
//         }
//     });
//
//     getShapes().filter(isSerialized).filter(filterFrontDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawFrontImage(item) : draw3dRectangle(item));
//     getShapes().filter(isSerialized).filter(filterLeftDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawLeftImage(item) : draw3dRectangle(item));
// }
//
//
// export function draw3dRigth({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal}, strokeStyle) {
//     ctx.save();
//     ctx.beginPath();
//     ctx.strokeStyle = strokeStyle || 'rgb(0,0,0)';
//     ctx.fillStyle = color;
//     ctx.moveTo(x2 * cos7 + sin41 * y2, y2 * cos41 - sin7 * x2 - h1);
//     ctx.lineTo(x2 * cos7 + sin41 * y2, y2 * cos41 - sin7 * x2 - h2);
//     ctx.lineTo(x3 * cos7 + sin41 * y3, y3 * cos41 - sin7 * x3 - h2);
//     ctx.lineTo(x3 * cos7 + sin41 * y3, y3 * cos41 - sin7 * x3 - h1);
//     ctx.lineTo(x2 * cos7 + sin41 * y2, y2 * cos41 - sin7 * x2 - h1);
//     ctx.stroke();
//     color && ctx.fill();
//     ctx.closePath();
//     ctx.restore();
// }
//
// export function draw3dFloor({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal}) {
//     ctx.save();
//     ctx.beginPath();
//     ctx.strokeStyle = 'rgb(0,0,0)';
//     ctx.fillStyle = color;
//     ctx.moveTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h1);
//     ctx.lineTo(x2 * cos7 + sin41 * y2, y2 * cos41 - sin7 * x2 - h1);
//     ctx.lineTo(x3 * cos7 + sin41 * y3, y3 * cos41 - sin7 * x3 - h1);
//     ctx.lineTo(x4 * cos7 + sin41 * y4, y4 * cos41 - sin7 * x4 - h1);
//     ctx.lineTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h1);
//     ctx.stroke();
//     color && ctx.fill();
//     ctx.closePath();
//     ctx.restore();
// }
//
// export function drawKarkasLeft({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, colorBottomLine, bottomLineHeight, colorLine, lineHeight, w, h}) {
//     let karkasDepth1 = karkasDepth * defScaleValue / scale;
//     draw3dLeft({
//         name,
//         x1: x1 + karkasDepth1,
//         x2,
//         x3,
//         x4: x4 + karkasDepth1,
//         y1: y1 + karkasDepth1 * 0.7,
//         y2,
//         y3,
//         y4: y4 - karkasDepth1,
//         h1,
//         h2,
//         color: 'rgb(205,128,0)',
//         w,
//         h
//     }, undefined, 'rgb(205,128,0)');
//     ctx.save();
//     ctx.beginPath();
//     let x = x1 * cos7 + sin41 * y1;
//     let y = y1 * cos41 - sin7 * x1 - h2;
//     ctx.setTransform(1, 0.875, 0, 1, 0, -x * 87.5 / 100);
//
//     ctx.drawImage(fon, 0, 0, imageCoeffWidth * h, imageTextureHeight, x, y, h * 0.565 / scale, karkasHeight / scale);
//     ctx.closePath();
//     ctx.restore();
//     draw3dLeft({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, w, h});
//
//     draw3dLeft({
//         name, x1, x2,
//         x3, x4, y1, y2, y3, y4: y1 + lineHeight * y3dcefficient / scale, h1, h2, color, w, h
//     }, colorLine, colorLine);
//
//     draw3dLeft({
//         name, x1, x2,
//         x3, x4, y1: y4 - lineHeight * y3dcefficient / scale, y2, y3, y4, h1, h2, color, w, h
//     }, colorLine, colorLine);
//
//     colorBottomLine && bottomLineHeight && !isNaN(bottomLineHeight) && draw3dLeft({
//         name,
//         x1,
//         x2,
//         x3,
//         x4,
//         y1,
//         y2,
//         y3,
//         y4,
//         h1,
//         h2: h1 - bottomLineHeight / scale,
//         color: colorBottomLine,
//         w,
//         h
//     }, colorBottomLine, colorBottomLine)
// }
//
// export function drawKarkasFront({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, colorBottomLine, bottomLineHeight, colorLine, lineHeight, w, h}) {
//     let karkasDepth1 = karkasDepth * defScaleValue / scale;
//     draw3dFront({
//         name,
//         x1,
//         x2,
//         x3: x3 - karkasDepth1 * 0.5,
//         x4: x4 + karkasDepth1,
//         y1,
//         y2,
//         y3: y3 - karkasDepth1,
//         y4: y4 - karkasDepth1,
//         h1,
//         h2,
//         color: 'rgb(205,128,0)',
//         w,
//         h
//     }, 'rgba(0,0,0,0)');
//     let x = x4 * cos7 + sin41 * y4;
//     let y = y4 * cos41 - sin7 * x4 - h2;
//
//     ctx.save();
//     ctx.beginPath();
//     ctx.setTransform(1, -0.1217, 0, 1, 0, x * 12.17 / 100);
//     ctx.drawImage(fon, 0, 0, imageCoeffWidth * w, imageTextureHeight, x, y, w / scale - 4 * defScaleValue / scale, karkasHeight / scale);
//     ctx.closePath();
//     ctx.restore();
//
//
//     draw3dFront({
//         name, x1, x2,
//         x3: x4 + lineHeight / scale, x4, y1, y2, y3, y4, h1, h2, color: colorLine, w, h
//     }, colorLine);
//
//     draw3dFront({
//         name, x1, x2,
//         x3, x4: x3 - lineHeight / scale, y1, y2, y3, y4, h1, h2, color: colorLine, w, h
//     }, colorLine);
//     draw3dFront({name, x1, x2, x3, x4, y1, y2, y3, y4, h1, h2, color, w, h});
//     colorBottomLine && bottomLineHeight && !isNaN(bottomLineHeight) && draw3dFront({
//         name,
//         x1,
//         x2,
//         x3,
//         x4,
//         y1,
//         y2,
//         y3,
//         y4,
//         h1,
//         h2: h1 - bottomLineHeight / scale,
//         color: colorBottomLine,
//         w,
//         h
//     }, colorBottomLine, colorBottomLine)
// }
//


export function draw3dLeft(canvasData, {name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal}, fill, strokeStyle) {
    let {ctx, scale, cos7, sin41, cos41, sin7} = canvasData;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle || 'rgb(0,0,0)';
    ctx.fillStyle = color;
    if (fill) {
        ctx.fillStyle = fill;
    }
    ctx.moveTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h1);
    ctx.lineTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h2);
    ctx.lineTo(x4 * cos7 + sin41 * y4, y4 * cos41 - sin7 * x4 - h2);
    ctx.lineTo(x4 * cos7 + sin41 * y4, y4 * cos41 - sin7 * x4 - h1);
    ctx.lineTo(x1 * cos7 + sin41 * y1, y1 * cos41 - sin7 * x1 - h1);
    ctx.stroke();

    color && ctx.fill();

    ctx.closePath();
    ctx.restore();
}

//
// export function draw3dRectangle({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal}) {
//     //правая плоскость
//     if (name !== 'InnerDoor') {
//         draw3dRigth({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal})
//     }
//     // нижняя плоскость
//     draw3dFloor({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal});
//     //передняя плоскость
//     if (name !== 'InnerDoor' || gorizontal) {
//         draw3dFront({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal},
//             name === 'InnerDoor' ? color : undefined)
//     }
//     //левая плоскость
//     if (name !== 'InnerDoor' || !gorizontal) {
//         draw3dLeft({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal})
//     }
//     if (name !== 'InnerDoor') {
//         draw3dRoof({name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal})
//     }
// }
//
//
// export function drawLeftImage({name, x1, x2, x3, x4, y1, y2, y3, y4, hh, h1, h2, h, w, color, image, gorizontal}) {
//
//     let img = imageMap.get(image);
//     ctx.save();
//     ctx.beginPath();
//     let x = x1 * cos7 + sin41 * y1;
//     let y = y1 * cos41 - sin7 * x1 - h2;
//     ctx.setTransform(1, 0.875, 0, 1, 0, -x * 87.5 / 100);
//     img && ctx.drawImage(img, x, y, h * y3dcefficient * 0.77 / scale, hh / scale);
//     ctx.closePath();
//     ctx.restore();
// }
//
//
export function draw3dFront(canvasData, {name, x, y, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal}, strokeStyle) {
    let {ctx, scale, cos7, sin41, cos41, sin7} = canvasData;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle || 'rgb(0,0,0)';
    ctx.fillStyle = color;
    ctx.moveTo(x4 * cos7 + sin41 * y4, y4 * cos41 - sin7 * x4 - h1);
    ctx.lineTo(x4 * cos7 + sin41 * y4, y4 * cos41 - sin7 * x4 - h2);
    ctx.lineTo(x3 * cos7 + sin41 * y3, y3 * cos41 - sin7 * x3 - h2);
    ctx.lineTo(x3 * cos7 + sin41 * y3, y3 * cos41 - sin7 * x3 - h1);
    ctx.lineTo(x4 * cos7 + sin41 * y4, y4 * cos41 - sin7 * x4 - h1);
    ctx.stroke();
    color && ctx.fill();
    ctx.closePath();
    ctx.restore();
}
//
// ctx.save();
// ctx.beginPath();
// let x = x1 * cos7 + sin41 * y1;
// let y = y1 * cos41 - sin7 * x1 - h2;
// ctx.setTransform(scale, 0.875 * scale, 0, scale, -200, 400-x * 87.5 * scale / 100);
// ctx.drawImage(getImageFromMap(wall.image3D), 0, 0,
//     imageCoeffWidth * h, imageTextureHeight, x, y, h * 0.565 , 2500 );
// ctx.closePath();
// ctx.restore();

export function drawWall(shapeData, canvasData) {
    let {ctx, scale, cos7, sin41, cos41, sin7} = canvasData;
    let {x1, x4, x2, y2, y1, y4, w, h, h2, color, gorizontal, image, front} = shapeData;
    let x, y, skewing, dw, sw, transformCoeffA, transformCoeffB;
    if (gorizontal) {
        if (!front) {
            x = x1 * cos7 + sin41 * y1;
            y = y1 * cos41 - sin7 * x1 - h2;
        } else {
            x = x4 * cos7 + sin41 * y4;
            y = y4 * cos41 - sin7 * x4 - h2;
        }
        skewing = 0.125 * scale;
        dw = w*0.995;
        sw = imageCoeffWidth * w;
        transformCoeffA = -skewing;
        transformCoeffB = skewing;
    } else {
        if (!front) {
            x = x1 * cos7 + sin41 * y1;
            y = y1 * cos41 - sin7 * x1 - h2;
        } else {
            x = x2 * cos7 + sin41 * y2;
            y = y2 * cos41 - sin7 * x2 - h2;
        }
        skewing = +0.875 * scale;
        dw = h * 0.565;
        sw = imageCoeffWidth * h;
        transformCoeffA = skewing;
        transformCoeffB = -skewing;
    }
    ctx.save();
    ctx.beginPath();
    ctx.setTransform(scale, transformCoeffA, 0, scale, -200, x * transformCoeffB + 400);
    ctx.drawImage(getImageFromMap(image), 0, 0, sw, imageTextureHeight, x, y, dw, 2500);
    ctx.closePath();
    ctx.restore();

}

export function drawWall2(shapeData, canvasData) {
    let {ctx, scale, cos7, sin41, cos41, sin7} = canvasData;
    let {x, y, w, h, h2, color, gorizontal, image} = shapeData;
    let xd, yd, skewing, dw, sw, transformCoeffA, transformCoeffB;
    xd = x * cos7 + sin41 * y;
    yd = y * cos41 - sin7 * x - h2;
    if (gorizontal) {
        console.info(xd, yd, x, y)
        skewing = 0.125 * scale;
        dw = w;
        sw = imageCoeffWidth * w;
        transformCoeffA = -skewing;
        transformCoeffB = skewing;
    } else {
        skewing = +0.875 * scale;
        dw = h * 0.565;
        sw = imageCoeffWidth * h;
        transformCoeffA = skewing;
        transformCoeffB = -skewing;
    }
    ctx.save();
    ctx.beginPath();
    ctx.setTransform(scale, transformCoeffA, 0, scale, -200, x * transformCoeffB + 400);
    ctx.drawImage(getImageFromMap(image), 0, 0, sw, imageTextureHeight, xd, yd, dw, 2500);
    ctx.closePath();
    ctx.restore();

}