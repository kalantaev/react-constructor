import {createRelatedShape} from "./RelatedShape";
import {drawAddDoor} from "../drawFunction";
import {colorBlack} from "../constants";
import {getScaleValue} from "../functions";

export function createAddInnerDoorBtn(shape, shiftX = 65, shiftY = -30) {
    let btn = createRelatedShape(shape, shiftX, shiftY);
    btn.name = 'AddInnerDoorButton';
    btn.hint = "Добавить дверь";
    btn.color = colorBlack;
    btn.getLength = () => getScaleValue(60);
    btn.getWidth = () => getScaleValue(80);
    btn.draw = (ctx) => {
        ctx.beginPath();
        drawAddDoor(ctx, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
        ctx.strokeStyle = btn.color;
        ctx.stroke();
        ctx.closePath();
    };
    btn.onClick = () => {
        let parent = btn.getParent();
        if (parent) {
            // selectDoor(document.getElementById(rootDivId), false, true, parent.getId());//todo
        }
    };
}