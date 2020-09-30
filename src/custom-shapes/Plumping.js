import {createRectangle} from "./Rectangle";
import {OPENING_TYPE} from "../enums";
import {confirmAllShapes, getScaleValue, turnShape} from "../functions";
import {getImageFromMap, getKarkasDepth} from "../variable";
import {baseColor, defScaleValue} from "../constants";
import {createTurnBtn} from "./TurnButton";
import {createDeleteBtn} from "./DeleteButton";
import {createDragElement} from "./DragElement";
import {getScale} from "../canvas/Canvas";

export function createPlumbing(parent, setting) {
    let element;
    if (parent) {
        let defPartitionLength = setting.height;
        var x = parent.getX() + ((parent.getLength() / 4) - (defPartitionLength / 2)) / getScale();
        var y = parent.getY() - /*(parent.width /6) / getScale()*/ getScaleValue(40);
        element = createRectangle(x, y, defPartitionLength, setting.length, baseColor);
        element.parentId = parent.getId();
        element.positionRight = ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
        element.positionTop = ((y - parent.getY()) / (parent.getWidth() / getScale())) * 100;
        element.price = setting.price;
        element.hint = setting.name;
        element.height = 2500;
        element.imageId = setting.image3D;
        element.image  = getImageFromMap(setting.image3D) ;
        element.view = 1;
    } else {
        element = createRectangle()
    }
    element.name = 'Plumping';

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
        let parent = element.getParent();
        let thisLength = element.getLength() / getScale();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        if (parent) {
            if (parent.getX() + karkasDepth1 < x && (parent.getX() - karkasDepth1 + parent.getLength() / getScale()) > (x + thisLength)) {
                element.positionRight = ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
            } else if (parent.getX() + karkasDepth1 >= x) {
                element.positionRight = (karkasDepth1 / (parent.getLength() / getScale())) * 100;
            } else {
                element.positionRight = (((parent.getLength() / getScale()) - karkasDepth1 - thisLength) / (parent.getLength() / getScale())) * 100;
            }
            // let magnetShapeX1 = magnetShapeX(this);
            // if (magnetShapeX1) {
            //     this.setX(this.getX() + magnetShapeX1)
            // }
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
        if (!element.fixed && element.relatedShapes.length === 0) {
            let doors = element.getDoorsIfExist();
            let width = element.getWidth() / getScale();
            let length = element.getLength() / getScale();
            let isGorizontal = length > width;
            let scaleCoeff = defScaleValue / getScale();
            let val3 = (3 * scaleCoeff > 3) ? 3 : 3 * scaleCoeff;
            let val34 = (34 * scaleCoeff > 34) ? 34 : 34 * scaleCoeff;
            let val35 = (35 * scaleCoeff > 35) ? 35 : 35 * scaleCoeff;
            let val30 = (30 * scaleCoeff > 30) ? 30 : 30 * scaleCoeff;

            createDragElement(element, element.getLength() / 2 / getScale(), element.getWidth() / 2 / getScale());
            let shifts = [];
            if (doors.length > 0) {
                if (isGorizontal) {
                    shifts = doors[0].opening === OPENING_TYPE.IN ? [{x: 3, y: 15}, {x: 35, y: 18}, {x: -25, y: 18}] :
                        [{x: 3, y: undefined}, {x: 35, y: undefined}, {x: -25, y: -31}];
                } else {
                    shifts = doors[0].opening === OPENING_TYPE.IN ? [{x: 19, y: -15}, {x: 20, y: 19}, {
                        x: 24,
                        y: -45
                    }] : [{x: -35, y: -15}, {x: -30, y: 19}, {x: -30, y: -45}];
                }
            } else {
                shifts = isGorizontal ? [{x: 3, y: -34}, {x: 35, y: -30}, {x: -25, y: -31}] :
                    [{x: 19, y: -15}, {x: 20, y: 19}, {x: 24, y: -45}];
            }
            createTurnBtn(element,
                getScaleValue(Math.abs(shifts[0].x)) * shifts[0].x / Math.abs(shifts[0].x),
                !shifts[0].y ? undefined : getScaleValue(Math.abs(shifts[0].y)) * shifts[0].y / Math.abs(shifts[0].y));
            createDeleteBtn(element,
                getScaleValue(Math.abs(shifts[1].x)) * shifts[1].x / Math.abs(shifts[1].x),
                !shifts[1].y ? undefined : getScaleValue(Math.abs(shifts[1].y)) * shifts[1].y / Math.abs(shifts[1].y));
        }
        ctx.save();
        if (element.view === 1) {
            ctx.drawImage(element.image, element.getX(), element.getY(), element.getLength() / getScale(), element.getWidth() / getScale());

        } else if (element.view === 2) {
            ctx.translate(element.getX() + element.getLength() / getScale(), element.getY());
            ctx.rotate(1.57);
            ctx.drawImage(element.image, 0, 0, element.getWidth() / getScale(), element.getLength() / getScale());
        } else if (element.view === 3) {
            ctx.translate(element.getX() + element.getLength() / getScale(), element.getY() + element.getWidth() / getScale());
            ctx.rotate(3.15);
            ctx.drawImage(element.image, 0, 0, element.getLength() / getScale(), element.getWidth() / getScale());
        } else {
            ctx.translate(element.getX(), element.getY() + element.getWidth() / getScale());
            ctx.rotate(4.7);
            ctx.drawImage(element.image, 0, 0, element.getWidth() / getScale(), element.getLength() / getScale());
        }
        ctx.restore();
    };

    element.turn = () => {
        turnShape(element);
        confirmAllShapes();
        if (element.view === 3) {
            element.view = 0;
        } else {
            element.view = element.view + 1
        }
    };
}