import {colorBlack, colorWhite, defPartitionWidth, defScaleValue} from "./constants";
import {DIRECTION, OPENING_TYPE, POSITION} from "./enums";
import {getKarkasDepth} from "./variable";
import {getScaleValue} from "./functions";
import {getScale} from "./canvas/Canvas";

export function drawKarkas2D(ctx, karkasDepth, x, y, length, width, color) {

    let karkasDepth1 = karkasDepth * defScaleValue / getScale();
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, length, width);
    ctx.rect(x + karkasDepth1, y + karkasDepth1, length - karkasDepth1 * 2, width - karkasDepth1 * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    //верхняя пунктирная
    ctx.moveTo(x - 35, y + karkasDepth1 / 2);
    ctx.lineTo(x + (length) + 35, y + karkasDepth1 / 2);
    //нижняя пунктирная
    ctx.moveTo(x - 35, y + width - karkasDepth1 + karkasDepth1 / 2);
    ctx.lineTo(x + (length) + 35, y + width - karkasDepth1 + karkasDepth1 / 2);
    //левая пунктирная
    ctx.moveTo(x + karkasDepth1 / 2, y - 35);
    ctx.lineTo(x + karkasDepth1 / 2, y + width + 35);
    //правая пунктирная
    ctx.moveTo(x + length - karkasDepth1 + karkasDepth1 / 2, y - 35);
    ctx.lineTo(x + length - karkasDepth1 + karkasDepth1 / 2, y + width + 35);
    // ctx.lineWidth = 0.9;
    ctx.setLineDash([45, 25]);
    ctx.strokeStyle = "rgba(255,120,0,0.8)";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    // let bottomShape = shapes.filter(i => i.parentId === karkas.getId() && i.position === POSITION.BOTTOM).sort((a, b) => {
    //     return a.getX() - b.getX()
    // });
    // if (bottomShape.length > 0) {
    //     let colorA = "rgba(0,0,0,0.25)";
    //     for (let i = 0; i < bottomShape.length; i++) {
    //         if (i === 0) {
    //             drawArrowShape(karkas.getX(), karkas.getY() + karkas.getWidth() / scale - karkasDepth1, bottomShape[i].getX(), bottomShape[i].getY() - karkasDepth1, POSITION.BOTTOM,
    //                 getArrowShift({}, POSITION.BOTTOM), colorA);
    //         } else {
    //             if (bottomShape[i].getX() > (bottomShape[i - 1].getX() + bottomShape[i - 1].getLength() / scale))
    //                 drawArrowShape(bottomShape[i - 1].getX() + bottomShape[i - 1].getLength() / scale, bottomShape[i - 1].getY(), bottomShape[i].getX(), bottomShape[i].getY(), POSITION.BOTTOM,
    //                     getArrowShift({}, POSITION.BOTTOM), colorA);
    //         }
    //         if (i === bottomShape.length - 1) {
    //             drawArrowShape(bottomShape[i].getX() + bottomShape[i].getLength() / scale, bottomShape[i].getY(),
    //                 karkas.getX() + karkas.getLength() / scale, karkas.getY() + karkas.getWidth() / scale - karkasDepth1, POSITION.BOTTOM,
    //                 getArrowShift({}, POSITION.BOTTOM), colorA);
    //         }
    //     }
    //
    // }
    // let topShape = shapes.filter(i => i.parentId === karkas.getId() && i.position === POSITION.TOP).sort((a, b) => {
    //     return a.getX() - b.getX()
    // });
    // if (topShape.length > 0) {
    //     let colorA = "rgba(0,0,0,0.25)";
    //     for (let i = 0; i < topShape.length; i++) {
    //         if (i === 0) {
    //             drawArrowShape(karkas.getX(), karkas.getY(), topShape[i].getX(), topShape[i].getY() - karkasDepth1, POSITION.TOP,
    //                 getArrowShift({}, POSITION.TOP), colorA);
    //         } else {
    //             if (topShape[i].getX() > (topShape[i - 1].getX() + topShape[i - 1].getLength() / scale))
    //                 drawArrowShape(topShape[i - 1].getX() + topShape[i - 1].getLength() / scale, topShape[i - 1].getY(), topShape[i].getX(), topShape[i].getY(), POSITION.TOP,
    //                     getArrowShift({}, POSITION.TOP), colorA);
    //         }
    //         if (i === topShape.length - 1) {
    //             drawArrowShape(topShape[i].getX() + topShape[i].getLength() / scale, topShape[i].getY(),
    //                 karkas.getX() + karkas.getLength() / scale, karkas.getY() - karkasDepth1, POSITION.TOP,
    //                 getArrowShift({}, POSITION.TOP), colorA);
    //         }
    //     }
    //
    // }
    // let leftShape = shapes.filter(i => i.parentId === karkas.getId() && i.position === POSITION.LEFT).sort((a, b) => {
    //     return a.getY() - b.getY()
    // });
    // if (leftShape.length > 0) {
    //     let colorA = "rgba(0,0,0,0.25)";
    //     for (let i = 0; i < leftShape.length; i++) {
    //         if (i === 0) {
    //             drawArrowShape(karkas.getX(), karkas.getY(), leftShape[i].getX(), leftShape[i].getY(), POSITION.LEFT,
    //                 getArrowShift({}, POSITION.LEFT), colorA);
    //         } else {
    //             if (leftShape[i].getY() > (leftShape[i - 1].getY() + leftShape[i - 1].getWidth() / scale))
    //                 drawArrowShape(leftShape[i - 1].getX(), leftShape[i - 1].getY() + leftShape[i - 1].getWidth() / scale, leftShape[i].getX(), leftShape[i].getY(), POSITION.LEFT,
    //                     getArrowShift({}, POSITION.LEFT), colorA);
    //         }
    //         if (i === leftShape.length - 1) {
    //             drawArrowShape(leftShape[i].getX(), leftShape[i].getY() + leftShape[i].getWidth() / scale,
    //                 karkas.getX(), karkas.getY() + karkas.getWidth() / scale, POSITION.LEFT,
    //                 getArrowShift({}, POSITION.LEFT), colorA);
    //         }
    //     }
    //
    // }
    // let rightShape = shapes.filter(i => i.parentId === karkas.getId() && i.position === POSITION.RIGHT).sort((a, b) => {
    //     return a.getY() - b.getY()
    // });
    // ;
    // if (rightShape.length > 0) {
    //     let colorA = "rgba(0,0,0,0.25)";
    //     for (let i = 0; i < rightShape.length; i++) {
    //         if (i === 0) {
    //             drawArrowShape(karkas.getX() + karkas.getLength() / scale - karkasDepth1, karkas.getY(), rightShape[i].getX(), rightShape[i].getY(), POSITION.RIGHT,
    //                 getArrowShift({}, POSITION.RIGHT), colorA);
    //         } else {
    //             if (rightShape[i].getY() > (rightShape[i - 1].getY() + rightShape[i - 1].getWidth() / scale))
    //                 drawArrowShape(rightShape[i - 1].getX() + rightShape[i - 1].getLength() / scale, rightShape[i - 1].getY() + rightShape[i - 1].getWidth() / scale, rightShape[i].getX(), rightShape[i].getY(), POSITION.RIGHT,
    //                     getArrowShift({}, POSITION.RIGHT), colorA);
    //         }
    //         if (i === rightShape.length - 1) {
    //             drawArrowShape(rightShape[i].getX(), rightShape[i].getY() + rightShape[i].getWidth() / scale,
    //                 karkas.getX() + karkas.getLength() / scale, karkas.getY() + karkas.getWidth() / scale, POSITION.RIGHT,
    //                 getArrowShift({}, POSITION.RIGHT), colorA);
    //         }
    //     }
    //
    // }

}



