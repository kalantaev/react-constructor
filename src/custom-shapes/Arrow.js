import {createShape} from "../canvas/Shape";
import {POSITION} from "../enums";
import {colorGrey} from "../constants";
import {
    _getTextPositionY2, createArrowLine,
    createFirstLine,
    createSecondLine,
    getArrowShift,
    getScaleValue,
    prepareSizeText
} from "../functions";
import {createDltSizeElement} from "./DeleteButton";
import {createChangeSizeBtn} from "./ChangeSizeElement";
import {createSize} from "./Size";
import {getArrowWidth, getScale} from "../canvas/Canvas";

export function createArrow(parent, type, color, text) {
    let arrow;
    if(parent) {
        arrow = createShape(parent.getX(), parent.getY() + (type === POSITION.TOP ? (-50) : (+50)),
            (type === POSITION.TOP || type === POSITION.BOTTOM) ? parent.getLength() : parent.width,
            undefined, colorGrey, text, true);
        arrow.parentId = parent.getId();
        arrow.type = type;
        parent.arrowsId.push(arrow.getId());
    } else {
        arrow = createShape()
    }
    arrow.name = 'Arrow';
    arrow.shiftX = 0;
    arrow.shiftY = 0;
    arrow.draw = function (ctx) {
        let parent = arrow.getParent();
        let arrowType = arrow.type;
        let text = arrow.text;
        if (parent) {
            let arrowShift = getArrowShift(parent, arrowType);

            let x = parent.getX();
            let y = parent.getY();
            let x2 = parent.getX() + parent.getLength();
            let y2 = parent.getY() + parent.getWidth();

            this.drawArrowShape2(ctx, x, y, x2, y2, arrowType, arrowShift,
                colorGrey, text);

            if (!arrow.fixed && arrow.relatedShapes.length === 0) {
                createChangeSizeBtn(arrow, true);
                createChangeSizeBtn(arrow, false);
                parent.name === 'Partition' && createDltSizeElement(arrow);
            }

        }
    };
    arrow.drawArrowShape2 = (ctx, x, y, x2, y2, arrowType, arrowShift, color, initText) => {
        let arrow45 = getScaleValue(arrowShift[2]);
        let arrow55 = getScaleValue(arrowShift[3]);
        let size = arrow.getSize();
        size && size.draw(ctx);
        let arrowLine = size.arrowLine;
        //текст
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = "#000000";
        // ctx.font = item.size + "pt";
        ctx.font = "italic " + getArrowWidth().arrowFont + "pt Arial";
        let text = prepareSizeText(initText, arrowLine);
        let textX = (arrowType === POSITION.TOP || arrowType === POSITION.BOTTOM) ?
            (arrowLine.startX + ((arrowLine.endX - arrowLine.startX) / 2) - text.length * 15 / getScale()) :
            arrowType === POSITION.LEFT ? arrowLine.startX - arrow55 : arrowLine.startX + arrow45;
        let textY = _getTextPositionY2(arrowType, arrowLine.startY);
        if (arrowType === POSITION.RIGHT) {
            ctx.translate(textX, textY);
            ctx.rotate(270 * Math.PI / 180);
            ctx.fillText(text, (arrowLine.startY - arrowLine.endY) / 2 - text.length * 30 / getScale(), - getScaleValue(50));
        } else if (arrowType === POSITION.LEFT) {
            ctx.translate(textX, textY);
            ctx.rotate(270 * Math.PI / 180);
            ctx.fillText(text, (arrowLine.startY - arrowLine.endY) / 2 - text.length * 30 / getScale(), + getScaleValue(50));
        } else {
            ctx.fillText(text, textX, textY);
        }

        ctx.restore();
        ctx.closePath();
    };
    arrow.getSize = () => {
        let parent = arrow.getParent();
        let arrowType = arrow.type;
        if (parent) {
            let arrowWidth = 500 / getScale() > 100 ? 100 : 500 / getScale();
            let arrowShift = getArrowShift(parent, arrowType);

            let arrow60 = getScaleValue(arrowShift[0]);
            let arrow50 = getScaleValue(arrowShift[1]);

            let x = parent.getX();
            let y = parent.getY();
            let x2 = parent.getX() + parent.getLength() ;
            let y2 = parent.getY() + parent.getWidth() ;

            // линии отходящие от фигуры
            let firstLine = createFirstLine(x, y, arrowType, arrow60, arrow.shiftX, arrow.shiftY);
            let secondLine = createSecondLine(x, y, x2, y2, arrowType, arrow60, arrow.shiftX, arrow.shiftY);
            let arrowLine = createArrowLine(firstLine, secondLine);

            return createSize(firstLine, secondLine, arrowLine, arrowType);
        }
    };
    arrow.getX = () => {
        let arrowWidth = 50 / getScale() > 10 ? 10 : 50 / getScale();
        return  arrow.type === POSITION.LEFT || arrow.type === POSITION.RIGHT ? arrow.getSize().arrowLine.startX - arrowWidth/2 : arrow.getSize().arrowLine.startX;
    };
    arrow.getY = () => {
        let arrowWidth = 50 / getScale() > 10 ? 10 : 50 / getScale();
        return arrow.type === POSITION.TOP ? arrow.getSize().arrowLine.startY - arrowWidth/2 :
            arrow.type === POSITION.BOTTOM ? arrow.getSize().arrowLine.startY - arrowWidth/2 :
                arrow.getSize().arrowLine.startY;
    };
    arrow.getWidth = () => {
        let arrowWidth = 500 / getScale() > 10 ? 45 : 500 / getScale();
        return arrow.type === POSITION.TOP || arrow.type === POSITION.BOTTOM ? arrowWidth : arrow.getSize().arrowLine.getLength();
    };
    arrow.getLength = () => {
        let arrowWidth = 500 / getScale() > 10 ? 40 : 500 / getScale();
        return arrow.type === POSITION.TOP || arrow.type === POSITION.BOTTOM ? arrow.getSize().arrowLine.getLength() : arrowWidth;
    };
    arrow.resize = (x, y) => {
        arrow.shiftX +=x;
        arrow.shiftY +=y;
    };

    arrow.update =() => {
        let parent = arrow.getParent();
        if (parent) {
            if (parent.name === 'Door') {
                if (parent.position) {
                    switch (parent.position) {
                        case POSITION.LEFT:
                            arrow.position = POSITION.RIGHT;
                            break;
                        case POSITION.TOP:
                            arrow.position = POSITION.BOTTOM;
                            break;
                        case POSITION.RIGHT:
                            arrow.position = POSITION.LEFT;
                            break;
                        case POSITION.BOTTOM:
                            arrow.position = POSITION.TOP;
                            break;
                    }
                }
            }
        }

    };

    return arrow;
}

