import {DIRECTION, OPENING_TYPE, POSITION} from "./enums";
import {API_ROOT, defScaleValue, IMG_URL, y3dcefficient} from "./constants";
import {createBasis} from "./custom-shapes/Basis";
import {createInnerDoor} from "./custom-shapes/InnerDoor";
import {createLight} from "./custom-shapes/Light";
import {createSocket} from "./custom-shapes/Socket";
import {getKarkasDepth, getSelectedShapeId, getShapeMap, getShapes} from "./variable";
import {createDoor} from "./custom-shapes/Door";
import {createWindow} from "./custom-shapes/Window";
import {createWall} from "./custom-shapes/Wall";
import {createArrow} from "./custom-shapes/Arrow";
import {createPlumbing} from "./custom-shapes/Plumping";
import {createLine} from "./custom-shapes/Line";
import {getScale} from "./canvas/Canvas";


export function confirmAllShapes(shapes) {
    shapes.forEach(confirmShapes);
}

export function confirmShapes(shape) {
    shape.confirm && shape.confirm()
}

export function getSelectedShape(shapes, selectedShapeId) {
    return shapes.filter(item => item.getId() === selectedShapeId)[0];
}

export function selectedShape() {
    let selectedShapeId = getSelectedShapeId();
    return getShapes().filter(item => item.getId() === selectedShapeId)[0];
}


export function getBaseConfigById(id) {
    let baseConfig = [];
    return baseConfig.filter(i => i.id === id)[0];
}

export function generateIdAndPushToShape(shape) {
    shape.id = uuidv4();
    // shapesMap.set(shape.id, shape);
    // shapes.push(shape)
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function isMouseInShapeAccurency100(mx, my, shape) {
    var rLeft = shape.getX();
    var rRight = shape.getX() + shape.getLength() / (isSerialized(shape) ? getScale() : 1);
    var rTop = shape.getY();
    var rBott = shape.getY() + shape.getWidth() / (isSerialized(shape) ? getScale() : 1);

    if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
        return true;
    }

    return false;
}

export function parseDataTo3DCreate(shape) {
    let heightPosition = getHeightPosition(shape);
    return {
        name: shape.name,
        x: shape.getX(),
        y: shape.getY(),
        x1: shape.get3DX(),
        y1: shape.get3DY(),
        x2: shape.get3DX() + shape.getLength(),
        y2: shape.get3DY(),
        x3: shape.get3DX() + shape.getLength() ,
        y3: shape.get3DY() + shape.getWidth() * y3dcefficient,
        x4: shape.get3DX(),
        y4: shape.get3DY() + shape.getWidth() * y3dcefficient,
        w: shape.getLength(),
        h: shape.getWidth(),
        hh: shape.height,
        h1: (heightPosition - shape.height) ,
        h2: heightPosition,
        color: (shape.name === "Window") ?
            'rgba(0,12,255,0)' :
            (shape.name === 'Door' || shape.name === 'InnerDoor') ?
                'rgb(178,88,0)' :
                (shape.name === 'Wall') ?
                    'rgb(205,128,0)' : 'rgba(0, 0, 0, 0)',
        colorBottomLine: shape.colorButtomLine,
        bottomLineHeight: shape.bottomLineHeight,
        colorLine: /*'rgb(178,88,0)'*/ undefined,
        lineHeight: undefined /*shape.bottomLineHeight*/,
        gorizontal: shape.isHorizontally(),
        image: shape.image3D,
        shape: shape

    }
}

export function getHeightPosition(shape) {
    return shape.heightPosition || 2500;
};

// export function getDoorSettingValue(id, field) {
//     return getSettingValue(doorsEl, field, id)
// };
//
// export function getWindowsSettingValue(id, field) {
//     return getSettingValue(windowsEl, field, id)
// };

// export function getSettingValue(data, field, id) {
//     let filter = (data && field && id) ? data.filter(i => i.id === id) : [];
//     if (filter.length > 0) {
//         return filter[0][field];
//     }
//     return null;
// };

export function filterTopDoor(item) {
    return item.name === 'Door' && (item.position === POSITION.TOP)
}