export function shapeDraw(shape, ctx) {
    shape && shape.draw && shape.draw(ctx)
}

// given mouse X & Y (mx & my) and shape object
// return true/false whether mouse is inside the shape
export function isMouseInShape(mx, my, shape) {

    var rLeft = shape.getX() - 5;
    var rRight = shape.getX() + shape.getLength() / getScale() + 10;
    var rTop = shape.getY() - 5;
    var rBott = shape.getY() + shape.getWidth() / getScale() + 10;

    // var rLeft = shape.getX() ;
    // var rRight = shape.getX() + shape.getLength() / scale;
    // var rTop = shape.getY() ;
    // var rBott = shape.getY() + shape.getWidth() / scale;
    // math test to see if mouse is inside rectangle
    if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
        return (true);
    }

    // the mouse isn't in any of the shapes
    return (false);
}

export function needHideControlButton(mx, my, shape) {
    if (shape.getLength()) {
        var rLeft = shape.getX() - 50;
        var rRight = shape.getX() + shape.getLength() / getScale() + 50;
        var rTop = shape.getY() - 50;
        var rBott = shape.getY() + shape.getWidth() / getScale() + 50;
        // math test to see if mouse is inside rectangle
        if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
            return false;
        }
    }
    // the mouse isn't in any of the shapes
    return true;
}

