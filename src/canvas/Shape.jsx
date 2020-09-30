import {
    changeOpenDoor,
    mirroringDoor,
    setDeleteAllShapeInArrId,
    turnShape,
    uuidv4
} from "../functions";
import {getShapeMap, getShapes} from "../variable";
import {getScale} from "./Canvas";
import {y3dcefficient} from "../constants";

const emptyAction = () => {
};

export function createShapeByParent(parent) {
    let shape = createShape();
    shape.parentId = parent.getId();
    return shape;
}

export function createShape(x, y, length, width, color, text, notDragable) {
    let shape = {
        id: uuidv4(),
        x: x,
        y: y,
        width: width,
        length: length,
        color: color,
        text: text,
        notDragable: !!notDragable,
        fixed: true,
        name: 'Shape',
        arrowsId: [],
        relatedShapes: [],
        curorStyle: "default"
    };
    shape.getParent = function () {
        return getParent(shape.parentId);
    };
    shape.isHorizontally = () => shape.getLength() > shape.getWidth();
    shape.getX = () => shape.x;
    shape.get3DX = () => shape.x;
    shape.getY = () => shape.y;
    shape.get3DY = () => shape.y * y3dcefficient;
    shape.setX = (x) => {
        shape.x = x
    };
    shape.setY = (y) => {
        shape.y = y;
    };
    shape.getLength = () => shape.length;
    shape.getWidth = () => shape.width;
    shape.setLength = (l) => {
        shape.length = l
    };
    shape.setWidth = (w) => {
        shape.width = w
    };
    shape.draw = (ctx) => {
    };
    shape.getId = () => shape.id;
    shape.onClick = emptyAction;
    shape.confirm = () => {
        shape.fixed = true;
        setDeleteAllShapeInArrId(shape.relatedShapes);
        shape.relatedShapes = [];
    };
    shape.turn = () => turnShape(shape);
    shape.mirroring = () => {
        shape.direction = mirroringDoor(shape.direction)
    };
    shape.changeOpen = () => {
        shape.opening = changeOpenDoor(shape.arrowsId, shape.opening);
    };
    shape.setDeleted = () => {
        getShapes().filter(item => item.parentId === shape.getId()).forEach(item => item.setDeleted());
        setDeleteAllShapeInArrId(shape.relatedShapes);
        setDeleteAllShapeInArrId(shape.arrowsId);
        shape.deleted = true;
    };
    shape.sort = (a, b) => {
        return a.getX() - b.getX();
    };
    shape.getScaledWidth = () => shape.getWidth() / getScale();
    shape.getScaledLength = () => shape.getLength() / getScale();
    getShapeMap().set(shape.id, shape);
    getShapes().push(shape);
    return shape;
}

function getParent(parentId) {
    let parent;
    if (parentId) {
        parent = getShapeMap().get(parentId)
    }
    return parent;
}