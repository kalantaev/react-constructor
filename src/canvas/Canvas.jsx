import React from 'react';
import {API_ROOT, colorWhite, cos41, cos7, fon, IMG_URL, pol, sin41, sin7, vagonka} from "../constants";
import {
    calculateSizeInIntersection,
    confirmAllShapes,
    confirmShapes,
    deserialize,
    getAllShapePoint,
    getArrowShift,
    getBaseConfigById,
    getScaleValue,
    getSelectedShape,
    initTexture,
    isMouseInShapeAccurency100,
    isSerialized,
    parseDataTo3DCreate,
    round,
    selectedShape,
    serialize, sortInner
} from "../functions";
import {
    drawHint,
    isMouseInShape,
    needHideControlButton,
    shapeDraw
} from "../drawFunction";
import Settings, {publicSettings} from "../agent";
import "../css/styles.css";
import {
    getBasis, getKarkasDepth,
    getSelectedShapeId, getShape,
    getShapeMap,
    getShapes, getShapesLength,
    setSelectedShapeId,
    setShapeMap,
    setShapes
} from "../variable";
import {POSITION} from "../enums";
import {
    build,
    draw3d,
    draw3dPartition,
    draw3dRectangle,
    drawFrontImage,
    drawKarkasBottom, drawKarkasFront,
    drawKarkasInner2, drawKarkasLeft,
    drawKarkasRight2, drawLeftImage
} from "../draw3dFunction";

const defScaleValue = 0.1;
let scale = defScaleValue;
let allDraging = false;
const cursorDefault = "default";
const cursorMove = "move";
let mouseY;
let mouseX;

let wheel_handle = null;
let inCanvas;
let ctx;
let canvas;
let accuracy = 0.3;

let isDragging = false;
let view3D = false;
let offsetX, offsetY;
let startX, startY;
let karkas;
let textureOuter = [];
let textureFloor = [];
let textureInner = [];
let showPrice = true;
let imageMap = new Map();

export function getLineWidth() {
    return {lineBase: 1.3 / scale, lineSmall: 0.8 / scale, lineArrow: 0.9 / scale}
}

export function getArrowWidth() {
    return {arrowWidth: 30 , arrowLength: 80, arrowFont: 60 }
}

function drawEmptyCanvas(ctx, canvas, view3D) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colorWhite;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    view3D && ctx.setTransform(scale, 0, 0, scale, -200, 400 );
   !view3D && ctx.scale(scale, scale);
}

function updateCursorStyle() {
    if (allDraging) {
        canvas.style.cursor = cursorMove;
    } else if (selectedShape() && selectedShape().curorStyle && isDragging) {
        canvas.style.cursor = selectedShape().curorStyle;
    } else {
        canvas.style.cursor = cursorDefault;
    }
}

export function setDeffWidthCanvas () {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientWidth / 2;
};

class Canvas extends React.Component {

    canvasFunction = () => ({
        drawAll: this.drawAll,
        mouseX: mouseX,
        mouseY: mouseY,
        isDragging: isDragging,
        scale: scale
    });

    set_handle = (canvas, func) => {
        canvas.onmouseover = function () {
            wheel_handle = func;
        };
        canvas.onmouseout = function () {
            wheel_handle = null;
        }
    };

    handleMouseWheelUp = (v) => {
        let oldScale = scale;
        let shapeToUpdate = getShapes().filter(item => !item.parentId);
        let horizontally = shapeToUpdate.filter(i => i.isHorizontally());
        let vertically = shapeToUpdate.filter(i => !i.isHorizontally());
        let maxHorizontally;
        let maxVertically;
        horizontally.forEach(i => {
            if (!maxHorizontally || i.getLength() > maxHorizontally) {
                maxHorizontally = i.getLength();
            }
        });
        vertically.forEach(i => {
            if (!maxVertically || i.getWidth() > maxVertically) {
                maxVertically = i.getWidth();
            }
        });
        if (inCanvas) {
            let scaleStep = 0.008;
            let firstWidth = canvas.width * scale;
            scale += v * scaleStep;
            let secondWidth = canvas.width * scale;
            let coeffX = canvas.width / 2;
            let coeffY = canvas.height / 2;
            let xPercentPosition = mouseX / (canvas.width);
            let yPercentPosition = mouseY / (canvas.height);
            let shiftX = ((maxHorizontally * oldScale) - (maxHorizontally * scale) / 2) * scale;
            let shiftY = ((maxVertically * oldScale) - (maxVertically * scale) / 2) * scale;
            getShapes().filter(item => !item.parentId)
                .forEach(item => {

                    // item.setX(item.getX() - (1-scale/oldScale) *  (maxHorizontally.getLength() ) * coeffX/canvas.width)
                    // item.setY(item.getY() - (1-scale/oldScale) *  (maxVertically.getWidth()) * coeffY/canvas.height)
                    // item.setX(item.getX() - shiftX * v);
                    // item.setY(item.getY() - shiftY * v);
                });
            reOffset();
            confirmAllShapes(getShapes());
            this.drawAll();
        }
    };




