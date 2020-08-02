import anime from 'animejs';
import { getDefaultOptions, getDefaultWidthAndHeight, getDefaultRevealSettings } from './defaults';
import { createDOMEl, appendUnits, createStyleForDOMEl } from './utils/element';

export interface IOptions {
	isContentHidden: boolean;
	layers: number;
	revealSettings: IRevealSettings;
}

export enum Position {
	Relative = 'relative',
	Absolute = 'absolute'
}

export enum Unit {
	Percentage = '%',
	Pixels = 'px'
}

type IRevealFxHook = (contentEl: HTMLElement, revealEl: HTMLElement[]) => boolean | void;

export interface IRevealSettings {
	direction: Directions;
	bgColors: string[];
	duration: number;
	easing: string;
	coverArea: number;
	delay: number;
	onStart: IRevealFxHook;
	onHalfway: IRevealFxHook;
	onComplete: IRevealFxHook;
}

export enum Directions {
	LeftToRight = 'lr',
	RightToLeft = 'rl',
	TopToBottom = 'tb',
	BottomToTop = 'bt'
}

enum ClassName {
	element = 'block-revealer__element',
	content = 'block-revealer__content'
}

interface IOrigin {
	initial: string;
	halfway: string;
}

interface ITransformSettings {
	val: string,
	origin: IOrigin;
}

export default function RevealFx(el: HTMLElement, options: IOptions | {} = {}) {
	const defaultOptions = getDefaultOptions();
	const mergedOptions: IOptions = Object.assign({}, defaultOptions, options);
	let isAnimationRunning = false;
	const content = _getContent(el);
	const revealLayersObj = RevealLayers();
	function _init(el: HTMLElement) {
		_layout(el);
	}
	function _layout(el: HTMLElement) {
		const { position } = getComputedStyle(el);
		if (position !== 'fixed' && position !== 'absolute' && position !== 'relative') {
			el.style.position = 'relative';
		}
		if (mergedOptions.isContentHidden) {
			content.style.opacity = '0';
		}
		el.innerHTML = '';
		el.appendChild(content);
		revealLayersObj.setRevealLayers({ num: mergedOptions.layers, options: mergedOptions });
		el.classList.add('block-revealer');
		revealLayersObj.getRevealLayers().forEach(layer => el.appendChild(layer));
	}
	function _getContent(el: HTMLElement) {
		const content = createDOMEl({
			type: 'div',
			className: ClassName.content,
			content: el.innerHTML
		});
		return content;
	}

	function _getTransformSettings(direction: Directions) {
		let origin = null;
		let origin_2 = null;
		let val = null;

		switch (direction) {
			case Directions.LeftToRight:
				val = 'scaleY(1)';
				origin = '0 50%';
				origin_2 = '100% 50%';
				break;
			case Directions.RightToLeft:
				val = 'scaleY(1)';
				origin = '100% 50%';
				origin_2 = '0 50%';
				break;
			case Directions.TopToBottom:
				val = 'scaleX(1)';
				origin = '50% 0';
				origin_2 = '50% 100%';
				break;
			case Directions.BottomToTop:
				val = 'scaleX(1)';
				origin = '50% 100%';
				origin_2 = '50% 0';
				break;
			default:
				val = 'scaleY(1)';
				origin = '0 50%';
				origin_2 = '100% 50%';
				break;
		};

		return {
			val: val,
			origin: { initial: origin, halfway: origin_2 },
		};
	}

	function reveal(revealSettings: Partial<IRevealSettings> | {} = {}) {
		if (isAnimationRunning) {
			return false;
		}
		isAnimationRunning = true;
		const mergedRevealSettings = Object.assign({}, getDefaultRevealSettings(), mergedOptions.revealSettings, revealSettings);
		const transformSettings = _getTransformSettings(mergedRevealSettings.direction);
		const revealLayers = revealLayersObj.getRevealLayers();
		revealLayers.forEach((layer, index: number) => {
			layer.style.webkitTransform = layer.style.transform = transformSettings.val;
			layer.style.webkitTransformOrigin = layer.style.transformOrigin = transformSettings.origin.initial;
			layer.style.opacity = '1';
			layer.style.backgroundColor = mergedRevealSettings.bgColors[index] || '#101010';
		});
		_animate(mergedRevealSettings, transformSettings)
	}

	function _animate(mergedRevealSettings: IRevealSettings, transformSettings: ITransformSettings) {
		const revealLayers = revealLayersObj.getRevealLayers();

		const animationSettings_2 = {
			targets: revealLayers,
			delay: anime.stagger(mergedRevealSettings.delay),
			duration: mergedRevealSettings.duration,
			easing: mergedRevealSettings.easing,
			complete: () => {
				if (typeof mergedRevealSettings.onComplete === 'function') {
					mergedRevealSettings.onComplete(content, revealLayers);
				}
				isAnimationRunning = false;
			}
		}
		const animationSettings = {
			targets: revealLayers,
			delay: anime.stagger(mergedRevealSettings.delay),
			duration: mergedRevealSettings.duration,
			easing: mergedRevealSettings.easing,
			complete: () => _complete(revealLayers, transformSettings, mergedRevealSettings, animationSettings_2)
		};

		const { coverArea, direction } = mergedRevealSettings;
		if (direction === Directions.LeftToRight || direction === Directions.RightToLeft) {
			animationSettings['scaleX'] = [0, 1];
			animationSettings_2['scaleX'] = [1, coverArea / 100];
		}
		else {
			animationSettings['scaleY'] = [0, 1];
			animationSettings_2['scaleY'] = [1, coverArea / 100];
		}

		if (typeof mergedRevealSettings.onStart === 'function') {
			mergedRevealSettings.onStart(content, revealLayers);
		}

		anime(animationSettings);
	}

	function _complete(revealLayers: HTMLElement[], transformSettings: ITransformSettings, revealSettings: IRevealSettings, animationSettings_2) {
		revealLayers.forEach(layer => {
			layer.style.webkitTransformOrigin = layer.style.transformOrigin = transformSettings.origin.halfway
		});
		if (typeof revealSettings.onHalfway === 'function') {
			revealSettings.onHalfway(content, revealLayers);
		}
		anime(animationSettings_2);
	}

	_init(el);
	return { reveal };
}

