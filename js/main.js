
/*
Huge thanks to @pavfilin for the speedometer code https://codepen.io/pavfilin/pen/xLKoov

*/
var rangeMeter = document.querySelector('#range');
var rangeShow = document.querySelector("#show");
var rangeClock = document.querySelector('.meter-clock');
var rangeConvert = document.querySelector('#converted')

function speedometer() {

    function rangeChange() {
        var rotateClock = rangeMeter.value;

        rangeClock.style.transform = 'rotate(' + (-90 + ((rotateClock * 180) / 100)) + 'deg)';
        // rangeShow.value = rotateClock + '%';
        rangeShow.value = `${rotateClock} km/h`;

        var numsStr = rangeShow.value.replace(/[^0-9]/g, ''); //getting number from string
        rangeConvert.value = `${(numsStr * 5 / 18).toFixed(2)} m/s` // converted speed in m/s

        /*
        speech synthesis functionality inspiration is taken from the angry simulator we made durign #100devs class
        
        */
        const speeches = ['not moving', 'super slow', 'just right slow', 'moderately fast', 'super fast', 'ultra fast fast']
        const currentSpeed = getSpeed() * 100

        console.log(`before speech ${currentSpeed}`)
        if ((currentSpeed > 0) && (currentSpeed <= 10)) {
            let yellThis = new SpeechSynthesisUtterance(speeches[1]);
            synth.speak(yellThis);
            console.log(currentSpeed)
        } else if ((currentSpeed > 10) && (currentSpeed <= 30)) {
            yellThis = new SpeechSynthesisUtterance(speeches[2]);
            synth.speak(yellThis);
            console.log(currentSpeed)
        } else if ((currentSpeed > 30) && (currentSpeed <= 60)) {
            yellThis = new SpeechSynthesisUtterance(speeches[3]);
            synth.speak(yellThis);
        } else if ((currentSpeed > 60) && (currentSpeed <= 80)) {
            yellThis = new SpeechSynthesisUtterance(speeches[4]);
            synth.speak(yellThis);
            console.log(currentSpeed)
        } else if (currentSpeed == 0) {
            yellThis = new SpeechSynthesisUtterance(speeches[0]);
            synth.speak(yellThis);
        }
        else {
            yellThis = new SpeechSynthesisUtterance(speeches[5]);
            synth.speak(yellThis);
            console.log(currentSpeed)
        }
    }

    rangeMeter.addEventListener('input', rangeChange);
}


function getSpeed() {
    return rangeShow.value.replace(/[^0-9]/g, '') * (1 / 100)
}

// document.querySelector('.rang-slider').addEventListener(input, describeSpeed())
const synth = window.speechSynthesis;

/*
Inspired... copied... stolen from Stivs @stivaliserna's Three.js Animated Rocket https://codepen.io/stivaliserna/pen/rNMwpaG
 
It was perfect for a side project I'm working on with #100devs. So thank you Stivs.
 
*/

let scene,
    camera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    renderer,
    container,
    rocket,
    HEIGHT,
    WIDTH;


const createScene = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0x5d0361, 10, 1500);

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    camera.position.x = 0;
    camera.position.z = 500;
    camera.position.y = -10;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);

    renderer.shadowMap.enabled = true;

    container = document.getElementById("canvas");
    container.appendChild(renderer.domElement);

    window.addEventListener("resize", handleWindowResize, false);

    let loader = new THREE.GLTFLoader();
    loader.load("https://www.stivaliserna.com/assets/rocket/rocket.gltf",
        (gltf) => {
            rocket = gltf.scene;
            rocket.position.y = 50;
            scene.add(rocket);
        }
    );
};

const handleWindowResize = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
};

const createLights = () => {
    const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1);

    const directionalLight = new THREE.DirectionalLight(0xdfebff, 1);
    directionalLight.position.set(-300, 0, 600);

    const pointLight = new THREE.PointLight(0xa11148, 2, 1000, 2);
    pointLight.position.set(200, -100, 50);

    scene.add(ambientLight, directionalLight, pointLight);
};

const targetRocketPosition = 40;
const animationDuration = 2000;

const loop = () => {
    const t = (Date.now() % animationDuration) / animationDuration;

    renderer.render(scene, camera);
    let speed = getSpeed();
    const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
    if (rocket) {
        // rocket.rotation.y += 0.1;
        rocket.rotation.y += speed;
        rocket.position.y = delta;
    }

    requestAnimationFrame(loop);
    describeSpeed();
};


const main = () => {
    speedometer();
    createScene();
    createLights();
    renderer.render(scene, camera);
    loop();
};

main();