    drawDimetry() {
        let shapes = getShapes();
        // const {drawBasisRight1, drawKarkasInner1, draw3dRoof, draw3dBack, drawKarkasBottom} = build(ctx);
        // let karkasData = shapes.filter(item => item.name === 'Basis').map(parseDataTo3DCreate);
        //
        // karkasData.forEach(item => {
        //     drawKarkasInner1(item);
        //     drawBasisRight1(item);
        //     draw3dRoof(item);
        //     drawKarkasBottom(item);
        //     drawKarkasInner2(item);
        //     drawKarkasRight2(item);
        // });
        //
        // shapes.filter(isSerialized).filter(filterTopDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawFrontImage(item) : draw3dRectangle(item));
        // shapes.filter(isSerialized).filter(filterRightDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawLeftImage(item) : draw3dRectangle(item));
        // shapes.filter(filterTopWindow).map(parseDataTo3DCreate).forEach(drawFrontImage);
        // shapes.filter(filterRightWindow).map(parseDataTo3DCreate).forEach(drawLeftImage);
        // shapes.filter(isSerialized).filter(filterPartition).map(parseDataTo3DCreate)
        //     .sort(sortInner).forEach(draw3dPartition);
        let data ={ctx, scale, cos7, sin41, cos41, sin7};
        shapes.filter(isSerialized)
            .sort(sortInner).forEach(item => {
                item.draw3D && item.draw3D(data)
        });
        // let karkasDepth1 = getKarkasDepth() * defScaleValue / scale;
        // karkasData.forEach(item => {
        //     drawKarkasLeft(item);
        //     drawKarkasFront(item);
        //     draw3dRoof({
        //         x1: item.x1 + karkasDepth1,
        //         x2: item.x2 - karkasDepth1,
        //         x3: item.x3 - karkasDepth1,
        //         x4: item.x4 + karkasDepth1,
        //         y1: item.y1 + karkasDepth1 * 0.8,
        //         y2: item.y2 + karkasDepth1 * 0.8,
        //         y3: item.y3 - karkasDepth1 * 0.9,
        //         y4: item.y4 - karkasDepth1 * 0.9,
        //         h2: item.h2
        //     })
        // });
        // shapes.filter(isSerialized).filter(filterFrontDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawFrontImage(item) : draw3dRectangle(item));
        // shapes.filter(isSerialized).filter(filterLeftDoor).map(parseDataTo3DCreate).forEach(item => item.image ? drawLeftImage(item) : draw3dRectangle(item));
        // shapes.filter(filterFrontWindow).map(parseDataTo3DCreate).forEach(drawFrontImage);
        // shapes.filter(filterLeftWindow).map(parseDataTo3DCreate).forEach(drawLeftImage);
    }

