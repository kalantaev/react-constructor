import {POSITION} from "../enums";
import {colorBlack, defScaleValue, y3dcefficient} from "../constants";
import {
    calculateShift,
    getLengthInDoor,
    getScaleValue,
    getShapeById,
    getXInShapeOnKarkas,
    getYInShapeOnKarkas
} from "../functions";
import {getKarkasDepth, getShapes} from "../variable";
import {drawGorizontalWindow, drawVertikalWindow} from "../drawFunction";
import {createDeleteBtn} from "./DeleteButton";
import {createEditBtn} from "./EditButton";
import {createDragElement} from "./DragElement";
import {createShape} from "../canvas/Shape";
import {getMouseX, getMouseY, getScale} from "../canvas/Canvas";

export function createWindow(parent, setting) {
    let window;
    if (parent) {
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        var x = parent.getX() + ((parent.getLength() / 4) - (setting.length / 2)) / getScale();
        var y = parent.getY() - karkasDepth1 + (parent.getWidth()) / getScale();
        window = createShape(x, y, setting.length, karkasDepth1, colorBlack);
        window.shift = calculateShift(x, parent, window.shift, getShapes(), getScale());
        window.position = POSITION.BOTTOM;
        window.parentId = parent.getId();
        window.price = setting.price;
        window.height = setting.height;
        window.heightPosition = setting.heightPosition || 2100;
        window.hint = setting.name;
        window.image3D = setting.image3D;
        window.settingId = setting.id;
        window.position = POSITION.BOTTOM;

    } else {
        window.shift = calculateShift();
    }
    window.name = 'Window';
    window.nameRu = 'окно';
    window.updateFromSetting = (setting) => {
        window.price = setting.price;
        window.height = setting.height;
        window.length = setting.length;
        window.hint = setting.name;
        window.image3D = setting.image3D;
        window.settingId = setting.id;
    };
    window.getLength = () => getLengthInDoor(window.position, getKarkasDepth(), window.length);
    window.getWidth = () => getLengthInDoor(window.position, window.length, getKarkasDepth());
    window.getX = () => getXInShapeOnKarkas(window.shift, window.position, window.getParent());
    window.get3DY = () => {
        let parent = window.getParent();
        if (parent) {
            let parentWidth = parent.getWidth() * y3dcefficient / getScale();
            let parentY = parent.getY();
            let shift = window.shift;

            switch (window.position) {
                case POSITION.TOP:
                    return parentY + getKarkasDepth() * defScaleValue * y3dcefficient / getScale() - (getKarkasDepth() * y3dcefficient / getScale());
                case POSITION.BOTTOM:
                    return parentY + parentWidth - (getKarkasDepth() * y3dcefficient / getScale());
                case POSITION.RIGHT:
                case POSITION.LEFT:
                    return (shift / 100) * parentWidth + parentY;
            }
        }
    };
    window.getY = () => getYInShapeOnKarkas(window.shift, window.position, window.getParent());
    window.setX = (x) => {
        let parent = window.getParent();
        if (parent) {
            let parentX = parent.getX();
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() / getScale();
            switch (window.position) {
                case POSITION.TOP:
                case POSITION.BOTTOM:
                    if (parentX + getKarkasDepth() < x && (parentX - getKarkasDepth() + parentLength) > (x + window.getScaledLength())) {
                        window.shift = ((x - parentX) / (parentLength)) * 100
                    } else if ((parentX + parentLength) < getMouseX()) {
                        window.shift = window.position === POSITION.TOP ? getKarkasDepth() * 100 / parentWidth :
                            ((parentWidth - getKarkasDepth() - window.getScaledLength()) / parentWidth) * 100;
                        let arrow = getShapeById(window.arrowsId[0]);
                        arrow && (arrow.type = POSITION.RIGHT);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        window.position = POSITION.RIGHT;
                    } else if (parentX > getMouseX()) {
                        window.shift = window.position === POSITION.TOP ? getKarkasDepth() * 100 / parentWidth :
                            ((parentWidth - getKarkasDepth() - window.getScaledLength()) / parentWidth) * 100;
                        let arrow = getShapeById(window.arrowsId[0]);
                        arrow && (arrow.type = POSITION.LEFT);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        window.position = POSITION.LEFT;
                    }
                    break;
                case POSITION.RIGHT:
                case POSITION.LEFT:
            }
        }
    };
    window.setY = (y) => {
        let parent = window.getParent();
        if (parent) {
            let parentY = parent.getY();
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() / getScale();

            switch (window.position) {
                case POSITION.TOP:
                case POSITION.BOTTOM:
                    break;
                case POSITION.RIGHT:
                case POSITION.LEFT:
                    if (parentY + getKarkasDepth() < y && (parentY - getKarkasDepth() + parentWidth) > (y + window.getWidth() / getScale())) {
                        window.shift = ((y - parentY) / parentWidth) * 100
                    } else if ((parentY + parentWidth) < getMouseY()) {
                        let arrow = getShapeById(window.arrowsId[0]);
                        arrow && (arrow.type = POSITION.BOTTOM);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        window.shift = window.position === POSITION.LEFT ? getKarkasDepth() * 100 / parentLength :
                            ((parentLength - getKarkasDepth() - window.getWidth() / getScale()) / parentLength) * 100;
                        window.position = POSITION.BOTTOM;
                    } else if (parentY > getMouseY()) {
                        window.shift = window.position === POSITION.LEFT ? getKarkasDepth() * 100 / parentLength :
                            ((parentLength - getKarkasDepth() - window.getWidth() / getScale()) / parentLength) * 100;
                        let arrow = getShapeById(window.arrowsId[0]);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        arrow && (arrow.type = POSITION.TOP);
                        window.position = POSITION.TOP;
                    }
            }
        }
    };
    window.draw = function (ctx, scale, selectedShapeId, isDragging, karkas) {
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        if (!window.fixed && window.relatedShapes.length === 0) {
            switch (window.position) {
                case POSITION.BOTTOM:
                case POSITION.TOP:
                    !window.base && createDeleteBtn(window, -getScaleValue(40), -getScaleValue(35));
                    window.base && createEditBtn(window, -getScaleValue(40), -getScaleValue(35));
                    createDragElement(window, (window.getLength() / 2 / getScale()), getKarkasDepth() / 2);
                    break;
                case POSITION.RIGHT:
                case POSITION.LEFT:
                    !window.base && createDeleteBtn(window, getScaleValue(15), getScaleValue(15));
                    this.base && createEditBtn(window, getScaleValue(15), getScaleValue(15));
                    createDragElement(window, getKarkasDepth() / 2, (this.getWidth() / 2 / getScale()));
                    break;
            }
        }
        //фигура
        switch (window.position) {
            case POSITION.BOTTOM:
            case POSITION.TOP:
                drawGorizontalWindow(ctx, window.getX(), window.getY(), window.getLength() / getScale(), karkasDepth1);
                break;
            case POSITION.LEFT:
            case POSITION.RIGHT:
                drawVertikalWindow(ctx, window.getX(), window.getY(), window.getWidth() / getScale(), karkasDepth1);
                break;
            default:
                break;
        }

        return window;
    };
    window.edit = () => {
        // selectWindow(document.getElementById(rootDivId), this.getId()) //todo
    };
    return window;
}