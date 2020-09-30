import {createShapeByParent} from "../canvas/Shape";
import {getScale} from "../canvas/Canvas";

export function createRelatedShape(parent, _shiftX, _shiftY) {
    let relatedShape = createShapeByParent(parent);
    relatedShape._shiftX = _shiftX;
    relatedShape._shiftY = _shiftY;
    relatedShape.baseName = 'Btn';

    relatedShape.getShiftX = () => relatedShape._shiftX;
    relatedShape.setShiftX = (value) => {
        relatedShape._shiftX = value;
    };
    relatedShape.getShiftY = () => relatedShape._shiftY;
    relatedShape.setShiftY = (value) => {
        relatedShape._shiftY = value;
    };
    relatedShape.getX = () => {
        let parent = relatedShape.getParent();
        if (parent) {
            let length = parent.getLength() / getScale();
            return parent.getX() + length / 2 + relatedShape.getShiftX();
        }
    };
    relatedShape.getY = () => {
        let parent = relatedShape.getParent();
        if (parent) {
            let width = parent.getWidth() / getScale();
            return parent.getY() + width / 2 + relatedShape.getShiftY()
        }
    };
    parent.relatedShapes.push(relatedShape.getId());
    return relatedShape;
}

export function getYRelatedShape(btn) {
    let parent = btn.getParent();
    if (parent) {
        return parent.getY() + btn.getShiftY()
    }
}