    drawAll = () => {
        drawEmptyCanvas(ctx, canvas, this.props.view3D);
        updateCursorStyle();
        let length = getShapesLength();
        setShapes(getShapes().filter(item => !item.deleted));
        !this.props.view3D && getShapes().forEach(s => shapeDraw(s, ctx));
        if (!this.props.view3D && getShapesLength() !== length) {
            drawEmptyCanvas(ctx, canvas, this.props.view3D);
            getShapes().forEach(s => shapeDraw(s, ctx));
        }

        if (this.props.view3D) {
            this.drawDimetry();
        }
        this.props.afterRender && this.props.afterRender()
    };
    //клик правой клавишей
    rightClick = () => {
        allDraging = true;
    };
    //клик роликом
    rolClick = (e) => {
        canvas.style.cursor = cursorMove;
        allDraging = true;
    };
    handleMouseDown = (e) => {
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // calculate the current mouse position
        startX = parseInt(e.clientX - offsetX) / scale;
        startY = parseInt(e.clientY - offsetY) / scale;
        if (e.which === 3) {
            this.rightClick(e);
            return;
        } else if (e.which === 2) {
            this.rolClick(e);
            return;
        }

        for (let i = 0; i < getShapesLength(); i++) {
            if (getShape(i).name === 'ChangeSizeElement' && isMouseInShape(startX, startY, getShape(i))) {
                getShape(i).onClick && getShapes()[i].onClick(this.canvasFunction());
                if (getShape(i)) {
                    setSelectedShapeId(getShape(i).getId());
                    isDragging = true;
                    return;
                }
            }
        }
        for (var i = 0; i < getShapesLength(); i++) {
            if (!getShape(i).notDragable && getShape(i).name !== 'ChangeSizeElement' && isMouseInShapeAccurency100(startX, startY, getShape(i))) {
                getShape(i).onClick && getShape(i).onClick(this.canvasFunction());
                if (getShape(i)) {
                    setSelectedShapeId(getShape(i).getId());
                    isDragging = true;
                    getShapes().filter(item => !item.relatedShapes || item.relatedShapes.indexOf(getSelectedShapeId()) === -1).forEach(confirmShapes);
                    getShape(i).fixed = false;
                }
                return;
            }
        }
    };
    handleMouseMove = (e) => {
        //текущие координаты мыши
        inCanvas = true;
        setMouseX(parseInt(e.clientX - offsetX) / scale);
        setMouseY(parseInt(e.clientY - offsetY) / scale);
        let has = false;// мышка находится на элементе с подсказкой
        for (var i = 0; i < getShapesLength(); i++) {
            if (!isDragging && isMouseInShape(getMouseX(), getMouseY(), getShape(i))) {
                //если курсор находится над фигурой, необходимо отрисовать кнопки
                getShape(i).fixed = false;
            } else {
                //если курсор отвели от фигуры спрятать кнопки управления
                !isDragging && needHideControlButton(getMouseX(), getMouseY(), getShape(i)) && getShape(i).confirm && getShape(i).confirm();
            }
            //проверка и отрисовка подсказок
            if (isMouseInShapeAccurency100(getMouseX(), getMouseY(), getShape(i)) && getShape(i).hint) {
                has = true;
                this.drawAll();
                canvas.style.cursor = "pointer";
                getShape(i) && drawHint(ctx, getMouseX(), getMouseY(), getShape(i).hint)
            }
        }
        if (!has) {
            //скрываем подсказки
            canvas.style.cursor = "default";
            this.drawAll();
        }

        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // calculate the current mouse position

        // how far has the mouse dragged from its previous mousemove position?
        var dx = getMouseX() - startX;
        var dy = getMouseY() - startY;

        if (allDraging) {
            let rootElements = getShapes().filter(item => item.parentId == null);
            rootElements.forEach(item => {
                item.setX(item.getX() + dx);
                item.setY(item.getY() + dy);
            });

            this.drawAll();
            startX = getMouseX();
            startY = getMouseY();
            return;
        }

        if (!isDragging) {
            return;
        }

        // move the selected shape by the drag distance
        var selected = selectedShape();
        // let magnetShapeXValue = magnetShapeX(selected);
        if (selected) {
            if (!!selected.resizeShape) {
                selected.resizeShape((/*magnetShapeXValue ? magnetShapeXValue :*/ dx), dy)
            } else {
                selected.setX(selected.getX() + (/*magnetShapeXValue ? magnetShapeXValue :*/ dx));
                selected.setY(selected.getY() + dy);
            }
        }
        // clear the canvas and redraw all shapes
        this.drawAll();

        // update the starting drag position (== the current mouse position)
        // if (!magnetShapeXValue) {
        startX = getMouseX();
        // }
        startY = getMouseY();
    };
    updateIntersection = () => {
        let selected = selectedShape();
        if (selected) {
            if (selected.name === 'ChangeSizeElement' || selected.name === 'DragElement' || selected.name === 'TurnButton') {
                selected = selected.getParent();
            }
            if (selected.name === 'Partition') {
                let data1 = getAllShapePoint(selected);
                let intersectionShape = getShapes().filter(i => {
                    if (i.id === selected.id || i.name !== 'Partition') {
                        return false
                    } else {
                        let data2 = getAllShapePoint(i);
                        return data1.x1 < data2.x2 && data1.x2 > data2.x1 && data1.y4 > data2.y1 && data1.y1 < data2.y4 ||
                            (data1.x1 > data2.x1 && data1.x2 < data2.x2 && data1.y1 < data2.y1 && data1.y4 > data2.y4)
                    }
                })[0];
                if (intersectionShape) {
                    let data2 = getAllShapePoint(intersectionShape);
                    if (selected.getLength() > selected.getWidth()) {
                        calculateSizeInIntersection(data2, data1, selected, intersectionShape, true);
                    } else {
                        calculateSizeInIntersection(data1, data2, intersectionShape, selected, false);
                    }
                }
            }
        }
    };
    magnetShapeX = (shape) => {
        let accuracyWithScale = getScaleValue(accuracy);
        let result = 0;
        // getShapes().filter(item => item.getId() !== shape.getId() && item.name !== 'Arrow')
        //     .filter(item => item.baseName !== 'Btn')
        //     .filter(item => !(item.name === 'Arrow'))
        //     .filter(item => shape.getId() !== item.parentId)
        //     .filter(item => item.getId() !== karkas.getId())
        //     .forEach(item => {
        //         if (shape.baseName === 'Btn') {
        //             shape = shape.getParent()
        //         }
        //         var sLeft = shape.getX();
        //         var sRight = shape.getX() + shape.getLength() / getScale();
        //         var sTop = shape.getY();
        //         var sBott = shape.getY() + shape.getWidth() / getScale();
        //
        //         var iLeft = item.getX();
        //         var iRight = item.getX() + item.getLength() / getScale();
        //         var iTop = item.getY();
        //         var iBott = item.getY() + item.getWidth() / getScale();
        //         // math test to see if mouse is inside rectangle
        //         if (sRight + accuracyWithScale > iLeft && sRight < iLeft + accuracyWithScale) {
        //             result = iLeft - sRight;
        //         } else if (sRight + accuracyWithScale > iRight && sRight < iRight + accuracyWithScale) {
        //             result = iRight - sRight;
        //         }
        //     });

        return Number(round(result, 5));
    };
    handleMouseUp = (e) => {
        inCanvas = true;
        allDraging = false;
        canvas.style.cursor = "default";
        // return if we're not dragging
        if (!isDragging) {
            return;
        }
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        this.updateIntersection();

        var selected = selectedShape();
        if (selected) {
            let magnetShapeXValue = this.magnetShapeX(selected);
            let isArrow = selected.getParent && selected.getParent() && selected.getParent().name === 'Arrow';
            if (magnetShapeXValue && !isArrow) {
                if (selected.resizeShape) {
                    selected.resizeShape(magnetShapeXValue, selected.getY())
                } else {
                    selected.setX(selected.getX() + magnetShapeXValue);
                    selected.setY(selected.getY());
                }
            }
        }

        // the drag is over -- clear the isDragging flag
        isDragging = false;

        this.drawAll();
        serialize(getShapes());
    };

