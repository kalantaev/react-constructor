import {createRelatedShape} from "./RelatedShape";
import {colorBlack} from "../constants";
import {getScaleValue, serialize} from "../functions";
import {POSITION} from "../enums";
import {createArrow} from "./Arrow";

export function createShowArrowBtn(shape, shiftX, shiftY) {
    let btn = createRelatedShape(shape, shiftX, shiftY);
    btn.name = 'ShowAddArrowButton';
    btn.hint = "Отобразить размер";
    btn.color = colorBlack;
    btn.getLength = () => getScaleValue(17);
    btn.getWidth = () => getScaleValue(16);
    btn.draw = (ctx, scale, selectedShapeId, isDragging) => {
        ctx.beginPath();
        ctx.moveTo(btn.getX(), btn.getY());
        ctx.lineTo(btn.getX(), btn.getY() + btn.getWidth());
        ctx.moveTo(btn.getX(), btn.getY()+getScaleValue(4));
        ctx.lineTo(btn.getX() + btn.getLength(), btn.getY() +getScaleValue(4));
        ctx.moveTo(btn.getX() + btn.getLength(), btn.getY());
        ctx.lineTo(btn.getX()+ btn.getLength(), btn.getY() + btn.getWidth());
        ctx.strokeStyle = colorBlack;
        ctx.stroke();
        ctx.closePath();
    };
    btn.onClick = (drawAll) => {
        let parent = btn.getParent();
        if(parent) {
            createArrow(parent, parent.getLength() > parent.getWidth() ? POSITION.TOP : POSITION.RIGHT, colorBlack);
        }
        // serialize();
        drawAll && drawAll();
    };
    shape.relatedShapes.push(btn.getId());
    return btn.getId()
}
