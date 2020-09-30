import {getScaleValue} from "../functions";
import {colorBlack, colorGrey} from "../constants";
import {drawBottomArrow, drawCross, drawLeftArrow, drawRightArrow, drawTopArrow} from "../drawFunction";
import {getSelectedShapeId} from "../variable";
import {createRelatedShape} from "./RelatedShape";
import {getIsDragging, getScale} from "../canvas/Canvas";

export function createDragElement(shape, shiftX, shiftY) {
    let btn = createRelatedShape(shape, shiftX - getScaleValue(20 / 2), shiftY - getScaleValue(20 / 2));
    btn.color = colorBlack;
    btn.name = "DragElement";
    btn.hint = `Переместить ${shape.nameRu !== undefined ? shape.nameRu : 'элемент'}`;
    btn.getLength = () => 100;
    btn.getWidth = () => 100;
    btn.draw = (ctx, scale) => {
        let parent = btn.getParent();
        if (parent) {
            ctx.save();
            ctx.beginPath();
            //крестик
            drawCross(ctx, btn.getX(), btn.getY(), btn.getLength(), btn.getWidth());
            ctx.strokeStyle = btn.color;
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();

            let arrowSizes = {length: 30, height: 20};

            drawTopArrow(ctx, btn.getX() + btn.getLength() / 2, btn.getY(), arrowSizes.height, arrowSizes.length);
            drawBottomArrow(ctx, btn.getX() + btn.getLength() / 2, btn.getY() + btn.getWidth(), arrowSizes.height, arrowSizes.length);
            drawLeftArrow(ctx, btn.getX(), btn.getY() + btn.getWidth() / 2, arrowSizes.length, arrowSizes.height);
            drawRightArrow(ctx, btn.getX() + btn.getLength(), btn.getY() + btn.getWidth() / 2, arrowSizes.length, arrowSizes.height);
            ctx.strokeStyle = btn.color;
            ctx.fillStyle = btn.color;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            if (getIsDragging() && (getSelectedShapeId() === btn.getId() || getSelectedShapeId() === btn.parentId)) {
                ctx.beginPath();
                if (parent.name === 'Door' || parent.name === 'Window') {
                    // if (parent.position === POSITION.BOTTOM) {
                    //
                    //     let karkasX = parent.getParent().getX();
                    //     let karkasY = parent.getParent().getY();
                    //     let karkasWidth = parent.getParent().getWidth() / scale;
                    //     let karkasLength = parent.getParent().getLength() / scale;
                    //
                    //     let dragElementX = parent.getX();
                    //     let dragElementLength = parent.getLength() / scale;
                    //     ctx.moveTo(karkasX, karkasY + karkasWidth);
                    //     ctx.lineTo(karkasX, karkasY + karkasWidth + (130 * 5 / scale));
                    //     ctx.moveTo(karkasX, karkasY + karkasWidth + 120 * 5 / scale);
                    //     ctx.lineTo(dragElementX, karkasY + karkasWidth + 120 * 5 / scale);
                    //     ctx.moveTo(dragElementX, karkasY + karkasWidth + 130 * 5 / scale);
                    //     ctx.lineTo(dragElementX, karkasY + karkasWidth);
                    //
                    //     ctx.fillStyle = "rgba(0,0,0,0.18)";
                    //     ctx.font = "italic 18pt Arial";
                    //     let text = parseInt((dragElementX - karkasX) * scale) + " мм";
                    //     ctx.fillText(text, karkasX + (dragElementX - karkasX) / 2, karkasY + karkasWidth + 90 * 5 / scale);
                    //
                    //     ctx.moveTo(karkasX + karkasLength, karkasY + karkasWidth);
                    //     ctx.lineTo(karkasX + karkasLength, karkasY + karkasWidth + 130 * 5 / scale);
                    //     ctx.moveTo(karkasX + karkasLength, karkasY + karkasWidth + 120 * 5 / scale);
                    //     ctx.lineTo(dragElementX + dragElementLength, karkasY + karkasWidth + 120 * 5 / scale);
                    //     ctx.moveTo(dragElementX + dragElementLength, karkasY + karkasWidth + 130 * 5 / scale);
                    //     ctx.lineTo(dragElementX + dragElementLength, karkasY + karkasWidth);
                    //
                    //     text = parseInt((karkasX + karkasLength - dragElementX - dragElementLength) * scale) + " мм";
                    //     ctx.fillText(text, dragElementX + dragElementLength + (karkasX + karkasLength - dragElementX - dragElementLength) / 2,
                    //         karkasY + karkasWidth + 90 * 5 / scale);
                    // }
                }
                if (parent.name === 'Light') {

                    let karkasX = parent.getParent().getX();
                    let elX = parent.getX() + parent.getLength() / 2 / getScale();
                    let karkasY = parent.getParent().getY();
                    let elY = parent.getY() + parent.getLength() / 2 / getScale();

                    let karkasWidth = parent.getParent().getWidth() / getScale();
                    let karkasLength = parent.getParent().getLength() / getScale();

                    let dragElementX = parent.getX();
                    let dragElementY = parent.getY();
                    let dragElementLength = parent.getLength() / getScale();
                    let dragElementWidth = parent.getWidth() / getScale();

                    ctx.moveTo(karkasX, elY);
                    ctx.lineTo(dragElementX, elY);
                    ctx.setLineDash([20, 10]);

                    ctx.fillStyle = colorGrey;
                    ctx.font = "italic 18pt Arial";
                    let text = parseInt((dragElementX - karkasX) * getScale()) + " мм";
                    ctx.fillText(text, karkasX + (dragElementX - karkasX) / 2, elY - 50 / getScale());

                    ctx.moveTo(karkasX + karkasLength, elY);
                    ctx.lineTo(dragElementX + dragElementLength, elY);
                    text = parseInt((karkasX + karkasLength - dragElementX - dragElementLength) * scale) + " мм";
                    ctx.fillText(text, dragElementX + dragElementLength + (karkasX + karkasLength - dragElementX - dragElementLength) / 2,
                        elY - 50 / scale);

                    ctx.moveTo(elX, karkasY);
                    ctx.lineTo(elX, karkasY + karkasWidth);

                    text = parseInt((dragElementX - karkasX) * scale) + " мм";
                    ctx.strokeStyle = "rgba(0,0,0,0.18)";
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();

                    ctx.translate(elX, elY);
                    ctx.rotate(270 * Math.PI / 180);
                    text = parseInt((dragElementY - karkasY) * scale) + " мм";
                    ctx.fillText(text, (dragElementY - karkasY) / 2 - text.length * 7 / 2, -20);


                    text = parseInt((karkasY + karkasWidth - dragElementY - dragElementWidth) * scale) + " мм";
                    ctx.fillText(text, -(karkasY + karkasWidth - dragElementY + dragElementWidth) / 2 - text.length * 7 / 2, -20);

                }
                ctx.strokeStyle = "rgba(0,0,0,0.18)";
                ctx.stroke();

                ctx.closePath();
            }

            ctx.restore()
        }
    };
    btn.getX = () => {
        let parent = btn.getParent();
        if (parent) {
            return parent.getX() + btn.getShiftX();
        }
    };
    btn.getY = () => {
        let parent = btn.getParent();
        if (parent) {
            return parent.getY() + btn.getShiftY()
        }
    };
    btn.setY = (y) => {
        let parent = btn.getParent();
        if (parent) {
            parent.setY(y - btn.getShiftY());
        }
    };
    btn.setX = (x) => {
        let parent = btn.getParent();
        if (parent) {
            parent.setX(x - btn.getShiftX());
        }
    };
}