export function filterRightDoor(item) {
    return item.name === 'Door' && (item.position === POSITION.RIGHT)
}

export function filterTopWindow(item) {
    return filterByNameAndPosition(item, 'Window', POSITION.TOP);
}

export function filterPartition(item) {
    return item.name === 'Partition'
}

export function filterFrontDoor(item) {
    return item.name === 'Door' && (item.position === POSITION.BOTTOM)
}

export function filterLeftDoor(item) {
    return item.name === 'Door' && (item.position === POSITION.LEFT)
}

export function filterFrontWindow(item) {
    return item.name === 'Window' && (item.position === POSITION.BOTTOM)
}

export function filterLeftWindow(item) {
    return item.name === 'Window' && (item.position === POSITION.LEFT)
}

export function sortInner(a, b) {
    if ((a.getX() > b.getX()) && ((a.getX() + a.getLength()) > (b.getX() + b.getLength())) && (a.getY() < b.getY()) && ((a.getY() + a.getWidth()) < (b.getY() + b.getWidth()))) {
        return -1;
    }
    if ((a.getX() < b.getX()) && ((a.getX() + a.getLength()) < (b.getX() + b.getLength())) && (a.getY() > b.getY()) && ((a.getY() + a.getWidth()) > (b.getY() + b.getWidth()))) {
        return 1;
    }
    if ((a.getX() < b.getX()) && ((a.getX() + a.getLength()) < (b.getX())) && (a.getY() < b.getY()) && ((a.getY() + a.getWidth()) < (b.getY() + b.getWidth()))) {
        return 1;
    }
    if ((a.getX() > (b.getX() + b.getLength())) && (a.getY() > (b.getY() + b.getWidth()))) {
        return 1;
    }
    if ((a.getX() === b.getX()) && ((a.getX() + a.getLength()) === (b.getX() + b.getLength()))) {
        return a.getY() - b.getY();
    }
    if ((a.getY() === b.getY()) && ((a.getY() + a.getWidth()) === (b.getY() + b.getWidth()))) {
        return b.getX() - a.getX();
    }
    if ((a.getX() > b.getX()) && ((a.getX() + b.getLength()) < (b.getX() + b.getLength()))) {
        return (a.getY() + a.getWidth()) - b.getY();
    }
    if (((a.getY() + a.getWidth()) < ((b.getY() + b.getWidth())) && (a.getY() > b.getY()))) {
        return b.getX() - a.getX()
    }
    if ((a.getY() < b.getY()) && ((a.getY() + a.getWidth()) > (b.getY() + b.getWidth()))) {
        return b.getX() - a.getX()
    }
    if ((a.getWidth() === 50) && (b.getWidth() === 50)) {
        return a.getY() - b.getY()
    }
    if ((a.getLength() === 50) && (b.getLength() === 50)) {
        return b.getX() - a.getX()
    }
    if (((a.getX() > b.getX()) || (a.getX() === b.getX())) && ((a.getX() + a.getLength()) < (b.getX() + b.getLength()))) {
        return a.getY() - b.getY()
    }
    if (((a.getX() < b.getX()) || (a.getX() === b.getX())) && ((a.getX() + a.getLength()) > (b.getX() + b.getLength()))) {
        return a.getY() - b.getY()
    }
    if ((a.getX() < b.getX()) && ((a.getX() + a.getLength()) < (b.getX()) || (a.getX() + a.getLength()) === (b.getX()))) {
        return -1
    }
    // console.info('не обработанный приоритет ', a, b);
    return a.getY() - b.getY()
}

export function filterRightWindow(item) {
    return filterByNameAndPosition(item, 'Window', POSITION.RIGHT);
}

function filterByNameAndPosition(item, name, position) {
    return item.name === name && (item.position === position)
}


export function isSerialized(shape) {
    let notSerialised = ['DragElement', 'ChangeSizeElement', 'ChangeOpenTypeButton', 'AddInnerDoorButton', 'MirrorButton', 'DeleteButton', 'ShowAddArrowButton', 'EditButton', 'ConfirmButton', 'TurnButton'];
    return notSerialised.indexOf(shape.name) === -1
}

