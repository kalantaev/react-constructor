import {getBaseConfigById, getHeightPosition, parseDataTo3DCreate} from "../functions";
import {createRectangle} from "./Rectangle";
import {
    baseColor,
    colorBlack,
    cos41,
    cos7,
    imageCoeffWidth,
    imageTextureHeight,
    sin41,
    sin7,
    y3dcefficient
} from "../constants";
import {getLineWidth} from "../canvas/Canvas";
import {createArrow} from "./Arrow";
import {POSITION} from "../enums";
import {createWindow} from "./Window";
import {createDoor, createDoorWithShift} from "./Door";
import {createShape} from "../canvas/Shape";
import {getImageFromMap} from "../variable";
import {draw3dFront, draw3dLeft, draw3dRoof, drawWall, drawWall2} from "../draw3dFunction";
import {closeAndRestore, saveAndBeginPath} from "../drawFunction";

const SIZE_TYPE = {
    SHOT: 'S',
    LONG: 'L',
    NORMAL: 'N'
};

function setBaseLineAndShapeColor(ctx, shape) {
    let lines = getLineWidth();
    ctx.lineWidth = lines.lineBase;
    ctx.strokeStyle = shape.color;
    ctx.stroke();
}

function setDimensionLine(ctx, lineDash) {
    let lines = getLineWidth();
    ctx.lineWidth = lines.lineSmall;
    ctx.strokeStyle = "rgba(255,120,0,0.8)";
    ctx.setLineDash(lineDash);
    ctx.stroke();
}

function createBasisTopWall(x, y, l, w, imgInner, imgOuter) {
    let wall = createShape(x, y, l, w, baseColor, null, true);
    wall.name = 'BasisWall';
    wall.height = 2500;
    wall.position = POSITION.TOP;
    wall.imgInner = imgInner;
    wall.imgOuter = imgOuter;
    wall.setSizeType = (s, e) => {
        wall.startSize = s;
        wall.endSize = e;
    };
    wall.draw = function (ctx) {
        saveAndBeginPath(ctx);
        let shiftStart = (wall.startSize === SIZE_TYPE.SHOT ? wall.getWidth() : wall.startSize === SIZE_TYPE.LONG ? (-wall.getWidth()) : 0);
        let shiftEnd = (wall.endSize === SIZE_TYPE.SHOT ? wall.getWidth() : wall.endSize === SIZE_TYPE.LONG ? (-wall.getWidth()) : 0);
        ctx.moveTo(wall.getX(), wall.getY());
        ctx.lineTo(wall.getX() + wall.getLength(), wall.getY());
        ctx.moveTo(wall.getX() + shiftStart,
            wall.getY() + wall.getWidth());
        ctx.lineTo(wall.getX() + wall.getLength() - shiftEnd, wall.getY() + wall.getWidth());
        setBaseLineAndShapeColor(ctx, wall);
        closeAndRestore(ctx);
        {
            saveAndBeginPath(ctx);
            ctx.moveTo(wall.getX() - 2 * wall.getWidth(), wall.getY() + wall.getWidth() / 2);
            ctx.lineTo(wall.getX() + wall.getLength() + 2 * wall.getWidth(), wall.getY() + wall.getWidth() / 2);
            setDimensionLine(ctx, [400, 250]);
            closeAndRestore(ctx);
            saveAndBeginPath(ctx);
            ctx.moveTo(wall.getX() + 360, wall.getY() + wall.getWidth() / 2);
            ctx.lineTo(wall.getX() + wall.getLength() + 2 * wall.getWidth(), wall.getY() + wall.getWidth() / 2);
            setDimensionLine(ctx, [10, 640]);
            closeAndRestore(ctx);
        }
        return wall;
    };
    wall.draw3D = (canvasData) => {
        let shapeData = parseDataTo3DCreate(wall);
        let wallOuterData = {...shapeData, image: wall.imgOuter, front: false};
        let wallInnerData = {
            ...shapeData,
            image: wall.imgInner,
            front: true,
            w: wall.getLength() - 2 * wall.getWidth(),
            x4: wall.get3DX() + wall.getWidth()
        };
        drawWall(wallOuterData, canvasData);
        drawWall(wallInnerData, canvasData);
        draw3dFront(canvasData, {
            ...shapeData,
            x4: wall.get3DX(),
            x3: wall.get3DX() + wall.getLength() - wall.getWidth()
        }, 'rgb(0,0,0)');
        draw3dRoof(canvasData, {...shapeData, color: 'rgb(205,128,0)'});
    };
    return wall;
}