    renderCanvas(canvas, ctx) {
        scale = defScaleValue;
        setDeffWidthCanvas(canvas);
        if (canvas.addEventListener) canvas.addEventListener("DOMMouseScroll", this.mouse_wheel, false);
        canvas.onmousewheel = document.onmousewheel = this.mouse_wheel;
        this.set_handle(canvas, this.handleMouseWheelUp);

        reOffset();
        window.onscroll = function (e) {
            e.preventDefault();
            e.stopPropagation();
            reOffset();
        };
        window.onresize = function (e) {
            reOffset();
        };
        canvas.onresize = function (e) {
            reOffset();
        };
        canvas.onmousedown = this.handleMouseDown;
        canvas.onmousemove = this.handleMouseMove;
        canvas.touchmove = this.handleMouseMove;
        window.onmouseup = this.handleMouseUp;
//         canvas.onmouseout = handleMouseOut;
//         canvas.onmouseWheelUp = handleMouseWheelUp;
//         canvas.touchstart = handleMouseDown;
        canvas.touchend = this.handleMouseUp;


// двойной клик
        canvas.addEventListener('dblclick', function (e) {
            e.preventDefault();
            e.stopPropagation();
            startX = parseInt(e.clientX - offsetX);
            startY = parseInt(e.clientY - offsetY);
            for (var i = 0; i < getShapesLength(); i++) {
                let shape = getShape(i);
                if (isMouseInShape(startX, startY, shape)) {
                    shape.doubleClick && shape.doubleClick();
                    this.drawAll()
                }
            }
        });

        this.props.beforeInit && this.props.beforeInit();
        this.changePositionAndScale();
        this.drawAll();
        reOffset();
    }