export function calculateShift(x, parent, shift) {
    shift = shift || ((x - parent.getX()) / (parent.getScaledLength())) * 100;
    if (getShapes().filter(filterBottomWindow).filter(item => Math.abs(item.shift - shift) < 5).length > 0) {
        shift = calculateShift(x, parent, shift > 80 ? 1 : shift + 13.5)
    }
    return shift;
}

export function filterBottomWindow(item) {
    return item.name === 'Window' && (item.position === POSITION.BOTTOM)
}

export function initTexture(texturesIn, type, img, isNew, karkas) {
    let textures = texturesIn ? texturesIn.map(i => ({
        ...i,
        element: {...i.element, def: i.def, price: i.price}
    })).filter(i => i.elementType === type).map(i => i.element) : [];
    if (textures.length !== 0) {
        let filter = textures.filter(i => i.def);
        if (filter.length === 0) {
            filter = textures;
        }
        karkas[type] = !karkas[type] ? filter[0] : karkas[type];
        isNew && (img.src = API_ROOT + IMG_URL(filter[0].imageSelect));
    }
    return textures;
};

export function deserialize(imageMap) {
    let i = 0;
    let newShape = [];
    let basis;
    if (sessionStorage.getItem('shapes') !== 'undefined' && sessionStorage.getItem('shapes') !== null) {
        let arr = JSON.parse(sessionStorage.getItem('shapes'));
        arr.forEach(obj => {
            switch (obj.name) {
                case 'Karkas':
                    basis = {...createBasis(100, 70, ...obj)};
                    this.initTextures(getBaseConfigById(obj.settingId));
                    newShape.push(basis);
                    break;
                case 'Door':
                    newShape.push({...createDoor(), ...obj});
                    break;
                case 'Window':
                    newShape.push({...createWindow(), ...obj});
                    break;
                case 'Partition':
                    newShape.push({...createWall(), ...obj});
                    break;
                case 'Arrow':
                    newShape.push({...createArrow(), ...obj});
                    break;
                case 'InnerDoor':
                    newShape.push({...createInnerDoor(), ...obj});
                    break;
                case 'Light':
                    newShape.push({...createLight(), ...obj});
                    break;
                case 'Socket':
                    newShape.push({...createSocket(), ...obj});
                    break;
                case 'Plumping':
                    newShape.push({...createPlumbing(), ...obj});
                    break;
            }
        })
    }
    let shapesMap = new Map();
    newShape.forEach(item => {
        shapesMap.set(item.getId(), item);
    });
    return {k: basis, m: shapesMap, s: newShape}
}

export function getAllShapePoint(shape) {
    return {
        x1: shape.getX(),
        y1: shape.getY(),
        x2: shape.getX() + shape.getLength() / getScale(),
        y2: shape.getY(),
        x3: shape.getX() + shape.getLength() / getScale(),
        y3: shape.getY() + shape.getWidth() / getScale(),
        x4: shape.getX(),
        y4: shape.getY() + shape.getWidth() / getScale()
    }
}


export function calculateSizeInIntersection(data1, data2, shape1, shape2, gorizontal) {
    let expectAll = false;
    let w1 = data1.x1 - data2.x1;
    let w2 = data2.x2 - data1.x2;
    let w3 = data2.y1 - data1.y1;
    let w4 = data1.y4 - data2.y4;
    if (expectAll) {
        if (w1 < w2 && w1 < w3 && w1 < w4) {
            shape1.length = w2 * getScale();
            shape1.setX(data1.x2)
        } else if (w2 < w1 && w2 < w3 && w2 < w4) {
            shape1.length = w1 * getScale();
        } else if (w3 < w1 && w3 < w2 && w3 < w4) {
            shape2.width = w4 * getScale();
            shape2.setY(data2.y3);
        } else if (w4 < w1 && w4 < w2 && w4 < w3) {
            shape2.width = w3 * getScale();
        }
    } else {
        if (gorizontal) {
            if (w1 < w2) {
                shape1.length = w2 * getScale();
                shape1.setX(data1.x2)
            } else {
                shape1.length = w1 * getScale();
            }
        } else {
            if (w3 < w4) {
                shape2.width = w4 * getScale();
                shape2.setY(data2.y3);
            } else {
                shape2.width = w3 * getScale();
            }
        }
    }
};