function createBasisBottomWall(x, y, l, w, imgInner, imgOuter) {
    let wall = createShape(x, y, l, w, baseColor, null, true);
    wall.imgInner = imgInner;
    wall.imgOuter = imgOuter;
    wall.name = 'BasisWall';
    wall.height = 2500;
    wall.setSizeType = (s, e) => {
        wall.startSize = s;
        wall.endSize = e;
    };
    wall.position = POSITION.BOTTOM;
    wall.draw = function (ctx) {
        ctx.save();
        ctx.beginPath();
        let shiftStart = (wall.startSize === SIZE_TYPE.SHOT ? wall.getWidth() : wall.startSize === SIZE_TYPE.LONG ? (-wall.getWidth()) : 0);
        let shiftEnd = (wall.endSize === SIZE_TYPE.SHOT ? wall.getWidth() : wall.endSize === SIZE_TYPE.LONG ? (-wall.getWidth()) : 0);
        ctx.moveTo(wall.getX(), wall.getY());
        ctx.lineTo(wall.getX() + wall.getLength(), wall.getY());
        ctx.moveTo(wall.getX() + shiftStart, wall.getY() - wall.getWidth());
        ctx.lineTo(wall.getX() + wall.getLength() - shiftEnd, wall.getY() - wall.getWidth());
        let lines = getLineWidth();
        ctx.lineWidth = lines.lineBase;
        ctx.strokeStyle = wall.color;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        //верхняя пунктирная
        ctx.moveTo(wall.getX() - 2 * wall.getWidth(), wall.getY() - wall.getWidth() / 2);
        ctx.lineTo(wall.getX() + wall.getLength() + 2 * wall.getWidth(), wall.getY() - wall.getWidth() / 2);
        ctx.setLineDash([400, 250]);
        ctx.lineWidth = lines.lineSmall;
        ctx.strokeStyle = "rgba(255,120,0,0.8)";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        //верхняя пунктирная
        ctx.moveTo(wall.getX() + 360, wall.getY() - wall.getWidth() / 2);
        ctx.lineTo(wall.getX() + wall.getLength() + 2 * wall.getWidth(), wall.getY() - wall.getWidth() / 2);
        ctx.setLineDash([10, 640]);
        ctx.lineWidth = lines.lineSmall;
        ctx.strokeStyle = "rgba(255,120,0,0.8)";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        return wall;
    };
    wall.draw3D = (canvasData) => {
        let shapeData = parseDataTo3DCreate(wall);
        let wallInnerData = {
            ...shapeData,
            image: wall.imgInner,
            front: false,
            w: wall.getLength() - 2 * wall.getWidth(),
            x1: wall.get3DX() + wall.getWidth(),
            y1: wall.get3DY() - wall.getWidth() * y3dcefficient
        };

        drawWall(wallInnerData, canvasData);
        let wallOuterData = {...shapeData, image: wall.imgOuter, front: false};
        drawWall(wallOuterData, canvasData);

        let topY = wall.get3DY() - wall.getWidth() * y3dcefficient;
        shapeData = {...shapeData, y3: topY, y4: topY};

        draw3dFront(canvasData, {
            ...shapeData,
            y4: wall.get3DY(),
            y3: wall.get3DY()
        }, 'rgb(0,0,0)');
        draw3dRoof(canvasData, {...shapeData, color: 'rgb(205,128,0)'});
    };
    return wall;
}

