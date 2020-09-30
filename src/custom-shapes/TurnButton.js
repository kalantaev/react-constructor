import {createRelatedShape} from "./RelatedShape";
import {getScaleValue} from "../functions";

export function createTurnBtn(parent, shiftX = 30, shiftY = -34) {
    let turnBtn = createRelatedShape(parent, shiftX, shiftY);
    turnBtn.name = 'TurnButton';
    turnBtn.hint = "Повернуть на 90 градусов";
    turnBtn.getLength = () => getScaleValue(20);
    turnBtn.getWidth = () => getScaleValue(20);
    turnBtn.draw = (ctx) => {
        let value10 = getScaleValue(8);
        let value3 = getScaleValue(2);
        let value7 = getScaleValue(7);
        let value5 = getScaleValue(5);
        let value1 = getScaleValue(1);

        let centerX = turnBtn.getX() + turnBtn.getLength() / 2;
        let centerY = turnBtn.getY() + turnBtn.getWidth() / 2;

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(5,223,82)';
        ctx.arc(centerX, centerY, value10, 1, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(centerX + value10, centerY - value1);
        ctx.lineTo(centerX + value3, centerY - value5);
        ctx.moveTo(centerX + value10, centerY - value1);
        ctx.lineTo(centerX + value7, centerY - value10);
        ctx.lineTo(centerX + value3, centerY - value5);
        ctx.strokeStyle = 'rgb(5,223,82)';
        ctx.fillStyle = 'rgb(5,223,82)';
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    };
    turnBtn.onClick = ({drawAll}) => {
        let parent = turnBtn.getParent();
        parent && parent.turn && parent.turn();
        drawAll();
    };
}