export function round(number, digit = 0) {
    if (number) {
        return Number(number).toFixed(digit);
    }
    return 0;
}

export function serialize() {
    sessionStorage.clear();
    setToSession(getShapes().filter(isSerialized).map(clearControlButton));
}

function clearControlButton(shape) {
    return {...shape, relatedShapes: [], fixed: true}
}

function setToSession(item) {
    sessionStorage.setItem('shapes', JSON.stringify(item))
}

export function getScaleValue(value) {
    let calcValue = value * defScaleValue / getScale();
    return (calcValue > value) ? value : calcValue;
}

export function setDeleteAllShapeInArrId(arr) {
    arr && arr.forEach(setDeleteByShapeId);
}

export function setDeleteByShapeId(id) {
    getShapeById(id).deleted = true;
}

export function getShapeById(id) {
    return getShapeMap().get(id);
}

export function getArrowShift(parent, type) {
    if (parent && parent.name === 'Karkas') {
        return getShapes().filter(item => (item.name === 'Window' ||
            item.name === 'Door') && item.position === type).length > 0 ?
            [400, 80, 75, 85] : [200, 50, 45, 55]
    } else {
        return [200, 50, 45, 55]
    }
};

export function filterBottomDoor(item) {
    return item.name === 'Door' && (item.position === POSITION.BOTTOM)
}

export function getLengthInDoor(position, depth, length) {
    switch (position) {
        case POSITION.BOTTOM:
        case POSITION.TOP:
            return length;
        case POSITION.LEFT:
        case POSITION.RIGHT:
            return depth;
    }
    return length;
};

export function prepareSizeText(initText, arrowLine) {
    let text = !!initText ? initText : arrowLine.getLengthString();
    text = text + '';
    if (text.indexOf('мм') === -1) {
        text = text + " мм"
    }
    return text;
};

export function _getTextPositionY2(type, y) {
    switch (type) {
        case POSITION.TOP:
            return y - getScaleValue(5);
        case POSITION.BOTTOM:
            return y - getScaleValue(5);
        default:
            return y;
    }
};

export function createFirstLine(x, y, arrowType, arrow60, sX, sY) {
    return createLine(x, y,
        ((arrowType === POSITION.TOP || arrowType === POSITION.BOTTOM) ? x : (x + (arrowType === POSITION.LEFT ? (-arrow60) : arrow60))) + sX,
        ((arrowType === POSITION.LEFT || arrowType === POSITION.RIGHT) ? y : (y + (arrowType === POSITION.TOP ? (-arrow60) : (arrow60)))) + sY)
};


export function createSecondLine(x, y, x2, y2, arrowType, arrow60, sX, sY) {
    return createLine((arrowType === POSITION.TOP || arrowType === POSITION.BOTTOM) ? x2 : x,
        (arrowType === POSITION.TOP || arrowType === POSITION.BOTTOM) ? y : y2,
        ((arrowType === POSITION.TOP || arrowType === POSITION.BOTTOM) ? x2 : (x + (arrowType === POSITION.LEFT ? (-arrow60) : arrow60))) + sX,
        ((arrowType === POSITION.LEFT || arrowType === POSITION.RIGHT) ? y2 : (y + (arrowType === POSITION.TOP ? (-arrow60) : (arrow60)))) + sY)
};

export function createArrowLine(firstLine, secondLine) {
    let l1 = Math.abs(firstLine.startX - firstLine.endX);
    let l2 = Math.abs(firstLine.startY - firstLine.endY);
    let coeffX = l1 !== 0 ? 30 : 0;
    let coeffY = l2 !== 0 ? 30 : 0;
    if (l1 !== 0) {
        coeffX = (30 * (l1)) / (firstLine.getLength());
    }
    if (l2 !== 0) {
        coeffY = (30 * (l2)) / (firstLine.getLength());
    }
    if (firstLine.startX - firstLine.endX < 0) {
        coeffX *= -1;
    }
    if (firstLine.startY - firstLine.endY < 0) {
        coeffY *= -1;
    }
    //линия размера со стрелками
    return createLine(firstLine.endX + coeffX,
        firstLine.endY + coeffY,
        secondLine.endX + coeffX,
        secondLine.endY + coeffY);
};

