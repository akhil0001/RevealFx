import { Directions, IRevealSettings, IOptions } from "./index";


export const getDefaultRevealSettings: () => IRevealSettings = () => ({
    // Animation direction: left right (lr) || right left (rl) || top bottom (tb) || bottom top (bt).
    direction: Directions.LeftToRight,
    // Revealers´s background color Array.
    bgColors: ['#111'],
    // Animation speed. This is the speed to "cover" and also "uncover" the element (seperately, not the total time).
    duration: 500,
    // Animation easing. This is the easing to "cover" and also "uncover" the element.
    easing: 'easeInOutQuint',
    // percentage-based value representing how much of the area should be left covered.
    coverArea: 0,
    //milliseconds of delay between layers animation thatis used in stagger animation 
    delay: 100,
    // Callback for when the revealer is covering the element (halfway through of the whole animation)
    onHalfway: function () { return false; },
    // Callback for when the animation starts (animation start).
    onStart: function () { return false; },
    // Callback for when the revealer has completed uncovering (animation end).
    onComplete: function () { return false; },
});

export const getDefaultOptions: () => IOptions = () =>
    ({
        // If true, then the content will be hidden until it´s "revealed".
        isContentHidden: true,
        //number of layers to be displayed 
        layers: 1,
        // The animation/reveal settings. This can be set initially or passed when calling the reveal method.
        revealSettings: getDefaultRevealSettings()
    });

export const getElementDefualtProps = () => ({ width: 100, height: 100 });

export const getDefaultWidthAndHeight = () => ({ width: 100, height: 100 });

export const getDefaultStyleProps = () => ({
    position: 'absolute',
    top: '0',
    left: '0',
    color: '#ffffff',
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    opacity: '0',
    pointerEvents: 'none',
    zIndex: 0
});