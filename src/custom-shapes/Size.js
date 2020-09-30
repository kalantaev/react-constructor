import {colorBlack} from "../constants";
import {POSITION} from "../enums";
import {drawBottomArrow, drawLeftArrow, drawRightArrow, drawTopArrow} from "../drawFunction";
import {getArrowWidth, getScale} from "../canvas/Canvas";

export function createSize(l1, l2, l3, position) {
    let size = {
        line1: l1,
        line2: l2,
        arrowLine: l3,
        position: position
    };
    size.draw =(ctx) => {
        size.line1.draw(ctx);
        size.line2.draw(ctx);
        size.arrowLine.draw(ctx);

        let arrowSizes = getArrowWidth();
        //стрелки
        ctx.beginPath();
        ctx.strokeStyle = colorBlack;
        if (size.position === POSITION.TOP || size.position === POSITION.BOTTOM) {
            drawLeftArrow(ctx, size.arrowLine.startX, size.arrowLine.startY, arrowSizes.arrowLength, arrowSizes.arrowWidth);
            drawRightArrow(ctx, size.arrowLine.endX, size.arrowLine.endY, arrowSizes.arrowLength, arrowSizes.arrowWidth);
        } else {
            drawTopArrow(ctx, size.arrowLine.startX, size.arrowLine.startY, arrowSizes.arrowWidth, arrowSizes.arrowLength);
            drawBottomArrow(ctx, size.arrowLine.endX, size.arrowLine.endY, arrowSizes.arrowWidth, arrowSizes.arrowLength);
        }
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
    return size;
}