function RevealLayers() {
	let revealLayers: HTMLElement[] = [];
	const NOISE = 0.5;
	const getRevealLayers = () => revealLayers;
	const setRevealLayers = ({ num, options }: { num: number, options: IOptions }) => {
		revealLayers = [];
		const { revealSettings: { bgColors, direction } } = options;
		for (let i = 0; i < num; i++) {
			revealLayers.push(_createLayer(bgColors, direction, num, i));
		}
	}
	function _createLayer(bgColors: string[], direction: IOptions['revealSettings']['direction'], total: number, index: number) {
		const { width, height } = getDefaultWidthAndHeight();
		const el = createDOMEl({ type: 'div', className: ClassName.element });
		const widthOfLayer = [Directions.TopToBottom, Directions.BottomToTop].includes(direction) ? ((width) / total) : 100;
		const heightOfLayer = [Directions.LeftToRight, Directions.RightToLeft].includes(direction) ? ((height) / total) : 100;
		const topOfEl = [Directions.TopToBottom, Directions.BottomToTop].includes(direction) ? 0 : heightOfLayer * index;
		const leftOfEl = [Directions.LeftToRight, Directions.RightToLeft].includes(direction) ? 0 : widthOfLayer * index;
		return createStyleForDOMEl(el, {
			position: Position.Absolute,
			left: appendUnits(leftOfEl, Unit.Percentage),
			top: appendUnits(topOfEl, Unit.Percentage),
			width: appendUnits(widthOfLayer, Unit.Percentage),
			height: appendUnits(heightOfLayer + NOISE, Unit.Percentage),
			color: '#fffffff',
			backgroundColor: bgColors[index] || bgColors[0],
		});
	}
	return { getRevealLayers, setRevealLayers };
}

(window as any).RevealFx = RevealFx;