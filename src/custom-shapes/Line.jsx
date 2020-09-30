import {colorGrey} from "../constants";
import {getLineWidth, getScale} from "../canvas/Canvas";

export function createLine(startX, startY, endX, endY) {
    let line = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
    };
    line.draw = (ctx) => {
        ctx.beginPath();
        ctx.lineWidth = getLineWidth().lineArrow;
        ctx.strokeStyle = colorGrey;
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();
        ctx.closePath();
    };
    line.getLengthString = () => {
        return line.getLength() + " мм";
    };
    line.getLength = () => {
        let leg1 = Math.abs((line.startX - line.endX));
        let leg2 = Math.abs((line.startY - line.endY));
        if (leg1 === 0) {
            return Math.round(leg2 * getScale());
        }
        if (leg2 === 0) {
            return Math.round(leg1 * getScale());
        }
        let hypotenuse = Math.sqrt(leg1 * leg1 + leg2 * leg2);
        return Math.round(hypotenuse * getScale());
    };
    return line;
}
