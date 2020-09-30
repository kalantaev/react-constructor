import {createRelatedShape} from "./RelatedShape";
import {baseColor} from "../constants";
import {getScaleValue, serialize} from "../functions";

var pencil = new Image();
pencil.src = "calculator_files/edit.png";

export function createEditBtn(shape, shiftX = 65, shiftY = -30) {
    let btn = createRelatedShape(shape, shiftX, shiftY);
    btn.name = 'EditButton';
    btn.hint = "Редактировать элемент";
    btn.hint = `Изменить ${shape.nameRu !== undefined ? shape.nameRu : 'элемент'}`;
    btn.color = baseColor;
    btn.getLength = () => getScaleValue(18);
    btn.getWidth = () => getScaleValue(18);
    btn.draw = (ctx) => {
        // ctx.drawImage(pencil, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
    };
    btn.onClick = ({drawAll}) => {
        let parent = btn.getParent();
        parent && parent.edit && parent.edit();
        serialize();
        drawAll();
    }
}