export function getXInShapeOnKarkas(shift, position, karkas) {
    let parent = karkas;
    if (parent) {
        let parentLength = parent.getLength() / getScale();
        let parentWidth = parent.getWidth() / getScale();
        let parentX = parent.getX();
        switch (position) {
            case POSITION.TOP:
            case POSITION.BOTTOM:
                return (shift / 100) * parentLength + parentX;
            case POSITION.RIGHT:
                return parentX + parentLength - (getKarkasDepth() * defScaleValue / getScale());
            case POSITION.LEFT:
                return parentX;
        }
    }
};

export function getYInShapeOnKarkas(shift, position, parent) {
    if (parent) {
        let parentLength = parent.getLength();
        let parentWidth = parent.getWidth();
        let parentY = parent.getY();
        switch (position) {
            case POSITION.TOP:
                return parentY;
            case POSITION.BOTTOM:
                return parentY + parentWidth - (getKarkasDepth() * defScaleValue);
            case POSITION.RIGHT:
            case POSITION.LEFT:
                return (shift / 100) * parentWidth + parentY;
        }
    }
};

export function mirroringDoor(direction) {
    switch (direction) {
        case DIRECTION.LEFT:
            return DIRECTION.RIGHT;
        case DIRECTION.RIGHT:
            return DIRECTION.LEFT;
    }
}


export function changeOpenDoor(arrowsId, opening) {
    let arrow = getShapeById(arrowsId[0]);
    arrow && (arrow.shiftX = 0);
    arrow && (arrow.shiftY = 0);
    switch (opening) {
        case OPENING_TYPE.IN:
            if (arrow) {
                switch (arrow.type) {
                    case "BOTTOM":
                        arrow.type = POSITION.TOP;
                        break;
                    case "TOP":
                        arrow.type = POSITION.BOTTOM;
                        break;
                    case POSITION.LEFT:
                        arrow.type = POSITION.RIGHT;
                        break;
                    case POSITION.RIGHT:
                        arrow.type = POSITION.LEFT;
                        break;
                }
            }
            return OPENING_TYPE.OUT;
        case OPENING_TYPE.OUT:
            if (arrow) {
                switch (arrow.type) {
                    case "BOTTOM":
                        arrow.type = POSITION.TOP;
                        break;
                    case "TOP":
                        arrow.type = POSITION.BOTTOM;
                        break;
                    case POSITION.LEFT:
                        arrow.type = POSITION.RIGHT;
                        break;
                    case POSITION.RIGHT:
                        arrow.type = POSITION.LEFT;
                        break;
                }
            }
            return OPENING_TYPE.IN;
    }
};

export function turnShape(shape) {
    let scale = getScale();
    let y = shape.getY();
    let x = shape.getX();
    let w = shape.getLength();
    let h = shape.getWidth();

    let width = shape.getLength();
    shape.setLength(shape.getWidth());
    shape.setWidth(width);

    if (w > h) {
        shape.setX(x + (w / 2 / scale) - (h / 2 / scale));
        shape.setY(y - (w / 2 / scale));

    } else {
        shape.setX(x - (h / 2 / scale) - (w / 2 / scale));
        shape.setY(y + (h / 2 / scale));
    }

    let arrow = getShapeById(shape.arrowsId[0]);
    if (arrow) {
        arrow.shiftX = 0;
        arrow.shiftY = 0;
        if (arrow.type === POSITION.TOP) {
            arrow.type = POSITION.RIGHT
        } else if (arrow.type === POSITION.BOTTOM) {
            arrow.type = POSITION.LEFT
        } else if (arrow.type === POSITION.LEFT) {
            arrow.type = POSITION.TOP
        } else {
            arrow.type = POSITION.BOTTOM
        }
    }
};

export function isRelatedShape(shape) {
    return ['TurnButton'].indexOf(shape.name) > -1
}

