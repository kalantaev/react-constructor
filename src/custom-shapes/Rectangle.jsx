import {createShape} from "../canvas/Shape";
import {getShapes} from "../variable";

export function createRectangle(x, y, length, width, color, notDragable, price) {
    let rect = createShape(x, y, length, width, color, undefined, !!notDragable);
    rect.name  = 'Rectangle';
    rect.doorId = [];
    rect.price = price;
    rect.getDoorsIfExist = () => {
        let doors = [];
        if (rect.doorId.length > 0) {
            doors = getShapes().filter(item => rect.doorId.indexOf(item.getId()) !== -1);
        }
        return doors;
    };

    return rect;
}