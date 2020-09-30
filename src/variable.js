import {defScaleValue} from "./constants";

let shapesMap = new Map();
let imageMap = new Map();
let shapes = [];
let karkasDepth = 70 / defScaleValue;
let isDragging = false;
let selectedShapeId;


export function clear() {
    shapesMap = new Map();
    shapes = [];
}

export function getSelectedShapeId() {
    return selectedShapeId;
}

export function setSelectedShapeId(newValue) {
    selectedShapeId = newValue;
}

export function setIsDragging(newValue) {
    isDragging = newValue;
}

export function getShapeMap() {
    return shapesMap;
}
export function setShapeMap(newValue) {
    shapesMap = newValue;
}

export function getImageMap() {
    return imageMap;
}
export function setImageMap(newValue) {
    imageMap = newValue;
}

export function getShapeById(id) {
   return  shapes.filter(item => item.getId() === id)[0]
}

export function getImageFromMap(id) {
   return imageMap.get(id) ;
}
export function addImageToMap(id, value) {
   return imageMap.set(id, value) ;
}

export function getShapes() {
    return shapes;
}

export function getBasis() {
    return shapes.filter(item => item.name === 'Basis')[0]
}

export function getShapesLength() {
    return shapes.length;
}
export function getShape(index) {
    return shapes[index];
}
export function setShapes(newValue) {
    shapes = newValue;
}
export function addShapes(newValue) {
    shapes.push(newValue);
}

export function getKarkasDepth() {
    return karkasDepth;
}
export function setKarkasDepth(newValue) {
    karkasDepth = newValue;
}