import {colorBlack} from "../constants";
import {getScaleValue, serialize} from "../functions";
import {drawChangeOpen, drawWhiteRectangle} from "../drawFunction";
import {createRelatedShape, getYRelatedShape} from "./RelatedShape";

export function createChangeOpenTypeBtn(shape, shiftX = 65, shiftY = -30) {
    let btn = createRelatedShape(shape, shiftX, shiftY);
    btn.color = colorBlack;
    btn.name = 'ChangeOpenTypeButton';
    btn.hint = "Наружняя/внутренняя";
    btn.getLength = () => getScaleValue(15);
    btn.getWidth = () => getScaleValue(15);
    btn.getY =() => getYRelatedShape(btn);
    btn.draw = (ctx) => {
        drawWhiteRectangle(ctx, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
        ctx.beginPath();
        drawChangeOpen(ctx, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
        ctx.strokeStyle = btn.color;
        ctx.stroke();
        ctx.closePath();
    };
    btn.onClick = (drawAll) => {
        let parent = btn.getParent();
        parent && parent.changeOpen && parent.changeOpen();
        serialize();
        drawAll();
    };
}