export function drawHint(ctx, x, y, text = 'Подсказка') {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y - 180, 100 + text.length * 33, 100);
    ctx.strokeStyle = "rgba(0,0,0,0.41)";
    ctx.fillStyle = colorWhite;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.86)";
    ctx.font = "italic 45pt Arial";
    ctx.fillText(text, x + 15, y - 113);
    ctx.restore();
    ctx.closePath();
}

/**
 * Отрисовка крестика
 * @param ctx
 * @param x
 * @param y
 * @param length
 * @param height
 */
export function drawCross(ctx, x, y, length, height) {
    ctx.moveTo(x + length / 2, y);
    ctx.lineTo(x + length / 2, y + height);
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x + length, y + height / 2);
}

/**
 * Отрисовка стрелки указывающей вверх
 * @param ctx конткст для рисования
 * @param x координата x точки на которую указывает стрелка
 * @param y координата y точки на которую указывает стрелка
 * @param length ширина стрелки
 * @param height высота стрелки
 */
export function drawTopArrow(ctx, x, y, length = 10, height = 20) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + length / 2, y + height);
    ctx.lineTo(x - length / 2, y + height);
    ctx.lineTo(x, y);
}

/**
 * Отрисовка стрелки указывающей вниз
 * @param ctx конткст для рисования
 * @param x координата x точки на которую указывает стрелка
 * @param y координата y точки на которую указывает стрелка
 * @param length ширина стрелки
 * @param height высота стрелки
 */
export function drawBottomArrow(ctx, x, y, length = 10, height = 20) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + length / 2, y - height);
    ctx.lineTo(x - length / 2, y - height);
    ctx.lineTo(x, y);
}

/**
 * Отрисовка стрелки указывающей влево
 * @param ctx конткст для рисования
 * @param x координата x точки на которую указывает стрелка
 * @param y координата y точки на которую указывает стрелка
 * @param length ширина стрелки
 * @param height высота стрелки
 */
export function drawLeftArrow(ctx, x, y, length = 20, height = 10) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y + height / 2);
    ctx.lineTo(x + length, y - height / 2);
    ctx.lineTo(x, y);
}

/**
 * Отрисовка стрелки указывающей вправо
 * @param ctx конткст для рисования
 * @param x координата x точки на которую указывает стрелка
 * @param y координата y точки на которую указывает стрелка
 * @param length ширина стрелки
 * @param height высота стрелки
 */
export function drawRightArrow(ctx, x, y, length = 20, height = 10) {
    ctx.moveTo(x, y);
    ctx.lineTo(x - length, y + height / 2);
    ctx.lineTo(x - length, y - height / 2);
    ctx.lineTo(x, y);
}

export function drawAddDoor(ctx, x, y, length, width) {

    ctx.moveTo(x, y);
    ctx.lineTo(x, y + width);
    ctx.lineTo(x + length - getScaleValue(3), y + width);
    ctx.lineTo(x + length - getScaleValue(3), y);
    ctx.lineTo(x, y);
    ctx.lineTo(x + length - getScaleValue(4), y - getScaleValue(3));
    ctx.lineTo(x + length - getScaleValue(5), y);
    ctx.moveTo(x + length - getScaleValue(7), y + width / 2);
    ctx.lineTo(x + length - getScaleValue(5), y + width / 2);

}

export function drawWhiteRectangle(ctx, x, y, w, h) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x - 2, y - 2, w + 4, h + 4);
    ctx.strokeStyle = colorWhite;
    ctx.fillStyle = colorWhite;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();

}

export function drawChangeOpen(ctx, x, y, length, width) {
    let scaleValue1 = getScaleValue(1);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + (width / 2) - scaleValue1);
    ctx.lineTo(x + length, y + (width / 2) - scaleValue1);
    ctx.lineTo(x, y);
    ctx.moveTo(x, y + (width / 2) + scaleValue1);
    ctx.lineTo(x + length, y + (width / 2) + scaleValue1);
    ctx.lineTo(x, y + width);
    ctx.lineTo(x, y + (width / 2) + scaleValue1);
}

export function drawMirror(ctx, x, y, length, height) {
    let scaleValue1 = getScaleValue(1);
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + (length / 2) - scaleValue1, y);
    ctx.lineTo(x + (length / 2) - scaleValue1, y + height);
    ctx.lineTo(x, y + height);
    ctx.moveTo(x + length, y + height);
    ctx.lineTo(x + (length / 2) + scaleValue1, y);
    ctx.lineTo(x + (length / 2) + scaleValue1, y + height);
    ctx.lineTo(x + length, y + height);
}


