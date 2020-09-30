import {createRectangle} from "./Rectangle";
import {OPENING_TYPE, POSITION} from "../enums";
import {
    baseColor,
    colorBlack, cos41, cos7,
    defPartitionWidth,
    defScaleValue,
    doorLength, imageCoeffWidth,
    imageTextureHeight,
    prices, sin41, sin7,
    y3dcefficient
} from "../constants";
import {
    getScaleValue,
    getShapeById,
    parseDataTo3DCreate,
    round,
    setDeleteAllShapeInArrId,
    turnShape
} from "../functions";
import {getImageFromMap, getKarkasDepth} from "../variable";
import {getLineWidth, getScale, getScale1} from "../canvas/Canvas";
import {createAddInnerDoorBtn} from "./AddInnerDoorButton";
import {createShowArrowBtn} from "./ShowAddArrowButton";
import {createDeleteBtn} from "./DeleteButton";
import {createTurnBtn} from "./TurnButton";
import {createChangeSizeBtn} from "./ChangeSizeElement";
import {createDragElement} from "./DragElement";
import {createArrow} from "./Arrow";
import {draw3dFront, draw3dLeft, draw3dRoof} from "../draw3dFunction";

export function createWall(parent) {
    let wall;
    if (parent) {
        let defPartitionLength = (parent.getLength() / 3);
        let x = parent.getX() + ((parent.getLength() / 4) - (defPartitionLength / 2)) / getScale();
        let y = parent.getY() - /*(parent.width /6) / getScale()*/ getScaleValue(40);
        wall = createRectangle(x, y, defPartitionLength, defPartitionWidth, baseColor);
        wall.parentId = parent.getId();
        wall.positionRight = ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
        wall.positionTop = ((y - parent.getY()) / (parent.getWidth() / getScale())) * 100;
        wall.price = round(defPartitionLength * prices.partition1m, 2);
        wall.height = 2500;
    } else {
        wall = createRectangle()
    }
    createArrow(wall, parent.isHorizontally() ? POSITION.TOP : POSITION.RIGHT, colorBlack);
    wall.name = 'Partition';
    wall.nameRu = 'перегородку';
    wall.getX = () => {
        let parent = wall.getParent();
        if (parent) {
            return (wall.positionRight / 100) * parent.getLength() / getScale() + parent.getX();
        } else {
            return wall.x
        }
    };
    wall.get3DY = () => {
        let parent = wall.getParent();
        if (parent) {
            return (wall.positionTop / 100) * parent.getWidth() * y3dcefficient / getScale() + parent.getY();
        }
    };
    wall.getY = () => {
        let parent = wall.getParent();
        if (parent) {
            return (wall.positionTop / 100) * parent.getWidth() / getScale() + parent.getY();
        } else {
            return wall.y
        }
    };
    wall.setX = (x) => {
        wall.x = x;
        let parent = wall.getParent();
        let thisLength = wall.getLength() / getScale();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        if (parent) {
            if (parent.getX() + karkasDepth1 < x && (parent.getX() - karkasDepth1 + parent.getLength() / getScale()) > (x + thisLength)) {
                wall.positionRight = ((x - parent.getX()) / (parent.getLength() / getScale())) * 100;
            } else if (parent.getX() + karkasDepth1 >= x) {
                wall.positionRight = (karkasDepth1 / (parent.getLength() / getScale())) * 100;
            } else {
                wall.positionRight = (((parent.getLength() / getScale()) - karkasDepth1 - thisLength) / (parent.getLength() / getScale())) * 100;
            }
        }
    };
    wall.setY = (y) => {
        wall.y = y;
        let parent = wall.getParent();
        let thisWidth = wall.getWidth() / getScale();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        if (parent) {
            if (parent.getY() + karkasDepth1 < y && (parent.getY() - karkasDepth1 + parent.getWidth() / getScale()) > (y + thisWidth)) {
                wall.positionTop = ((y - parent.getY()) / (parent.getWidth() / getScale())) * 100;
            } else if (parent.getY() + karkasDepth1 >= y) {
                wall.positionTop = (karkasDepth1 / (parent.getWidth() / getScale())) * 100;
            } else {
                wall.positionTop = (((parent.getWidth() / getScale()) - karkasDepth1 - thisWidth) / (parent.getWidth() / getScale())) * 100;
            }
        }
    };
    wall.resize = (dx, dy, isLeft) => {
        let parent = wall.getParent();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        let doors = wall.getDoorsIfExist();
        let minLength = doors.length > 0 ? (doorLength + 40) * doors.length : 100;
        if (parent) {
            if (wall.getLength() > wall.getWidth()) {
                if (isLeft) {
                    let length = wall.getLength() - dx * getScale();
                    if (length > minLength) {
                        if (wall.getX() > parent.getX() + karkasDepth1 || dx > 0) {
                            wall.positionRight = ((wall.getX() + dx - parent.getX()) / (parent.getLength() / getScale())) * 100;
                            wall.length -= dx * getScale();
                        } else {
                            wall.positionRight = ((karkasDepth1 / (parent.getLength() / getScale()))) * 100;
                        }
                    }
                } else {
                    if ((wall.getX() - parent.getX() + karkasDepth1 + (wall.getLength() + dx * getScale()) / getScale()) * getScale() < parent.getLength()) {
                        let length = wall.getLength() + dx * getScale();
                        if (length > minLength) wall.setLength(length);
                    }
                }
                wall.price = round(wall.getLength(), 2) * prices.partition1m
            } else {
                if (isLeft) {
                    let width = wall.width - dy * getScale();
                    if (width > minLength) {
                        if (wall.getY() > parent.getY() + karkasDepth1 || dy > 0) {
                            wall.positionTop = ((wall.getY() + dy - parent.getY()) / (parent.getWidth() / getScale())) * 100;
                            wall.width -= dy * getScale();
                        } else {
                            wall.positionTop = ((karkasDepth1 / (parent.getWidth() / getScale()))) * 100;
                        }
                    }
                } else {
                    if ((wall.getY() - parent.getY() + karkasDepth1 + (wall.getWidth() + dy * getScale()) / getScale()) * getScale() < parent.getWidth()) {
                        let width = wall.getWidth() + dy * getScale();
                        if (width > minLength) wall.width += dy * getScale();
                    }
                }
                wall.price = round(wall.getWidth(), 2) * prices.partition1m
            }
            let innerParentWidth = (((parent.getWidth()) / getScale()) - karkasDepth1 * 2) * getScale();

            if (wall.getWidth() + getKarkasDepth() * 2 >= innerParentWidth) {
                setDeleteAllShapeInArrId(wall.arrowsId);
                this.arrowsId = [];
            } else {
                // if (this.arrowsId.length === 0) {
                //     new Arrow(this, POSITION.LEFT, colorBlack);
                // }
            }
        }
    };
    wall.draw = function (ctx) {
        if (!wall.fixed && wall.relatedShapes.length === 0) {
            let doors = wall.getDoorsIfExist();
            let scaleCoeff = defScaleValue / getScale();
            let val3 = (3 * scaleCoeff > 3) ? 3 : 3 * scaleCoeff;
            let val34 = (34 * scaleCoeff > 34) ? 34 : 34 * scaleCoeff;
            let val35 = (35 * scaleCoeff > 35) ? 35 : 35 * scaleCoeff;
            let val30 = (30 * scaleCoeff > 30) ? 30 : 30 * scaleCoeff;
            let needAddDoor = (wall.isHorizontally() ? (wall.getLength() > doorLength) : (wall.getWidth() > doorLength));
            let needShowAddArrow = wall.arrowsId.length === 0;
            createDragElement(wall, wall.getScaledLength() / 2, wall.getScaledWidth() / 2);
            createChangeSizeBtn(wall, true);
            createChangeSizeBtn(wall, false);
            let shifts = [];
            if (doors.length > 0) {
                if (wall.isHorizontally()) {
                    shifts = doors[0].opening === OPENING_TYPE.IN ? [{x: 3, y: 15}, {x: 35, y: 18}, {
                            x: -25,
                            y: 18
                        }, {x: 60, y: 18}] :
                        [{x: 3, y: undefined}, {x: 35, y: undefined}, {x: -25, y: -31}, {x: 60, y: -32}];
                } else {
                    shifts = doors[0].opening === OPENING_TYPE.IN ? [{x: 19, y: -15}, {x: 20, y: 19}, {
                        x: 24,
                        y: -45
                    }, {x: 20, y: 40}] : [{x: -35, y: -15}, {x: -30, y: 19}, {x: -30, y: -45}, {x: -30, y: 40}];
                }
            } else {
                shifts = wall.isHorizontally() ? [{x: 3, y: -34}, {x: 35, y: -30}, {x: -25, y: -31}, {x: 60, y: -30}] :
                    [{x: 19, y: -15}, {x: 20, y: 19}, {x: 24, y: -45}, {x: 20, y: 40}];
            }
            createTurnBtn(wall,
                getScaleValue(Math.abs(shifts[0].x)) * shifts[0].x / Math.abs(shifts[0].x),
                !shifts[0].y ? undefined : getScaleValue(Math.abs(shifts[0].y)) * shifts[0].y / Math.abs(shifts[0].y));
            createDeleteBtn(wall,
                getScaleValue(Math.abs(shifts[1].x)) * shifts[1].x / Math.abs(shifts[1].x),
                !shifts[1].y ? undefined : getScaleValue(Math.abs(shifts[1].y)) * shifts[1].y / Math.abs(shifts[1].y));
            needShowAddArrow && createShowArrowBtn(wall,
                getScaleValue(Math.abs(shifts[3].x)) * shifts[3].x / Math.abs(shifts[3].x),
                !shifts[3].y ? undefined : getScaleValue(Math.abs(shifts[3].y)) * shifts[3].y / Math.abs(shifts[3].y));
            needAddDoor && createAddInnerDoorBtn(wall,
                getScaleValue(Math.abs(shifts[2].x)) * shifts[2].x / Math.abs(shifts[2].x),
                !shifts[2].y ? undefined : getScaleValue(Math.abs(shifts[2].y)) * shifts[2].y / Math.abs(shifts[2].y));
        }
        let color = wall.color;
        //предупреждение при пересечении//todo написать метод пресечения фигур
        // shapes.forEach(item => {
        //     if (!(item instanceof Karkas) &&
        //         item.getId() !== this.getId() &&
        //         this.relatedShapes.indexOf(item.getId()) === -1 &&
        //         (!selectedShapeId || selectedShapeId === this.getId()) &&
        //         isMouseInShape(this.getX(), this.getY(), item)) {
        //         color = colorRed;
        //     }
        // });

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = getLineWidth().lineBase;
        ctx.rect(wall.getX(), wall.getY(), wall.getScaledLength(), wall.getScaledWidth());
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        return wall;
    };
    wall.turn = () => {
        turnShape(wall);
        let parent = wall.getParent();
        let karkasDepth1 = getKarkasDepth() * defScaleValue / getScale();
        let innerParentWidth = (((parent.getWidth()) / getScale()) - karkasDepth1 * 2) * getScale();
        if (parent) {
            if (wall.getWidth() + getKarkasDepth() * 2 > innerParentWidth) {
                wall.setWidth(innerParentWidth);
                setDeleteAllShapeInArrId(wall.arrowsId);
            } else {
                let arrow = getShapeById(wall.arrowsId[0]);
                arrow && (arrow.shiftX = 0);
                arrow && (arrow.shiftY = 0);
            }
        }
        wall.confirm();
        wall.fixed = false;
        wall.getDoorsIfExist().forEach(door => {
            door.position = door.position === POSITION.BOTTOM ? POSITION.RIGHT : POSITION.BOTTOM;
        });
        wall.setX(wall.getX());
        wall.setY(wall.getY())
    };
    wall.draw3D = (canvasData) => {
        let shapeData = parseDataTo3DCreate(wall);
        let {name, x1, x2, x3, x4, y1, y2, y3, y4, w, h, h1, h2, color, gorizontal, shape} = shapeData;
        let {ctx, scale, cos7, sin41, cos41, sin7} = canvasData;
        if (wall.isHorizontally()) {
            let x = x4 * cos7 + sin41 * y4;
            let y = y4 * cos41 - sin7 * x4 - h2;
            ctx.save();
            ctx.beginPath();
            let skewing = 0.125 * scale;
            ctx.setTransform(scale, - skewing, 0, scale, -200, x * skewing+400);
            ctx.drawImage(getImageFromMap(wall.getParent().inner3DImageId), 0, 0,
                imageCoeffWidth * w, imageTextureHeight, x, y, w , wall.getParent().getHeight() );
            ctx.closePath();
            ctx.restore();
        } else {
            ctx.save();
            ctx.beginPath();
            let x = x1 * cos7 + sin41 * y1;
            let y = y1 * cos41 - sin7 * x1 - h2;
            ctx.setTransform(1, 0.875, 0, 1, 0, -x * 87.5 / 100);
            ctx.drawImage(getImageFromMap(wall.getParent().inner3DImageId), 0, 0,
                imageCoeffWidth * h, imageTextureHeight, x, y, h * 0.565 , wall.getParent().getHeight() );
            ctx.closePath();
            ctx.restore();
        }
        draw3dLeft(canvasData, {...shapeData, color: gorizontal && color});
        draw3dFront(canvasData, {...shapeData, color: !gorizontal && color});
        draw3dRoof(canvasData, {...shapeData, color});
//
//     shape.getDoorsIfExist().forEach(door => {
//         let data3D = parseDataTo3DCreate(door);
//         if (gorizontal) {
//             !!data3D.image ? drawFrontImage(data3D) : draw3dFront(data3D);
//         } else {
//             !!data3D.image ? drawLeftImage(data3D) : draw3dLeft(data3D);
//         }
//     });
//
//     getShapes().filter(isSerialized).filter(filterFrontDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawFrontImage(item) : draw3dRectangle(item));
//     getShapes().filter(isSerialized).filter(filterLeftDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawLeftImage(item) : draw3dRectangle(item));
// }
    };
    return wall;
}