    deserialize = () => {
        let {k, m, s} = deserialize(imageMap);
        karkas = k;
        setShapeMap(m);
        setShapes(s);
        this.drawAll();
    };
    mouse_wheel = (event) => {
        if (false === !!event) event = window.event;
        setMouseX(parseInt(event.clientX - offsetX));
        setMouseY(parseInt(event.clientY - offsetY));
        let direction = ((event.wheelDelta) ? event.wheelDelta / 120 : event.detail / -3) || false;
        if (direction && !!wheel_handle && typeof wheel_handle == "function") {
            wheel_handle(direction);
        }
        event.preventDefault();
        event.stopPropagation();
    };


    changePositionAndScale = (needDraw) => {
        if (this.props.view3D) {
            // let length3D = karkas.getLength() * cos7 + sin41 * karkas.getWidth() * y3dcefficient;
            // let width3D = karkas.getWidth() * cos41 * y3dcefficient + sin7 * karkas.getLength() + getHeightPosition(karkas);
            // let scale3DLenght = length3D * 1.2 / canvas.width;
            // let scale3Dwidth = width3D * 1.2 / canvas.height;
            // scale = scale3DLenght > scale3Dwidth ? scale3DLenght : scale3Dwidth;
            // let scaled3Dlength = length3D / scale;
            // let scaled3DWidth = width3D / scale;
            // let y3DTop = (canvas.height - scaled3DWidth) / 2;
            // let x3DLeft = ((canvas.width - scaled3Dlength) / 3);
            // karkas.setX(((cos7 * x3DLeft / sin41) - (sin7 * karkas.getLength() / scale) - y3DTop - getHeightPosition(karkas) / scale) / coeff3DX);
            // karkas.setY((y3DTop + (sin7 * x3DLeft / cos7) + (sin7 * karkas.getLength() / scale) + getHeightPosition(karkas) / scale) / coeff3DY);
        } else {
            let shapeToUpdate = getShapes().filter(item => !item.parentId);
            let horizontally = shapeToUpdate.filter(i => i.isHorizontally());
            let vertically = shapeToUpdate.filter(i => !i.isHorizontally());
            let maxHorizontally = 0;
            let maxVertically = 0;
            horizontally.forEach(i => {
                if (i.getLength() > maxHorizontally) {
                    maxHorizontally = i.getLength();
                }
            });
            vertically.forEach(i => {
                if (i.getWidth() > maxVertically) {
                    maxVertically = i.getWidth();
                }
            });

            let is24x24 = maxHorizontally === 2400 && maxVertically === 2400;//todo
            let calculatedScale1 = ((canvas.width * 0.8) / (maxHorizontally + 400));
            let calculatedScale2 = ((canvas.height * 0.8) / (maxVertically + 400));
            scale = calculatedScale2 <= calculatedScale1 ? calculatedScale2 : calculatedScale1;

            let shiftX = (canvas.width / scale - maxHorizontally) / 2;
            let shiftY = (canvas.height / scale - maxVertically) / 2;
            shapeToUpdate.forEach(item => {
                item.setX(item.getX() + shiftX);
                item.setY(item.getY() + shiftY);
            })


        }
        needDraw && this.drawAll();
        // let elementById = document.getElementById('scale-span');
        // elementById.innerText = Math.round(scale * 100) / 100;
    };

    componentDidMount() {
        canvas = document.getElementById('canvas-el');
        ctx = canvas.getContext("2d");
        this.renderCanvas(canvas, ctx);
    }

    render() {
        return <div className={'align-center'}>
            <canvas id={"canvas-el"} width={window.innerWidth * 0.55} height={window.innerWidth * 0.30}/>
        </div>
    }
}


export function getMouseY() {
    return mouseY;
}

export function getIsDragging() {
    return isDragging;
}

function setMouseY(newValue) {
    mouseY = newValue;
}

export function getMouseX() {
    return mouseX;
}

function setMouseX(newValue) {
    mouseX = newValue;
}

export function getScale() {
    return /*scale*/ 1;
}
export function getScale1() {
    return scale ;
}

function setScale(newValue) {
    scale = newValue;
}

export function reOffset() {
    var BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
}

export default Canvas;
