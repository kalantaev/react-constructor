import {createRelatedShape, getYRelatedShape} from "./RelatedShape";
import {colorBlack} from "../constants";
import {getScaleValue, serialize} from "../functions";
import {drawMirror, drawWhiteRectangle} from "../drawFunction";

export function createMirrorBtn(shape, shiftX = 65, shiftY = -30) {
    let btn = createRelatedShape(shape, shiftX, shiftY);
    btn.color = colorBlack;
    btn.name = 'MirrorButton';
    btn.hint = "Левая/правая";
    btn.getLength = () => getScaleValue(15);
    btn.getWidth = () => getScaleValue(15);
    btn.getY = () => getYRelatedShape(btn);
    btn.draw = (ctx) => {
        drawWhiteRectangle(ctx, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
        ctx.beginPath();
        drawMirror(ctx, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
        ctx.strokeStyle = btn.color;
        ctx.stroke();
        ctx.closePath();
    };
    btn.onClick = (drawAll) => {
        let parent = btn.getParent();
        parent && parent.mirroring && parent.mirroring();
        serialize();
        drawAll();
    };
}
