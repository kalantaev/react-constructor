import {confirmAllShapes, getScaleValue} from "../functions";
import {getKarkasDepth} from "../variable";
import {colorGrey, defScaleValue} from "../constants";
import {drawSocketBottom, drawSocketLeft, drawSocketRight, drawSocketTop} from "../drawFunction";
import {createTurnBtn} from "./TurnButton";
import {createDeleteBtn} from "./DeleteButton";
import {createDragElement} from "./DragElement";
import {createShape} from "../canvas/Shape";
import {getScale} from "../canvas/Canvas";

export function createSocket(parent, setting) {
    let element;
    if (parent) {
        const defPartitionLength = (parent.getLength() / 3);
        let x = parent.getX() + ((parent.getLength() / 4) - (defPartitionLength / 2)) / getScale();
        let y = parent.getY() - getScaleValue(40);
        element = createShape(x, y, 200, 200, colorGrey);
        element.price = setting.price;
        element.hint = setting.name;
        element.grounding = setting.grounding;
        element.single = setting.single;
        element.parentId = parent.getId();
        element.positionRight = ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
        element.positionTop = ((y - parent.getY()) / (parent.getLength() / getScale())) * 100 - 5;
    } else {
        element = createShape()
    }
    element.name = 'Socket';
    element.nameRu = 'розетку';
    element.view = 1;
    element.getX = () => {
        let parent = element.getParent();
        if (parent) {
            return (element.positionRight / 100) * parent.getLength() / getScale() + parent.getY();
        }
    };
    element.getY = () => {
        let parent = element.getParent();
        if (parent) {
            return (element.positionTop / 100) * parent.getWidth() / getScale() + parent.getY();
        }
    };
    element.setX = (x) => {
        element.x = element.getX() + x - element.getX();
        let parent = element.getParent();
        let thisLength = element.getLength() / getScale();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        if (parent) {
            if (parent.getX() + karkasDepth1 < x && (parent.getX() - karkasDepth1 + parent.getLength() / getScale()) > (x + thisLength)) {
                element.positionRight = ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
            } else if (parent.x + karkasDepth1 >= x) {
                element.positionRight = (karkasDepth1 / (parent.getLength() / getScale())) * 100;
            } else {
                element.positionRight = (((parent.getLength() / getScale()) - karkasDepth1 - thisLength) / (parent.getLength() / getScale())) * 100;
            }
        }
    };
    element.setY = (y) => {
        element.y = y;
        let parent = element.getParent();
        let thisWidth = element.getWidth() / getScale();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        if (parent) {
            if (parent.getY() + karkasDepth1 < y && (parent.getY() - karkasDepth1 + parent.getWidth() / getScale()) > (y + thisWidth)) {
                element.positionTop = ((y - parent.getY()) / (parent.getWidth() / getScale())) * 100;
            } else if (parent.getY() + karkasDepth1 >= y) {
                element.positionTop = (karkasDepth1 / (parent.getWidth() / getScale())) * 100;
            } else {
                element.positionTop = (((parent.getWidth() / getScale()) - karkasDepth1 - thisWidth) / (parent.getWidth() / getScale())) * 100;
            }
        }
    };
    element.draw = (ctx, scale, selectedShapeId, isDragging, karkas) => {
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        let length = element.getLength() / 2 / getScale();
        let height = element.getWidth() / 2 / getScale();
        if (!element.fixed && element.relatedShapes.length === 0) {
            switch (element.view) {
                case 1:
                    createDeleteBtn(element, -getScaleValue(7), -getScaleValue(20));
                    createDragElement(element, (length), getScaleValue(20));
                    createTurnBtn(element, -getScaleValue(30), -getScaleValue(23));
                    break;
                case 3:
                    createDeleteBtn(element, -getScaleValue(7), -getScaleValue(1));
                    createDragElement(element, (length), getScaleValue(1));
                    createTurnBtn(element, -getScaleValue(30), -getScaleValue(23));
                    break;
                case 2:
                    createDeleteBtn(element, getScaleValue(15), -getScaleValue(7));
                    createDragElement(element, getKarkasDepth() / 2, (height));
                    createTurnBtn(element, -getScaleValue(15), -getScaleValue(35));
                    break;
                case 0:
                    createDeleteBtn(element, -getScaleValue(17), -getScaleValue(7));
                    createDragElement(element, getScaleValue(23), (height));
                    createTurnBtn(element, -getScaleValue(1), -getScaleValue(35));
                    break;
            }
        }
        //фигура
        let centerX = element.getX() + element.getLength() / getScale() / 2;
        let centerX2 = element.getX() + element.getLength() / getScale();
        let centerY = element.getY() + element.getLength() / getScale() / 2;
        switch (element.view) {
            case 1:
                drawSocketBottom(ctx, centerX, centerY,
                    length,
                    height, element.grounding, element.single);
                break;
            case 3:
                drawSocketTop(ctx, centerX, centerY, length, height, element.grounding, element.single);
                break;
            case 2:
                drawSocketLeft(ctx, element.getX(), centerY, length, height, element.grounding, element.single);
                break;
            case 0:
                drawSocketRight(ctx, centerX2, centerY, length, height, element.grounding, element.single);
                break;
            default:
                break;
        }

        return element;
    };
    element.turn = () => {
        confirmAllShapes();
        if (element.view === 3) {
            element.view = 0;
        } else {
            element.view = element.view + 1
        }
    };
}
