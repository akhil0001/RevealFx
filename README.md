# RevealFx
![](/demo/img/Friday.gif)

*Documentation is  work in progress*

A lightweight animation plugin based on animejs for revealing effects animation with simple API that works in almost every major browser. 
 It works with the text, images or any UI element.

## Why?
This is inspired from Mary Lou's Block Reveal Animation Tutorial. As part of a design for my portfolio website, I have used this effect for user's focus.
This plugin draws major logic from the article but provides a lean and self descriptive API which can be used to create sleak and superb block animation. I hope you will find this library useful 

## Installation 
- npm
```npm
npm i revealfx
```
- CDN link
```HTML
<script src = "anime.min.js"></script>
<script src = "dist/revealFx.js"></script>
```
## Usage
- Add *dist/revealFx.js* to your html 
(or)
- Import it as a module as shown below
```js
import revealFx;
```
## Syntax

 - Inorder to implement the animation to a certain element, first select the element . For example : 
 ```js
 var element1 = document.querySelector('#id1');
 ```
 - Now it should be passed as the first argument to the constructor as follows
```js
var rev1 = new RevealFx(element1,options);
```
- The above snippet initializes the element with the block reveal animation. The following method  invokes the animation
```js
rev1.reveal(revealSettings);
```

 Refer API section for more details on customization

## API

 |Name|Description |Default value |
 |----|------------|--------------|
 | `isContentHidden` | If true , the content of the element will be hidden until it is revealed | `true`|
 | `layers`| The number of layers to be shown during the animation | `1`|
 | `revealSettings`| JSON options for animations and callback functions. This can be set initially or be passed during reveal() method call  | `{}` |
 - The following are the options available inside the revealSettings JSON and can be set both at initialization or during the reveal() method call

 |Name|Description |Default value |
 |-----|------|-------|
 | `direction` | Animation direction: Block can be revealed from left to right (lr) or right to left (rl) or top to bottom (tb) or bottom to top (bt) | `'lr'`|
 |`bgColors`| Array of colors that can be set as background for each layer respectively |`['#111']`|
 |`duration`| Total Time taken for animation to take place | `500`|
 |`easing`| Easing function for animation. Many more easing functions are available at anime.js| `easeInOutQuint`|
 |`coverArea`| percentage-based value representing how much of the area should be left covered | `0`|
 |`delay`| staggered delay in timing between the layer | `100`|
 |`onStart`| Callback, with the parameters of the element that is animated and layers that animate ,when the animation starts | `Method/Function`|
 |`onHalfway`| Callback, with the similar parameters as the above method , when the animation is halfway through of the animation | `Method/Function`|
 |`onComplete`| Callback,with the similar parameters as the above method , when the animation is completed | `Method/Function`|

## Methods and Functions

 - `onStart`
    - This is a callback method with the parameters of the element that is animated and layers that animate ,when the animation starts
    - parameters: `contentEl`,`revealerEl`
    ```js
     onStart: function (contentEl, revealerEl) {
           //contentEl is the element that is animated.
            
            //revealerEl is an array of the layers that animate the contentEl
        }
    ```
- `onHalfway`
    - This is a callback method with the parameters of the element that is animated and layers that animate ,when the animation is halfway through the animation
    - parameters: `contentEl`,`revealerEl`
    ```js
     onHalfway: function (contentEl, revealerEl) {
           //contentEl is the element that is animated.

            //revealerEl is an array of the layers that animate the contentEl
        }
    ```
- `onComplete`
    - This is a callback method with the parameters of the element that is animated and layers that animate ,when the animation completes
    - parameters: `contentEl`,`revealerEl`
    ```js
     onComplete: function (contentEl, revealerEl) {
           //contentEl is the element that is animated.
            
            //revealerEl is an array of the layers that animate the contentEl
        }
    ```

## Demo
-  Clone this repo and run the following commands for the demo 
```node
npm install 
npm start
```

- Here is the live link for Codepen Demo

## Contribute
- Fork it or clone it
- git checkout -b NEW-FEATURE
- git commit -am 'ADD SOME FEATURE'
- git push origin NEW-FEATURE

## ToDos

- [x] Add Images to Readme

- [] demo snippets update

- [] links update in the documentation