function createBasisLeftWall(x, y, l, w, imgInner, imgOuter) {
    let wall = createShape(x, y, l, w, baseColor, null, true);
    wall.name = 'BasisWall';
    wall.imgInner = imgInner;
    wall.height = 2500;
    wall.position = POSITION.RIGHT;
    wall.imgOuter = imgOuter;
    wall.setSizeType = (s, e) => {
        wall.startSize = s;
        wall.endSize = e;
    };
    wall.draw = function (ctx) {
        saveAndBeginPath(ctx);
        let shiftTop = (wall.startSize === SIZE_TYPE.SHOT ? wall.getLength() : wall.startSize === SIZE_TYPE.LONG ? (-wall.getLength()) : 0);
        let shiftBottom = (wall.endSize === SIZE_TYPE.SHOT ? wall.getLength() : wall.endSize === SIZE_TYPE.LONG ? (-wall.getLength()) : 0);
        ctx.moveTo(wall.getX(), wall.getY());
        ctx.lineTo(wall.getX(), wall.getY() + wall.getWidth());
        ctx.moveTo(wall.getX() + wall.getLength(), wall.getY() + shiftTop);
        ctx.lineTo(wall.getX() + wall.getLength(), wall.getY() + wall.getWidth() - shiftBottom);
        setBaseLineAndShapeColor(ctx, wall);
        closeAndRestore(ctx);
        saveAndBeginPath(ctx);
        //верхняя пунктирная
        ctx.moveTo(wall.getX() + wall.getLength() / 2, wall.getY() - 2 * wall.getLength());
        ctx.lineTo(wall.getX() + wall.getLength() / 2, wall.getY() + wall.getWidth() + 2 * wall.getLength());
        setDimensionLine(ctx, [400, 250]);
        closeAndRestore(ctx);
        saveAndBeginPath(ctx);
        //верхняя пунктирная
        ctx.moveTo(wall.getX() + wall.getLength() / 2, wall.getY() - 2 * wall.getLength() + 500);
        ctx.lineTo(wall.getX() + wall.getLength() / 2, wall.getY() + wall.getWidth() + 2 * wall.getLength());
        setDimensionLine(ctx, [10, 640]);
        closeAndRestore(ctx);

        return wall;
    };
    wall.draw3D = (canvasData) => {
        let shapeData = parseDataTo3DCreate(wall);
        let wallOuterData = {...shapeData, image: wall.imgOuter, front: false};
        let wallInnerData = {
            ...shapeData,
            image: wall.imgInner,
            front: true,
            h: wall.getWidth() - 2 * wall.getLength(),
            y2: wall.get3DY() + wall.getLength() * y3dcefficient
        };
        drawWall(wallInnerData, canvasData);
        drawWall(wallOuterData, canvasData);
        draw3dLeft(canvasData, shapeData);
        draw3dRoof(canvasData, {...shapeData, color: 'rgb(205,128,0)'});
    };
    return wall;
}

