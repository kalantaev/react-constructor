import {colorGrey, defScaleValue} from "../constants";
import {getScaleValue} from "../functions";
import {getKarkasDepth} from "../variable";
import {createDeleteBtn} from "./DeleteButton";
import {createDragElement} from "./DragElement";
import {createShape} from "../canvas/Shape";
import {getScale} from "../canvas/Canvas";

export function createLight(parent, setting) {
    let element;
    if (parent) {
        const defPartitionLength = (parent.getLength() / 3);
        let x = parent.getX() + ((parent.getLength() / 4) - (defPartitionLength / 2)) / getScale();
        let y = parent.getY() - getScaleValue(40);
        element = createShape(x, y, 200, 200, colorGrey);
        element.parentId = parent.getId();
        element.price = setting && setting.price;
        element.hint = setting.name;
        element.positionRight = ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
        element.positionTop = ((y - parent.getY()) / (parent.getWidth() / getScale())) * 100 - 5;
    } else {
        element = createShape();
    }
    element.name = 'Light';
    element.nameRu = 'светильник';
    element.getX = () => {
        let parent = element.getParent();
        if (parent) {
            return (element.positionRight / 100) * parent.getLength() / getScale() + parent.getX();
        }
    };
    element.getY = () => {
        let parent = element.getParent();
        if (parent) {
            return (element.positionTop / 100) * parent.getWidth() / getScale() + parent.getY();
        }
    };
    element.setX = (x) => {
        element.x = x;
        let scale = getScale();
        let karkasDepth = getKarkasDepth();
        let parent = element.getParent();
        let thisLength = element.getLength() / getScale();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        if (parent) {
            if (parent.getX() + karkasDepth1 < x && (parent.getX() - karkasDepth1 + parent.getLength() / getScale()) > (x + thisLength)) {
                element.positionRight = ((x - parent.getX()) / (parent.getLength() / scale)) * 100;
            } else if (parent.getX() + karkasDepth1 >= x) {
                element.positionRight = (karkasDepth1 / (parent.getLength() / scale)) * 100;
            } else {
                element.positionRight = (((parent.getLength() / scale) - karkasDepth1 - thisLength) / (parent.getLength() / scale)) * 100;
            }
        }
    };
    element.setY = (y) => {
        element.y = y;
        let scale = getScale();
        let karkasDepth = getKarkasDepth();
        let parent = element.getParent();
        let thisWidth = element.getWidth() / scale;
        let karkasDepth1 = karkasDepth * defScaleValue / scale;
        if (parent) {
            if (parent.getY() + karkasDepth1 < y && (parent.getY() - karkasDepth1 + parent.getWidth() / scale) > (y + thisWidth)) {
                element.positionTop = ((y - parent.getY()) / (parent.getWidth() / scale)) * 100;
            } else if (parent.getY() + karkasDepth1 >= y) {
                element.positionTop = (karkasDepth1 / (parent.getWidth() / scale)) * 100;
            } else {
                element.positionTop = (((parent.getWidth() / scale) - karkasDepth1 - thisWidth) / (parent.getWidth() / scale)) * 100;
            }
        }
    };
    element.draw = (ctx) => {
        if (!element.fixed && element.relatedShapes.length === 0) {
            createDragElement(element, element.getLength() / 2 / getScale(), element.getWidth() / 2 / getScale());
            createDeleteBtn(element, 15, -7);
        }
        let scale = getScale();
        let color = element.color;
        ctx.save();
        ctx.beginPath();
        let centerX = element.getX() + element.getLength() / scale / 2;
        let centerY = element.getY() + element.getLength() / scale / 2;
        ctx.arc(centerX, centerY, element.getLength() / 2 / scale, 0, 2 * Math.PI);
        let crossLenght = (element.getLength() - 50) / 2 / scale;
        ctx.moveTo(centerX - crossLenght, centerY - crossLenght);
        ctx.lineTo(centerX + crossLenght, centerY + crossLenght);
        ctx.moveTo(centerX + crossLenght, centerY - crossLenght);
        ctx.lineTo(centerX - crossLenght, centerY + crossLenght);
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.closePath();
        ctx.restore();

        return element;
    };
}