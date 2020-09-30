import {DIRECTION, OPENING_TYPE, POSITION} from "../enums";
import {createShape} from "../canvas/Shape";
import {colorBlack, defScaleValue, doorLength, y3dcefficient} from "../constants";
import {getKarkasDepth, getShapes} from "../variable";
import {
    filterBottomDoor,
    getLengthInDoor,
    getScaleValue,
    getShapeById,
    getXInShapeOnKarkas,
    getYInShapeOnKarkas
} from "../functions";
import {drawGorizontalDoor, drawVertikalDoor} from "../drawFunction";
import {createDeleteBtn} from "./DeleteButton";
import {createEditBtn} from "./EditButton";
import {createDragElement} from "./DragElement";
import {createMirrorBtn} from "./MirrorButton";
import {createChangeOpenTypeBtn} from "./ChangeOpenTypeButton";
import {getMouseX, getMouseY, getScale} from "../canvas/Canvas";

export function createDoorWithShift(parent, shift) {
    return createDoorAllSetting(parent, {}, null, shift)
}
export function createDoor(parent, setting, el) {
   return  createDoorAllSetting(parent, setting, el)
}
function createDoorAllSetting(parent, setting, el, shift) {
    let door;
    if (parent) {
        var x = parent.getX() + ((parent.getLength() / 2) - (doorLength / 2));
        var y = parent.getY() - getKarkasDepth() + parent.getWidth();
        door = createShape(x, y, ((setting && setting.length) || doorLength), getKarkasDepth(), colorBlack);
        door.shift = shift || calculateShift(x, parent);
        door.position = POSITION.BOTTOM;
        door.direction = DIRECTION.RIGHT;
        door.opening = OPENING_TYPE.OUT;
        door.parentId = parent.getId();
        door.price = setting.price;
        door.printName = setting.name;
        door.heightPosition = setting.heightPosition || 2000;
        door.settingId = el && el.id;
        door.image3D = el && el.image3D;
        door.height = el && el.height
    } else {
        door = createShape();
    }
    door.name = "Door";
    door.nameRu = 'дверь';
    door.getLength = () => getLengthInDoor(door.position, getKarkasDepth(), doorLength);
    door.getWidth = () => getLengthInDoor(door.position, doorLength, getKarkasDepth());
    door.getX = () => getXInShapeOnKarkas(door.shift, door.position, door.getParent());
    door.getY = () => getYInShapeOnKarkas(door.shift, door.position, door.getParent());
    door.get3DY = () => {
        let parent = door.getParent();
        if (parent) {
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() * y3dcefficient / getScale();
            let parentY = parent.getY();
            let shift = door.shift;

            switch (door.position) {
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
    door.setX = (x) => {
        let parent = door.getParent();
        if (parent) {
            let parentX = parent.getX();
            let parentLength = parent.getLength();
            let parentWidth = parent.getWidth() / getScale();
            switch (door.position) {
                case POSITION.TOP:
                case POSITION.BOTTOM:
                    if (parentX + getKarkasDepth() < x && (parentX - getKarkasDepth() + parentLength / getScale()) > (x + door.getLength() / getScale())) {
                        door.shift = ((x - parentX) / (parentLength / getScale())) * 100
                    } else if ((parentX + parentLength / getScale()) < getMouseX()) {
                        door.shift = door.position === POSITION.TOP ? getKarkasDepth() * 100 / parentWidth : ((parentWidth - getKarkasDepth() - door.getLength() / getScale()) / parentWidth) * 100;
                        let arrow = getShapeById(door.arrowsId[0]);
                        arrow && (arrow.type = POSITION.LEFT);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        door.position = POSITION.RIGHT;
                        door.revertSize()
                    } else if (parentX > getMouseX()) {
                        door.shift = door.position === POSITION.TOP ? getKarkasDepth() * 100 / parentWidth : ((parentWidth - getKarkasDepth() - door.getLength() / getScale()) / parentWidth) * 100;
                        let arrow = getShapeById(door.arrowsId[0]);
                        arrow && (arrow.type = POSITION.RIGHT);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        door.position = POSITION.LEFT;
                        door.revertSize()
                    }
                    break;
                case POSITION.RIGHT:
                case POSITION.LEFT:
            }
        }
    };
    door.setY = (y) => {
        let parent = door.getParent();
        if (parent) {
            let parentY = parent.getY();
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() / getScale();

            switch (door.position) {
                case POSITION.TOP:
                case POSITION.BOTTOM:
                    break;
                case POSITION.RIGHT:
                case POSITION.LEFT:
                    if (parentY + getKarkasDepth() < y && (parentY - getKarkasDepth() + parentWidth) > (y + door.width / getScale())) {
                        door.shift = ((y - parentY) / parentWidth) * 100
                    } else if ((parentY + parentWidth) < getMouseY()) {
                        let arrow = getShapeById(door.arrowsId[0]);
                        arrow && (arrow.type = POSITION.TOP);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        door.shift = door.position === POSITION.LEFT ? getKarkasDepth() * 100 / parentLength : ((parentLength - getKarkasDepth() - door.getWidth() / getScale()) / parentLength) * 100;
                        door.position = POSITION.BOTTOM;
                        door.revertSize()
                    } else if (parentY > getMouseY()) {
                        door.shift = door.position === POSITION.LEFT ? getKarkasDepth() * 100 / parentLength : ((parentLength - getKarkasDepth() - door.getWidth() / getScale()) / parentLength) * 100;
                        let arrow = getShapeById(door.arrowsId[0]);
                        arrow && (arrow.shiftX = 0);
                        arrow && (arrow.shiftY = 0);
                        arrow && (arrow.type = POSITION.BOTTOM);
                        door.position = POSITION.TOP;
                        door.revertSize()
                    }
            }
        }

    };
    door.revertSize = (drawAll) => {
        let width = door.width;
        door.width = door.length;
        door.length = width;
        door.confirm();
        door.fixed = false;
        drawAll && drawAll()
    };
    door.edit = () => {
        // selectDoor(document.getElementById(rootDivId), this.getId())//todo
    };
    door.draw = function (ctx) {
        if (!door.fixed && door.relatedShapes.length === 0) {
            switch (door.position) {
                case POSITION.BOTTOM:
                case POSITION.TOP:
                    !door.base && createDeleteBtn(door, -getScaleValue(40), -getScaleValue(35));
                    door.base && createEditBtn(door, -getScaleValue(40), -getScaleValue(35));
                    createMirrorBtn(door, -getScaleValue(10), -getScaleValue(35));
                    createChangeOpenTypeBtn(door, getScaleValue(20), -getScaleValue(35));
                    createDragElement(door, (door.getLength() / 2 / getScale()), getKarkasDepth() / 2);
                    break;
                case POSITION.RIGHT:
                case POSITION.LEFT:
                    !door.base && createDeleteBtn(door, getScaleValue(15), getScaleValue(15));
                    door.base && createEditBtn(door, getScaleValue(15), getScaleValue(15));
                    createMirrorBtn(door, getScaleValue(15), getScaleValue(15));
                    createChangeOpenTypeBtn(door, getScaleValue(15), getScaleValue(40));
                    createDragElement(door, getKarkasDepth() / 2, (this.getWidth() / 2 / getScale()));
                    break;
            }
        }
        //фигура
        // ctx.save();
        switch (door.position) {
            case POSITION.BOTTOM:
                drawGorizontalDoor(ctx,
                    door.getX(),
                    door.getY(),
                    door.getLength() / getScale(),
                    door.getWidth() * defScaleValue / getScale(),
                    door.opening,
                    door.direction);
                break;
            case POSITION.TOP:
                drawGorizontalDoor(ctx,
                    door.getX(),
                    door.getY(),
                    door.getLength() / getScale(),
                    door.getWidth() * defScaleValue / getScale(),
                    door.opening === OPENING_TYPE.OUT ? OPENING_TYPE.IN : OPENING_TYPE.OUT,
                    door.direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT);
                break;
            case POSITION.LEFT:
                drawVertikalDoor(ctx,
                    door.getX(),
                    door.getY(),
                    door.getLength() * defScaleValue / getScale(),
                    door.getWidth() / getScale(),
                    door.opening === OPENING_TYPE.OUT ? OPENING_TYPE.IN : OPENING_TYPE.OUT,
                    door.direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT);
                break;
            case POSITION.RIGHT:
                drawVertikalDoor(ctx,
                    door.getX(),
                    door.getY(),
                    door.getLength() * defScaleValue / getScale(),
                    door.getWidth() / getScale(),
                    door.opening,
                    door.direction);
                break;
            default:
                break;
        }
        return door;
    };

    return door;
}

function calculateShift(x, parent, shift) {
    shift = shift || ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
    if (getShapes().filter(filterBottomDoor).filter(item => Math.abs(item.shift - shift) < 5).length > 0) {
        shift = this.calculateShift(x, parent, shift > 80 ? 1 : shift + 13.5)
    }
    return shift;
}