function createBasisRightWall(x, y, l, w, imgInner, imgOuter) {
    let wall = createShape(x, y, l, w, baseColor, null, true);
    wall.name = 'BasisWall';
    wall.position = POSITION.LEFT;
    wall.height = 2500;
    wall.imgInner = imgInner;
    wall.imgOuter = imgOuter;
    wall.setSizeType = (s, e) => {
        wall.startSize = s;
        wall.endSize = e;
    };
    wall.draw = function (ctx) {
        let shiftTop = (wall.startSize === SIZE_TYPE.SHOT ? wall.getLength() : wall.startSize === SIZE_TYPE.LONG ? (-wall.getLength()) : 0);
        let shiftBottom = (wall.endSize === SIZE_TYPE.SHOT ? wall.getLength() : wall.endSize === SIZE_TYPE.LONG ? (-wall.getLength()) : 0);
        saveAndBeginPath(ctx);
        ctx.moveTo(wall.getX(), wall.getY());
        ctx.lineTo(wall.getX(), wall.getY() + wall.getWidth());
        ctx.moveTo(wall.getX() - wall.getLength(), wall.getY() + shiftTop);
        ctx.lineTo(wall.getX() - wall.getLength(), wall.getY() + wall.getWidth() - shiftBottom);
        setBaseLineAndShapeColor(ctx, wall);
        closeAndRestore(ctx);
        saveAndBeginPath(ctx);
        //верхняя пунктирная
        ctx.moveTo(wall.getX() - wall.getLength() / 2, wall.getY() - 2 * wall.getLength());
        ctx.lineTo(wall.getX() - wall.getLength() / 2, wall.getY() + wall.getWidth() + 2 * wall.getLength());
        setDimensionLine(ctx, [400, 250]);
        closeAndRestore(ctx);
        saveAndBeginPath(ctx);
        //верхняя пунктирная
        ctx.moveTo(wall.getX() - wall.getLength() / 2, wall.getY() - 2 * wall.getLength() + 500);
        ctx.lineTo(wall.getX() - wall.getLength() / 2, wall.getY() + wall.getWidth() + 2 * wall.getLength());
        setDimensionLine(ctx, [10, 640]);
        closeAndRestore(ctx);

        return wall;
    };
    wall.draw3D = (canvasData) => {
        let shapeData = parseDataTo3DCreate(wall);
        let wallOuterData = {...shapeData, image: wall.imgOuter, front: false};
        let wallInnerData = {
            ...shapeData,
            image: wall.imgInner,
            front: true,
            h: wall.getWidth() - 2 * wall.getLength(),
            y2: wall.get3DY() + wall.getLength() * y3dcefficient,
            x2: wall.get3DX() - wall.getLength()
        };
        drawWall(wallOuterData, canvasData);
        drawWall(wallInnerData, canvasData);
        let leftX = wall.get3DX() - wall.getLength();
        shapeData = {...shapeData, x2: leftX, x3: leftX};
        draw3dLeft(canvasData, {
            ...shapeData,
            x1: wall.get3DX() - wall.getLength(),
            x4: wall.get3DX() - wall.getLength(),
            y1: wall.get3DY() + wall.getLength() * y3dcefficient
        });
        draw3dRoof(canvasData, {...shapeData, color: 'rgb(205,128,0)'});
    };
    return wall;
}