/**
 * Отрисовка горизонтальной двери
 * @param ctx контекст для рисования
 * @param x координата x левой верхней точки
 * @param y координата y левой верхней точки
 * @param length длина
 * @param width ширина
 * @param openingType тип открытия, внутрь, в наружу
 * @param direction левая или правая дверь
 */
export function drawGorizontalDoor(ctx, x, y, length, width, openingType, direction = DIRECTION.RIGHT, isPartition = false) {

    let fonColor = colorWhite;
    let baseColor = colorBlack;
    let borderColor = "rgb(0,0,255)";

    //белая область
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y - 1, length, width + 2);
    ctx.strokeStyle = fonColor;
    ctx.fillStyle = fonColor;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    //дверь
    ctx.beginPath();
    ctx.strokeStyle = colorBlack;
    switch (direction) {
        case "RIGHT":
            switch (openingType) {
                case OPENING_TYPE.OUT:
                    ctx.arc(x + length, y - (isPartition ? 430 : 420) / getScale(), 935 / getScale(), Math.PI * 2.5, Math.PI * 2.828, false);
                    ctx.moveTo(x + length, y);
                    ctx.lineTo(x + length, y + 510 / getScale());
                    break;
                case OPENING_TYPE.IN:
                    ctx.arc(x + length, y + 400 / getScale(), 900 / getScale(), Math.PI * 3.145, Math.PI * 1.5, false);
                    ctx.moveTo(x + length, y);
                    ctx.lineTo(x + length, y - 505 / getScale());
                    break;
            }
            break;
        case "LEFT":
            switch (openingType) {
                case OPENING_TYPE.OUT:
                    ctx.arc(x, y - 400 / getScale(), 905 / getScale(), Math.PI * 2.155, Math.PI * 2.5, false);
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + 505 / getScale());
                    break;
                case OPENING_TYPE.IN:
                    ctx.arc(x, y + 400 / getScale(), 900 / getScale(), Math.PI * 1.5, Math.PI * 1.855, false);
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y - 505 / getScale());
                    break;
            }
            break;
    }
    ctx.strokeStyle = baseColor;
    ctx.stroke();
    ctx.closePath();

    //синие боковушки стены
    let depth = isPartition ? defPartitionWidth / getScale() : getKarkasDepth() * defScaleValue / getScale();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + depth);
    ctx.moveTo(x + length, y);
    ctx.lineTo(x + length, y + depth);
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    ctx.closePath();
    ctx.restore();
}


/**
 * Отрисовка вертикальной двери
 * @param ctx контекст для рисования
 * @param x координата x левой верхней точки
 * @param y координата y левой верхней точки
 * @param length длина
 * @param width ширина
 * @param openingType тип открытия, внутрь, в наружу
 * @param direction левая или правая дверь
 */
export function drawVertikalDoor(ctx, x, y, length, width, openingType, direction = DIRECTION.RIGHT) {

    let fonColor = colorWhite;
    let baseColor = colorBlack;
    let borderColor = "rgb(0,0,255)";

    //белая область
    ctx.save();
    ctx.beginPath();
    ctx.rect(x - 1, y, length + 2, width);
    ctx.strokeStyle = fonColor;
    ctx.fillStyle = fonColor;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    //дверь
    ctx.beginPath();
    ctx.strokeStyle = colorBlack;
    switch (direction) {

        case DIRECTION.RIGHT:
            switch (openingType) {
                case OPENING_TYPE.OUT:
                    ctx.arc(x + length - 400 / getScale(), y, 900 / getScale(), Math.PI * 2.0, Math.PI * 2.355, false);
                    ctx.moveTo(x + length, y);
                    ctx.lineTo(x + length + 505 / getScale(), y);
                    break;
                case OPENING_TYPE.IN:
                    ctx.arc(x + 400 / getScale(), y, 900 / getScale(), Math.PI * 0.65, Math.PI, false);
                    ctx.moveTo(x, y);
                    ctx.lineTo(x - 505 / getScale(), y);
                    break;
            }
            break;
        case DIRECTION.LEFT:
            switch (openingType) {
                case OPENING_TYPE.OUT:
                    ctx.arc(x + length - 400 / getScale(), y + width, 900 / getScale(), Math.PI * 1.645, Math.PI * 2, false);
                    ctx.moveTo(x + length, y + width);
                    ctx.lineTo(x + length + 505 / getScale(), y + width);

                    break;
                case OPENING_TYPE.IN:
                    ctx.arc(x + 400 / getScale(), y + width, 900 / getScale(), Math.PI, Math.PI * 1.355, false);
                    ctx.moveTo(x, y + width);
                    ctx.lineTo(x - 505 / getScale(), y + width);
                    break;
            }
            break;


    }
    ctx.strokeStyle = baseColor;
    ctx.stroke();
    ctx.closePath();

    //синие боковушки стены
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + getKarkasDepth(), y);
    ctx.moveTo(x, y + width);
    ctx.lineTo(x + getKarkasDepth(), y + width);
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    ctx.closePath();
    ctx.restore();
}



