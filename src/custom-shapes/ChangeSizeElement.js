import {createRelatedShape} from "./RelatedShape";
import {getScaleValue} from "../functions";

import {colorBlack} from "../constants";
import {getIsDragging, getScale} from "../canvas/Canvas";
import {getBasis, getSelectedShapeId, getShapes} from "../variable";

export function createChangeSizeBtn(shape, isFirst) {
    let btn = createRelatedShape(shape);
    btn.isFirst= isFirst;
    btn.name = 'ChangeSizeElement';
    btn.getX = () => {
        let parent = btn.getParent();
        if (parent) {
            return btn.isFirst ?
                parent.isHorizontally() ?
                    parent.getX() - parent.getWidth() / 2 / getScale() - getScaleValue(3) : parent.getX() - getScaleValue(3)
                :
                parent.isHorizontally() ?
                    parent.getX() + parent.getLength() / getScale() - parent.getWidth() / 2 / getScale() - getScaleValue(3) :
                    parent.getX() + parent.getLength() / 2 / getScale() - getScaleValue(6)
        }
    };
    btn.getY = () => {
        let parent = btn.getParent();
        if (parent) {
            return btn.isFirst ?
                parent.getLength() > parent.getWidth() ?
                    parent.getY() - getScaleValue(3) : parent.getY() - getScaleValue(3) - parent.getLength() / 2 / getScale()
                :
                parent.getLength() > parent.getWidth() ?
                    parent.getY() - getScaleValue(3) : parent.getY() + parent.getWidth() / getScale() - getScaleValue(6)
        }
    };
    btn.getLength= ()=> btn.getWidth();
    btn.getWidth =() => {
        let parent = btn.getParent();
        if (parent) {
            return (parent.getLength() > parent.getWidth() ?
                (parent.getWidth()) : (parent.getLength())) * 2
        }
    };
    btn.draw = (ctx) => {

        let parent = btn.getParent();
        if (parent) {
            ctx.beginPath();
            ctx.strokeStyle = colorBlack;
            ctx.fillStyle = colorBlack;
            if (btn.isFirst) {
                if (parent.isHorizontally()) {
                    ctx.arc(parent.getX(), parent.getY() + parent.getScaledWidth() / 2 , parent.getScaledWidth() / 2  + 1, 0, Math.PI * 2, false);
                } else {
                    ctx.arc(parent.getX() + parent.getScaledLength() / 2 , parent.getY(), parent.getScaledLength() / 2  + 1, 0, Math.PI * 2, false);
                }
            } else {
                if (parent.isHorizontally()) {
                    ctx.arc(parent.getX() + parent.getScaledLength() , parent.getY() + parent.getScaledWidth() / 2 , parent.getScaledWidth() / 2 + 1, 0, Math.PI * 2, false);
                } else {
                    ctx.arc(parent.getX() + parent.getScaledLength() / 2 , parent.getY() + parent.getScaledWidth(), parent.getScaledLength() / 2  + 1, 0, Math.PI * 2, false);

                }
            }
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            let basis = getBasis();
            if (getIsDragging() && (getSelectedShapeId() === btn.getId() || getSelectedShapeId() === btn.parentId)) {
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([20, 15]);
                if (parent.isHorizontally()) {
                    let x = btn.isFirst ? parent.getX() : parent.getX() + parent.getScaledLength();
                    ctx.moveTo(x, basis.getY());
                    ctx.lineTo(x, basis.getY() + basis.getScaledWidth());
                } else {
                    let dragElementY = parent.getY();
                    let dragElementLength = parent.getScaledLength() ;
                    let y = btn.isFirst ? parent.getY() : parent.getY() + parent.getScaledWidth();
                    ctx.moveTo(basis.getX(), y);
                    ctx.lineTo(basis.getX() + basis.getScaledLength(), y);
                }
                ctx.fillStyle = "rgba(0,0,0,0.18)";
                ctx.strokeStyle = "rgba(0,0,0,0.18)";
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }
        }
    };
    btn.resizeShape = (dx, dy) => {
        let parent = btn.getParent();
        if (parent) {
            parent.resize && parent.resize(dx, dy, btn.isFirst);
        }
    };
    btn.curorStyle = "move";
    shape.relatedShapes.push(btn.getId());
    return btn.getId();
}