function calculateWallPosition(walls) {

    for (let i = 1; i < walls.length; i++) {
        walls[i - 1].horizontally = walls[i - 1].y === walls[i].y;
        walls[i - 1].length = walls[i - 1].horizontally ? Math.abs(walls[i - 1].x - walls[i].x) : Math.abs(walls[i - 1].y - walls[i].y);
        walls[i - 1].startX = walls[i - 1].x;
        walls[i - 1].startY = walls[i - 1].y;
        walls[i - 1].endX = walls[i].x;
        walls[i - 1].endY = walls[i].y;
    }

    for (let i = 0; i < walls.length - 1; i++) {
        walls[i].next = walls[i + 1];
        if (i === walls.length - 2) {
            walls[i].next = walls[0];
        }
        if (walls[i].horizontally) {
            let hasMoreTop = false;
            let hasMoreBottom = false;
            for (let j = 0; j < walls.length; j++) {
                if (i !== j && walls[j].y < walls[i].y) {
                    hasMoreTop = true;
                }
                if (i !== j && walls[j].y > walls[i].y) {
                    hasMoreBottom = true;
                }
            }
            if (hasMoreTop && !hasMoreBottom) {
                walls[i].position = POSITION.BOTTOM;
            }
            if (!hasMoreTop && hasMoreBottom) {
                // walls[i].position = POSITION.TOP;
            }
        } else {
            let hasMoreLeft = false;
            let hasMoreRight = false;
            for (let j = 0; j < walls.length; j++) {
                if (i !== j && walls[j].x < walls[i].x) {
                    hasMoreLeft = true;
                }
                if (i !== j && walls[j].x > walls[i].x) {
                    hasMoreRight = true;
                }
            }
            if (hasMoreLeft && !hasMoreRight) {
                walls[i].position = POSITION.RIGHT;
            }
            if (!hasMoreLeft && hasMoreRight) {
                walls[i].position = POSITION.LEFT;
            }
        }
    }
    for (let i = 0; i < walls.length - 1; i++) {
        walls[i].next.prew = walls[i]
    }
    let hasNotSetPosition = true;
    while (hasNotSetPosition) {
        hasNotSetPosition = false;
        for (let i = 0; i < walls.length - 1; i++) {
            if (walls[i].prew.position && !walls[i].position) {
                walls[i].position =
                    (walls[i].prew.position === POSITION.TOP) ? //если предыдущая линия расположена сверху то
                        walls[i].prew.startX < walls[i].prew.endX ?  //если предыдущая линия рисуется слева направо то
                            ((walls[i].startY < walls[i].endY) ? //если текущая линия рисуется сверху вниз то
                                POSITION.RIGHT  //это правая линия
                                : POSITION.LEFT) //если текущая снизу вверх(иначе) то она левая
                            : //если предыдущая линия рисуется справа налева
                            ((walls[i].startY < walls[i].endY) ? //если текущая линия рисуется сверху вниз то
                                POSITION.LEFT //то она левая
                                : POSITION.RIGHT) : //иначе правая линия
                        (walls[i].prew.position === POSITION.BOTTOM) ?
                            walls[i].prew.startX < walls[i].prew.endX ?
                                (walls[i].startY < walls[i].endY ? POSITION.LEFT : POSITION.RIGHT) :
                                (walls[i].startY < walls[i].endY ? POSITION.RIGHT : POSITION.LEFT) :
                            (walls[i].prew.position === POSITION.RIGHT) ? walls[i].prew.startY < walls[i].prew.endY ?
                                (walls[i].startX < walls[i].endX ? POSITION.TOP : POSITION.BOTTOM) :
                                (walls[i].startX < walls[i].endX ? POSITION.BOTTOM : POSITION.TOP) :
                                walls[i].prew.startY < walls[i].prew.endY ?
                                    walls[i].startX < walls[i].endX ? POSITION.BOTTOM : POSITION.TOP :
                                    walls[i].startX < walls[i].endX ? POSITION.TOP : POSITION.BOTTOM
                ;
            }
            hasNotSetPosition = hasNotSetPosition || !walls[i].position;
        }
    }
    for (let i = 0; i < walls.length - 1; i++) {
        if (walls[i].position === POSITION.TOP) {
            if (walls[i].startX < walls[i].endX) {
                if (walls[i].next.position === POSITION.RIGHT) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.LEFT) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.TOP) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.TOP) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.RIGHT) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
                if (walls[i].prew.position === POSITION.LEFT) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
            } else {
                if (walls[i].next.position === POSITION.RIGHT) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.LEFT) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.TOP) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.TOP) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.RIGHT) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].prew.position === POSITION.LEFT) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
            }
        }
        if (walls[i].position === POSITION.BOTTOM) {
            if (walls[i].startX < walls[i].endX) {
                if (walls[i].next.position === POSITION.RIGHT) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.LEFT) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.BOTTOM) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.BOTTOM) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.RIGHT) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
                if (walls[i].prew.position === POSITION.LEFT) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
            } else {
                if (walls[i].next.position === POSITION.RIGHT) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.LEFT) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.BOTTOM) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.BOTTOM) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.RIGHT) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].prew.position === POSITION.LEFT) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
            }
        }
        if (walls[i].position === POSITION.LEFT) {
            if (walls[i].startY < walls[i].endY) {
                if (walls[i].next.position === POSITION.TOP) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.BOTTOM) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.LEFT) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.LEFT) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.BOTTOM) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
                if (walls[i].prew.position === POSITION.TOP) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
            } else {
                if (walls[i].next.position === POSITION.TOP) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.BOTTOM) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.LEFT) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.LEFT) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.TOP) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
                if (walls[i].prew.position === POSITION.BOTTOM) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
            }
        }
        if (walls[i].position === POSITION.RIGHT) {
            if (walls[i].startY < walls[i].endY) {
                if (walls[i].next.position === POSITION.TOP) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.BOTTOM) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.RIGHT) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.RIGHT) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.BOTTOM) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
                if (walls[i].prew.position === POSITION.TOP) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
            } else {
                if (walls[i].next.position === POSITION.TOP) {
                    walls[i].startSize = SIZE_TYPE.LONG;
                }
                if (walls[i].next.position === POSITION.BOTTOM) {
                    walls[i].startSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].next.position === POSITION.RIGHT) {
                    walls[i].endSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.RIGHT) {
                    walls[i].startSize = SIZE_TYPE.NORMAL;
                }
                if (walls[i].prew.position === POSITION.TOP) {
                    walls[i].endSize = SIZE_TYPE.SHOT;
                }
                if (walls[i].prew.position === POSITION.BOTTOM) {
                    walls[i].endSize = SIZE_TYPE.LONG;
                }
            }
        }
    }
}

