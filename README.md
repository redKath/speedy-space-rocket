# Speedy Space Rocket :rocket:

This is project is a product of combining the "building blocks" I've learned from [#100Devs](https://leonnoel.com/100devs/)' first 3 classes about JavaScript. We did these little cool stuff using JavaScript:

- Temperature converter (arithmetic)
- Which day is it? Class, Weekend, or Boring? (conditional statements)
- Angry parent simulator (simple DOM manipulation using JS + [speechsynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis))

## Table of contents

- [Overview](#overview)
  - [Video Demo](#video-demo)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Video Demo

Here is the video that demonstrates the final output.

Using the speedometer, user will set the desired rotation speed of the rocket. The speed is in kph and the converted speed in m/s is also shown above the speedometer. The user will also hear prompts about the speed, if it's fast or slow. 

**Note: Watch demo with sound on :loud_sound:**

https://user-images.githubusercontent.com/47875009/184496384-6bdc7ef5-e716-48a5-a098-c2bdc28734f2.mp4

### Links

- codepen URL: [CodePen - Space Rocket with Speedometer](https://codepen.io/redkath/full/zYWmvRK)

## My process

### Built with

- ![](https://img.shields.io/badge/Code-HTML5-informational?style=flat&logo=HTML5&logoColor=white&color=orange)
- ![](https://img.shields.io/badge/Code-CSS-informational?style=flat&logo=CSS3&logoColor=white&color=blue)
- ![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=javascript&logoColor=white&color=yellow)
- ![](https://img.shields.io/badge/Code-ThreeJS-informational?style=flat&logo=javascript&logoColor=white&color=yellow)
- ![](https://img.shields.io/badge/Code-GLTFLoader-informational?style=flat&logo=javascript&logoColor=white&color=yellow)


### What I learned

Through this little project, I've learned how to put together the stuff I learned. While doing this, a lot of things didn't work at first because just putting it together doesn't mean it would work as I expected it to.

Since the animated rocket was made using ![](https://img.shields.io/badge/Code-ThreeJS-informational?style=flat&logo=javascript&logoColor=white&color=yellow), I first had to import the library.

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.138.3/build/three.min.js"></script>
```
The rocket itself is a 3d model so I also learned that I need to import the loader for it.

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.138.3/examples/js/loaders/GLTFLoader.min.js"></script>
```
So without these two imports, the fancy 3d animated rocket won't work. 

**Disclaimer: Bad code ahead, please slow down :sweat_smile:**

For the speedometer, I just changed the color a bit to match the theme of the rocket and its background.

To get the input from the speedometer (string) and used it for the rotation speed of the rocket, I learned that I need another function to get the `number` from the slider input of the speedometer. 


```js
var rangeShow = document.querySelector("#show");

function getSpeed() {
    return rangeShow.value.replace(/[^0-9]/g, '') * (1 / 100) //getting number from #show element 
}

// inside the loop f(x)
  let speed = getSpeed(); 
    // inside the conditional for rocket
    rocket.rotation.y += speed;
```
After adjusting the rotation speed, I next worked on adding the speech synthesis for different levels of speed. 

Inside the function for the `eventListener` for the slider, I wrote the conditional statements for the speechsynthesis.

```js
// outside eventlistener initialize this
const synth = window.speechSynthesis;

// inside the eventlistener
const speeches = ['not moving', 'super slow', 'just right slow', 'moderately fast', 'super fast', 'ultra fast fast'] // script for the speaker

/*
there are 5 conditions:
0 speed = not moving
1-10 speed = super slow
11-30 speed = just right slow
30-60 speed = moderately fast
60-80 speed = super fast
80-100 =  ultra fast fast
*/

// for every condition, I did this
yellThis = new SpeechSynthesisUtterance(speeches[index]);
synth.speak(yellThis);

```
### Useful resources
- [CSS Speedometer](https://codepen.io/stivaliserna/pen/rNMwpaG) - The lovely 3d animated rocket is from Stivs. 
- [CSS Speedometer](https://codepen.io/pavfilin/pen/xLKoov) - This is the inspiration for the speedometer component.
- [Speech Synthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) - This is an amazing article which helped me finally understand speech synthesis. 
- [Canva Palette Generator](https://www.canva.com/colors/color-palette-generator/) -  I used this to generate the new look for the speedometer. I highly recommend it for folks who want to generate palette quickly from photos.

## Author

- Twitter - [@redkathh](https://www.twitter.com/redkathh)

## Acknowledgments

Huge thanks to these amazing people who inspired me to build this fun project. Majority of the resources for this project are inspired... copied... stolen from them. All credits goes to them. :raised_hands:

- [Khanh Tran](https://khanhtranngoccva.github.io/portfolio/) - Huge thanks to him. When I first started this assignment, I first lookup the tweets of the other [#100Devs](https://leonnoel.com/100devs/) folks to see what they built to get some inspiration. 

  When I saw [his tweet](https://twitter.com/khanhtncva/status/1496514909437575169) something came up to me and his work was one of the best idea on how to put what we learned in the first classes for JavaScript. 
- [Stivs](https://codepen.io/stivaliserna) - Massive thank you to her work on the 3d animated rocket is so amazing! It's perfect for this project.
- [Pavflin](https://codepen.io/pavfilin) - The speedometer he did was written in HTML and CSS so I had to convert it. Nonetheless, it's the perfect speedometer for this project. Huge thanks to them as well. 

