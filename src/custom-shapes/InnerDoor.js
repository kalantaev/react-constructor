import {createShape} from "../canvas/Shape";
import {DIRECTION, OPENING_TYPE, POSITION} from "../enums";
import {getKarkasDepth} from "../variable";
import {colorBlack, defPartitionWidth, doorLength, y3dcefficient} from "../constants";
import {getLengthInDoor, getScaleValue} from "../functions";
import {drawGorizontalDoor, drawVertikalDoor} from "../drawFunction";
import {createDeleteBtn} from "./DeleteButton";
import {createDragElement} from "./DragElement";
import {createMirrorBtn} from "./MirrorButton";
import {createChangeOpenTypeBtn} from "./ChangeOpenTypeButton";
import {getScale} from "../canvas/Canvas";

export function createInnerDoor(parent, price, name, el) {
    let innerDoor;
    if (parent) {
        let x = parent.getX() + ((parent.getLength() / 4) - (doorLength / 2)) / getScale();
        let y = parent.getY() - getKarkasDepth() + parent.getScaledWidth();
        innerDoor = createShape(x, y, doorLength, defPartitionWidth, colorBlack);
        innerDoor.shift = 25;
        innerDoor.direction = DIRECTION.RIGHT;
        innerDoor.opening = OPENING_TYPE.OUT;
        innerDoor.position = POSITION.BOTTOM;
        innerDoor.shift = 50;
        innerDoor.parentId = parent.getId();
        innerDoor.position = parent.isHorizontally() ? POSITION.BOTTOM : POSITION.RIGHT;
        innerDoor.price = price;
        innerDoor.printName = name;
        innerDoor.hint = name;
        innerDoor.height = el.height;
        innerDoor.image3D = el.image3D;
        innerDoor.settingId = el.id
    } else {
        innerDoor = createShape();
    }
    innerDoor.name = "InnerDoor";
    innerDoor.nameRu = 'дверь';
    innerDoor.nameRu = 'дверь';

    updateFunction(innerDoor);

    return innerDoor;
}

function updateFunction(door)  {
    door.getLength = () => {
        return getLengthInDoor(door.position, defPartitionWidth, doorLength);
    };
    door.getWidth = () => {
        return getLengthInDoor(door.position, doorLength, defPartitionWidth);
    };
    door.getX = () => {
        let parent = door.getParent();
        if (parent) {
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() / getScale();
            let parentX = parent.getX();
            let shift = door.shift;

            switch (door.position) {
                case POSITION.TOP:
                case POSITION.BOTTOM:
                    return (shift / 100) * parentLength + parentX;
                case POSITION.RIGHT:
                    return parentX + parentLength - (defPartitionWidth / getScale());
                case POSITION.LEFT:
                    return parentX;
            }
        }
    };
    door.get3DY = () => {
        let parent = door.getParent();
        if (parent) {
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() * y3dcefficient / getScale();
            let parentY = parent.get3DY();
            let shift = door.shift;

            switch (door.position) {
                case POSITION.TOP:
                    return parentY;
                case POSITION.BOTTOM:
                    return parentY + parentWidth - defPartitionWidth / getScale();
                case POSITION.RIGHT:
                case POSITION.LEFT:
                    return (shift / 100) * parentWidth + parentY;
            }
        }
    };
    door.getY = () => {
        let parent = door.getParent();
        if (parent) {
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() / getScale();
            let parentY = parent.getY();
            let shift = door.shift;

            switch (door.position) {
                case POSITION.TOP:
                    return parentY;
                case POSITION.BOTTOM:
                    return parentY + parentWidth - defPartitionWidth / getScale();
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
            let parentLength = parent.getLength() / getScale();
            let parentWidth = parent.getWidth() / getScale();
            switch (door.position) {
                case POSITION.TOP:
                case POSITION.BOTTOM:
                    if (parentX < x && (parentX + parentLength) > (x + door.getLength() / getScale())) {
                        door.shift = ((x - parentX) / parentLength) * 100
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
                    if (parentY < y && (parentY + parentWidth) > (y + door.getWidth() / getScale())) {
                        door.shift = ((y - parentY) / parentWidth) * 100
                    }
            }
        }
    };
    door.revertSize=() => {
        let width = door.width;
        door.width = door.length;
        door.length = width;
        door.confirm();
        door.fixed = false;
        // drawAll() //todo
    };
    door.draw = function (ctx) {
        if (!door.fixed && door.relatedShapes.length === 0) {
            switch (door.position) {
                case POSITION.BOTTOM:
                case POSITION.TOP:
                    createDeleteBtn(door, -getScaleValue(40), door.opening === OPENING_TYPE.IN ? -getScaleValue(30) : getScaleValue(20));
                    createMirrorBtn(door, -getScaleValue(10), door.opening === OPENING_TYPE.IN ? -getScaleValue(30) : getScaleValue(20));
                    createChangeOpenTypeBtn(door, getScaleValue(20), door.opening === OPENING_TYPE.IN ? -getScaleValue(30) : getScaleValue(20));
                    createDragElement(door, (door.getLength() / 2 / getScale()) + getScaleValue(60), door.opening === OPENING_TYPE.IN ? -getScaleValue(20) : getScaleValue(30));
                    break;
                case POSITION.RIGHT:
                case POSITION.LEFT:
                    createDeleteBtn(door, door.opening === OPENING_TYPE.OUT ? getScaleValue(30) : -getScaleValue(30), getScaleValue(25)  );
                    createMirrorBtn(door, door.opening === OPENING_TYPE.OUT ? getScaleValue(30) : -getScaleValue(30), getScaleValue(54));
                    createChangeOpenTypeBtn(door, door.opening === OPENING_TYPE.OUT ? getScaleValue(30) : -getScaleValue(30), getScaleValue(35));
                    createDragElement(door, door.opening === OPENING_TYPE.OUT ? getScaleValue(40) : -getScaleValue(20), (door.getWidth() / 2 / getScale()) - getScaleValue(25));
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
                    door.getWidth() / getScale(),
                    door.opening,
                    door.direction, true);
                break;
            case POSITION.TOP:
                drawGorizontalDoor(ctx,
                    door.getX(),
                    door.getY(),
                    door.getLength() / getScale(),
                    door.getWidth() / getScale(),
                    door.opening === OPENING_TYPE.OUT ? OPENING_TYPE.IN : OPENING_TYPE.OUT,
                    door.direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT, true);
                break;
            case POSITION.LEFT:
                drawVertikalDoor(ctx,
                    door.getX(),
                    door.getY(),
                    door.getLength() / getScale(),
                    door.getWidth() / getScale(),
                    door.opening === OPENING_TYPE.OUT ? OPENING_TYPE.IN : OPENING_TYPE.OUT,
                    door.direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT);
                break;
            case POSITION.RIGHT:
                drawVertikalDoor(ctx,
                    door.getX(),
                    door.getY(),
                    door.getLength() / getScale(),
                    door.getWidth() / getScale(),
                    door.opening,
                    door.direction);
                break;
            default:
                break;

        }


        return door;
    };
}