export function createBasis(x, y, setting) {
    let basis;
    if (setting) {
        basis = createRectangle(x, y, setting.width, setting.height, baseColor, true, setting.price);
        basis.inner3DImageId = setting.elements.filter(item => item.elementType === 'TEXTURE_INNER' && item.def)[0].element.imageSelect;
        basis.outer3DImageId = setting.elements.filter(item => item.elementType === 'TEXTURE_OUTER' && item.def)[0].element.imageSelect;
        basis.karkasDepth = 70;
        basis.depth = !setting.walls ? 70 : setting.walls.filter(w => w.def)[0].depth;
        if (!setting.basisWalls || setting.basisWalls.length === 0) {
            createBasisTopWall(x, y, setting.width, basis.depth, basis.inner3DImageId, basis.outer3DImageId).setSizeType('S', 'S');
            createBasisBottomWall(x, y + setting.height, setting.width, basis.depth, basis.inner3DImageId, basis.outer3DImageId).setSizeType('S', 'S');
            createBasisLeftWall(x, y, basis.depth, setting.height, basis.inner3DImageId, basis.outer3DImageId).setSizeType('S', 'S');
            createBasisRightWall(x + setting.width, y, basis.depth, setting.height, basis.inner3DImageId, basis.outer3DImageId).setSizeType('S', 'S');
            setting.elements && setting.elements.forEach(baseElement => {
                switch (baseElement.elementType) {
                    case 'WINDOW':
                        let window = createWindow(basis, baseElement.element);
                        window.price = undefined;
                        window.base = true;
                        window.initId = baseElement.element.id;
                        window.settingId = baseElement.element.id;
                        if (baseElement.position) {
                            window.position = baseElement.position;
                        }
                        if (baseElement.shift) {
                            window.shift = baseElement.shift;
                        }
                        createArrow(window, baseElement.position || POSITION.BOTTOM, colorBlack);
                        break;
                    case 'DOOR':
                        let door = createDoor(basis, {});
                        door.price = undefined;
                        door.base = true;
                        door.initId = baseElement.element.id;
                        door.settingId = baseElement.element.id;
                        door.height = baseElement.element.height;
                        door.image3D = baseElement.element.image3D;
                        if (baseElement.position) {
                            door.position = baseElement.position;
                        }
                        if (baseElement.shift) {
                            door.shift = baseElement.shift;
                        }
                        createArrow(door, POSITION.TOP, colorBlack).update();
                        break;
                    default:
                        return;
                }
            });
        } else {
            let walls = setting.basisWalls;
            calculateWallPosition(walls);
            let sX, sY, eX, eY, w;
            let wallsShape = [];
            for (let i = 0; i < walls.length - 1; i++) {
                if (walls[i].position === POSITION.TOP) {
                    sX = walls[i].startX > walls[i].endX ? walls[i].endX : walls[i].startX;
                    sY = walls[i].startY;
                    w = createBasisTopWall(sX, sY, walls[i].length, basis.depth, basis.inner3DImageId, basis.outer3DImageId);
                    // createArrow(w, POSITION.TOP, colorBlack).update();
                    wallsShape.push(w);
                    w.setSizeType(walls[i].startSize, walls[i].endSize);
                } else if (walls[i].position === POSITION.BOTTOM) {
                    sX = walls[i].startX > walls[i].endX ? walls[i].endX : walls[i].startX;
                    sY = walls[i].startY;
                    w = createBasisBottomWall(sX, sY, walls[i].length, basis.depth, basis.inner3DImageId, basis.outer3DImageId);
                    // createArrow(w, POSITION.BOTTOM, colorBlack).update();
                    if (walls[i].doors) {
                        walls[i].doors.forEach(door => {
                            createDoorWithShift(w, (door.shift / walls[i].length) * 100)
                        })
                    }
                    if (walls[i].windows) {
                        walls[i].windows.forEach(window => {
                            // createWindow(w, {})
                        })
                    }
                    wallsShape.push(w);
                    w.setSizeType(walls[i].startSize, walls[i].endSize);
                } else if (walls[i].position === POSITION.LEFT) {
                    sX = walls[i].startX;
                    sY = walls[i].startY > walls[i].endY ? walls[i].endY : walls[i].startY;
                    w = createBasisLeftWall(sX, sY, basis.depth, walls[i].length, basis.inner3DImageId, basis.outer3DImageId);
                    // createArrow(w, POSITION.LEFT, colorBlack).update();
                    wallsShape.push(w);
                    w.setSizeType(walls[i].startSize, walls[i].endSize);
                } else if (walls[i].position === POSITION.RIGHT) {
                    sX = walls[i].startX;
                    sY = walls[i].startY > walls[i].endY ? walls[i].endY : walls[i].startY;
                    w = createBasisRightWall(sX, sY, basis.depth, walls[i].length, basis.inner3DImageId, basis.outer3DImageId);
                    // createArrow(w, POSITION.RIGHT, colorBlack).update();
                    wallsShape.push(w);
                    w.setSizeType(walls[i].startSize, walls[i].endSize);
                }
            }
            for (let k = 0; k < wallsShape.length; k++) {
                wallsShape[k].next = (k === (wallsShape.length - 1)) ? wallsShape[0] : wallsShape[k + 1];
            }
            for (let k = 0; k < wallsShape.length; k++) {
                wallsShape[k].next.prev = wallsShape[k];
            }
            for (let k = 0; k < wallsShape.length; k++) {
                wallsShape[k].next = wallsShape[k].next.getId();
                wallsShape[k].prev = wallsShape[k].prev.getId();
            }
        }
        basis.price = setting.price;
        basis.settingId = setting.id;
        basis.height = 2500;
        basis.colorButtomLine = setting.colorButtomLine;
        basis.bottomLineHeight = setting.bottomLineHeight;

    } else {
        basis = createRectangle();
    }
    basis.color = baseColor;
    basis.name = 'Basis';
    basis.nameRu = 'Каркас';
    basis.getHeight = () => basis.height;
    basis.getWidth = () => {
        let baseConfigById = getBaseConfigById(basis.settingId);
        return baseConfigById && baseConfigById.height || basis.width;
    };
    basis.getLength = () => {
        let baseConfigById = getBaseConfigById(basis.settingId);
        return baseConfigById && baseConfigById.width || basis.length;
    };
    basis.getPrice = () => {
        let baseConfigById = getBaseConfigById(basis.settingId);
        return baseConfigById && baseConfigById.price || basis.price;
    };
    basis.draw = function (ctx) {
        // drawKarkas2D(ctx, basis.karkasDepth, basis.getX(), basis.getY(), basis.getLength(), basis.getWidth(), basis.color);
        return basis;
    };
    basis.getWalls = () => {
        // createWall(basis)
    };

    createArrow(basis, POSITION.TOP, colorBlack);
    createArrow(basis, POSITION.LEFT, colorBlack);
    return basis;
}