export function drawSocketBottom(ctx, x, y, length, height, grounding, one) {

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y + height, length, Math.PI * 3, Math.PI * 2, false);
    if (one) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - height * 0.7);
    } else {
        ctx.moveTo(x - height / 4, y);
        ctx.lineTo(x - height / 4, y - height * 0.7);
        ctx.moveTo(x + height / 4, y);
        ctx.lineTo(x + height / 4, y - height * 0.7);
    }
    if (grounding) {
        ctx.moveTo(x - height, y);
        ctx.lineTo(x + height, y);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.41)";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

export function drawSocketTop(ctx, x, y, length, height, grounding, one) {

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y - height, length, Math.PI * 2, Math.PI * 3, false);
    if (one) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height * 0.7);
    } else {
        ctx.moveTo(x - height / 4, y);
        ctx.lineTo(x - height / 4, y + height * 0.7);
        ctx.moveTo(x + height / 4, y);
        ctx.lineTo(x + height / 4, y + height * 0.7);
    }
    if (grounding) {
        ctx.moveTo(x - height, y);
        ctx.lineTo(x + height, y);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.41)";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

export function drawSocketLeft(ctx, x, y, length, height, grounding, one) {

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, length, Math.PI * 1.5, Math.PI * 2.5, false);
    if (one) {
        ctx.moveTo(x + height, y);
        ctx.lineTo(x + height + height * 0.7, y);
    } else {
        ctx.moveTo(x + height, y - height / 4);
        ctx.lineTo(x + height + height * 0.7, y - height / 4);
        ctx.moveTo(x + height, y + height / 4);
        ctx.lineTo(x + height + height * 0.7, y + height / 4);
    }
    if (grounding) {
        ctx.moveTo(x + height, y - height);
        ctx.lineTo(x + height, y + height);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.41)";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

export function drawSocketRight(ctx, x, y, length, height, grounding, one) {

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, length, Math.PI * 2.5, Math.PI * 1.5, false);
    if (one) {
        ctx.moveTo(x - height, y);
        ctx.lineTo(x - height - height * 0.7, y);
    } else {
        ctx.moveTo(x - height, y - height / 4);
        ctx.lineTo(x - height - height * 0.7, y - height / 4);
        ctx.moveTo(x - height, y + height / 4);
        ctx.lineTo(x - height - height * 0.7, y + height / 4);
    }
    if (grounding) {
        ctx.moveTo(x - height, y - height);
        ctx.lineTo(x - height, y + height);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.41)";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}


export function drawGorizontalWindow(ctx, x, y, length, height) {
    //белый фон для скрытия стенки
    ctx.save();
    drawRect(ctx,x, y - 1, length, length + 2, colorWhite, colorWhite);
    drawRect(ctx, x, y, length, height, "rgba(0,0,0,0.41)");

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.moveTo(x + length, y);
    ctx.lineTo(x + length, y + height);
    ctx.strokeStyle = "rgb(0,0,255)";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

export function drawVertikalWindow(ctx, x, y, length, width) {
    //белый фон для скрытия стенки
    ctx.save();
    drawRect(ctx,x - 1, y, width + 2, length, colorWhite, colorWhite);
    drawRect(ctx,x, y, width, length, "rgba(0,0,0,0.41)");

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.moveTo(x, y + length);
    ctx.lineTo(x + width, y + length);
    ctx.strokeStyle = "rgb(0,0,255)";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

export function drawRect(ctx, x, y, length, height, color, fillStyle) {
    ctx.beginPath();
    ctx.rect(x, y, length, height);
    ctx.strokeStyle = color;
    ctx.stroke();
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    ctx.closePath();
}

export function saveAndBeginPath(ctx) {
    ctx.save();
    ctx.beginPath();
}
export function closeAndRestore(ctx) {
    ctx.closePath();
    ctx.restore();
}