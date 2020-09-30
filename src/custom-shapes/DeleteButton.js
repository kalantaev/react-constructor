import {createRelatedShape} from "./RelatedShape";
import {colorRed} from "../constants";
import {getScaleValue, serialize} from "../functions";
import {drawWhiteRectangle} from "../drawFunction";

export function createDltSizeElement(shape) {
   createDeleteBtn(shape, 20, -20);
}

export function createDeleteBtn(shape, shiftX = 65, shiftY = -30) {
    let btn = createRelatedShape(shape, shiftX, shiftY);
    btn.hint = `Удалить ${shape.nameRu !== undefined ? shape.nameRu : 'элемент'}`;
    btn.color = colorRed;
    btn.name = 'DeleteButton';
    btn.hint = "Удалить элемент";
    shape.name === 'Arrow'&& (btn.hint = 'Скрыть размер');
    btn.getLength = () => getScaleValue(14);
    btn.getWidth = () => getScaleValue(14);
    btn.draw = (ctx) => {
        drawWhiteRectangle(ctx, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
        ctx.beginPath();
        ctx.moveTo(btn.getX(), btn.getY());
        ctx.lineTo(btn.getX() + btn.getLength(), btn.getY() + btn.getWidth());
        ctx.moveTo(btn.getX() + btn.getLength(), btn.getY());
        ctx.lineTo(btn.getX(), btn.getY() + btn.getWidth());
        ctx.strokeStyle = btn.color;
        ctx.stroke();
        ctx.closePath();
    };
    btn.onClick = ({drawAll}) => {
        btn.deleted = true;
        let parent = btn.getParent();
        parent && parent.setDeleted && parent.setDeleted();
        if (parent.name === 'Arrow') {
            parent.getParent().arrowsId = [];
        }
        serialize();
        drawAll();
    };
}