import { getDefaultStyleProps } from "../defaults";
import { Unit, Position } from "../index";


export function createDOMEl({ type, className = '', content = '' }: { type: string, className?: string, content?: string }) {
    const el = document.createElement(type);
    el.className = className;
    el.innerHTML = content;
    return el;
}

interface IStyleProps {
    position?: Position;
    left?: string;
    top?: string;
    color?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    opacity?: string;
    pointerEvents?: string;
    zIndex?: number;
}

export function createStyleForDOMEl(el: HTMLElement, styleProps: IStyleProps) {
    const defaultStyleProps = getDefaultStyleProps();
    Object.keys(styleProps).forEach(stylePropKey => {
        el.style[stylePropKey] = styleProps[stylePropKey] || defaultStyleProps[stylePropKey];
    });
    return el;
}


export const appendUnits = (value: number | string, unit: Unit) => value + unit;

