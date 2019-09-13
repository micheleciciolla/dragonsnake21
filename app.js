var textureAttive = true;
<<<<<<< HEAD
var selectWorld;

/*  selectWorld legenda:
    0 = land 
    1 = mars 
    2 = dark 
*/

document.getElementById("Landscape").onclick = function (event) {
    selectWorld = 0;
    console.log("User selected Landscape-Earth : ", selectWorld);
    chooseWorld(selectWorld);
    hideTitles();
    main();
}

document.getElementById("Mars").onclick = function (event) {
    selectWorld = 1;
    console.log("User selected Mars : ", selectWorld);
    chooseWorld(selectWorld);
    hideTitles();
    main();

}

document.getElementById("Dark").onclick = function (event) {
    selectWorld = 2;
    console.log("User selected Dark : ", selectWorld);
    chooseWorld(selectWorld);
    hideTitles();
    main();

}
var river, floor, albero, directory, snake, duck;
var globalKeyPressed;

=======
var musicOn = false;
var input = 0;
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

class Game {

    constructor(input) {

        this.selectWorld = input;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x00);    // Dark black background

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 200);
        this.camera.lookAt(this.scene.position);
        this.camera.position.set(0, 10, -15);
        this.camera.rotation.y -= 30 / (2 * Math.PI);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        this.mouseDown = false;

        this.timer = new THREE.Clock();
        this.timer.start();

        // this.update = function dummyUpdate() { };

        // select between 3 worlds
        this.worldBuild();

        this.music();

    }

    addLights() {
        var spotLight = new THREE.SpotLight(0xDDDDDD, 0.5);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        //Set up shadow properties for the light
        spotLight.position.set(10, 40, -20);
        spotLight.shadow.mapSize.width = 512;  // default
        spotLight.shadow.mapSize.height = 512; // default

        // Helper
        const slh = new THREE.SpotLightHelper(spotLight);
        this.scene.add(slh);

        const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
        this.scene.add(light);
        const lh = new THREE.HemisphereLightHelper(light);
        this.scene.add(lh);

        /*
        const directLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
        directLight1.castShadow = true;
        directLight1.position.set(9.5, 8.2, 8.3);
        this.scene.add(directLight1);
        const dlh1 = new THREE.DirectionalLightHelper( directLight1 );
        this.scene.add(dlh1);
        */

        /*
        const directLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directLight2.castShadow = true;
        directLight2.position.set(-15.8, 5.2, 8);
        this.scene.add(directLight2);
        const dlh2 = new THREE.DirectionalLightHelper( directLight2 );
        this.scene.add(dlh2);
        */
    }

    music() {
        if (musicOn == true) {

            // create an AudioListener and add it to the camera
            var listener = new THREE.AudioListener();
            this.camera.add(listener);

            // create a global audio source
            var sound = new THREE.Audio(listener);

            // load a sound and set it as the Audio object's buffer
            var audioLoader = new THREE.AudioLoader();
            audioLoader.load('sounds/audio.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(true);
                sound.setVolume(0.5);
                sound.play();
            });
        }
    }

    // metodo per selezionare direttamente il mondo che si vuole
    worldBuild() {

        if (this.selectWorld == 0) {
            // intro
            this.river = "textures/intro/floor.jpeg"
            this.floorSx = "textures/intro/floor.jpeg"
            this.floorDx = "textures/intro/floor.jpeg"
            this.world = "textures/intro/"
            // this.camera.position.x = 1200;

            document.getElementById("go").style.visibility = 'hidden';
        }

        if (this.selectWorld == 1) {

            console.log("TEST: WORLDBUILD", this.selectWorld);

            this.river = "textures/mars/river.jpg"
            this.floorSx = "textures/mars/floor.jpg"
            this.floorDx = "textures/mars/floor.jpg"
            this.world = "textures/mars/"

            this.hideTitles();

        }
        if (this.selectWorld == 2) {
            this.river = "textures/dark/river.jpg"
            this.floorSx = "textures/dark/floor.jpg"
            this.floorDx = "textures/dark/floor.jpg"
            this.world = "textures/dark/"

            this.hideTitles();
        }
        if (this.selectWorld == 3) {
            this.river = "textures/land/river.jpg"
            this.floorSx = "textures/land/floor.jpg"
            this.floorDx = "textures/land/floor.jpg"
            this.world = "textures/land/"

            this.hideTitles();

        }
    }

    hideTitles() {
        document.getElementById("Dragon").style.visibility = 'hidden';
        document.getElementById("Mars").style.visibility = 'hidden';
        document.getElementById("Landscape").style.visibility = 'hidden';
        document.getElementById("Dark").style.visibility = 'hidden';
        document.getElementById("select").style.visibility = 'hidden';
    }

    /* Creates river.  */
    createRiver(dimX, dimY, dimZ, posY, posZ) {

        var lRiver, lRiverGeometry, lRiverMaterial, lRiverTex;

        lRiverGeometry = new THREE.BoxGeometry(dimX, dimY, dimZ);
<<<<<<< HEAD
        lRiverTex = applyTex(river, 0.5, 5);
=======
        lRiverTex = applyTex(this.river, 1, 5);
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

        lRiverMaterial = new THREE.MeshBasicMaterial({ map: lRiverTex });
        lRiver = new THREE.Mesh(lRiverGeometry, lRiverMaterial);

        lRiver.position.y = posY;
        lRiver.position.z = posZ;

        this.scene.add(lRiver);

    }
    /* Creates texture for the floor.  */
    createFloorSx(dimX, dimY, dimZ, posX, posY, posZ) {

        var lFloor, lFloorGeometry, lFloorMaterial, lFloorTex;

        lFloorGeometry = new THREE.BoxGeometry(dimX, dimY, dimZ);
<<<<<<< HEAD
        lFloorTex = applyTex(floor, 8, 8);
=======
        lFloorTex = applyTex(this.floorSx, 8, 8);
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

        lFloorMaterial = new THREE.MeshBasicMaterial({ map: lFloorTex });
        lFloor = new THREE.Mesh(lFloorGeometry, lFloorMaterial);

        lFloor.position.x = posX;
        lFloor.position.y = posY;
        lFloor.position.z = posZ;

        this.scene.add(lFloor);

    }

    createFloorDx(dimX, dimY, dimZ, posX, posY, posZ) {

        var lFloor, lFloorGeometry, lFloorMaterial, lFloorTex;

        lFloorGeometry = new THREE.BoxGeometry(dimX, dimY, dimZ);
<<<<<<< HEAD
        lFloorTex = applyTex(floor, 8, 8);
=======
        lFloorTex = applyTex(this.floorDx, 8, 8);
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

        lFloorMaterial = new THREE.MeshBasicMaterial({ map: lFloorTex });
        lFloor = new THREE.Mesh(lFloorGeometry, lFloorMaterial);

        lFloor.position.x = posX;
        lFloor.position.y = posY;
        lFloor.position.z = posZ;

        this.scene.add(lFloor);

    }

    //Creazione di un oggetto immagine "albero" nel workspace
    createTrees() {

        var trees =
        {
            scaleX: 64, /* Trees are 64*64.  */
            scaleY: 64,

            posXRight: 50,
            posYRight: 30, /* + 32 = 64 / 2.  */
            posZRight: 0
        }
        var scr = /* Screen dimensions.  */
        {
            w: window.innerWidth,
            h: window.innerHeight
        }
<<<<<<< HEAD

        var i, tree;
        var treeTexture = THREE.ImageUtils.loadTexture(albero);
=======
        var i, tree;
        var treeTexture = THREE.ImageUtils.loadTexture("textures/land/tree.png");
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

        var treeMaterial = new THREE.SpriteMaterial({
            map: treeTexture,
            useScreenCoordinates:
                false
        });
        for (i = 0; trees.posZRight - (i * 200) > -scr.w; i++) {
            //albero
            tree = new THREE.Sprite(treeMaterial);
            /* 
                Use sprites so that
                the trees will
                always point to 
                the camera.  
            */

            tree.position.set(trees.posXRight, trees.posYRight, trees.posZRight - (i * 400));
            tree.scale.set(trees.scaleX, trees.scaleY, 1.0);
<<<<<<< HEAD
            this.scene.add(tree);

=======
            if (this.selectWorld == 3)
                this.scene.add(tree);
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea
        }

    }

    /* Function that creates the skybox with 512*512 size pictures.  */
    createSkyBox() {

        var path, urls, textureCube, shader, skyMaterial, sky;

<<<<<<< HEAD
        path = directory;
=======
        path = this.world;
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

        //front-px //back-nx //up-py //down-ny //right-pz //left-nz

        urls = [path + "front.jpg", path + "back.jpg", path + "up.jpg",
        path + "down.jpg", path + "right.jpg", path + "left.jpg"];

        textureCube = THREE.ImageUtils.loadTextureCube(urls);
        textureCube.format = THREE.RGBFormat;

        shader = THREE.ShaderLib.cube;
        shader.uniforms.tCube.value = textureCube;

        skyMaterial = new THREE.ShaderMaterial
            ({
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            });

        /*  Define the skybox: it's a cube 4096*4096*4096.  */
        sky = new THREE.Mesh(new THREE.BoxGeometry(4096, 4096, 4096),
            skyMaterial);
        this.scene.add(sky);

        if (selectWorld == 0) game.createTrees();


    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.stats.begin();

        this.controls.update();

        this.stats.end();

        this.update(); // here updateFunction is called / not dummyUpdate

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

// THE GAME ITSELF (just like main() in c++)
<<<<<<< HEAD
var game = new Game();
console.log("VAR GAME NEW GAME");
var globalMap = makeMap();

// removed window.onload to wait user to click
function main() {
    console.log("main function");


    game.update = updateFunction;
    game.addLights();

    if (textureAttive) {
        game.createRiver(10, 0, 100, -0.4, 0);
        game.createFloorSx(50, 0, 100, 30, -0.4, 0);
        game.createFloorDx(50, 0, 100, -30, -0.4, 0);
        game.createSkyBox();
=======
var globalKeyPressed;
var game = new Game(input);
var globalMap = makeMap();
var snake, duck;

/* °°°°°°°°°°°°°°°°°°° MAIN °°°°°°°°°°°°°°°°°°° */

window.onload = function main() {
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

    document.getElementById("Mars").onclick = function (event) {
        game.selectWorld = 1;
        console.log("User selected Mars : ", game.selectWorld);
        game = new Game(1);
        loadGame();
    }

<<<<<<< HEAD
    game.scene.add(globalMap);

    snake = new Snake(this.selectWorld);
    snake.buildHead();

    snake.addBlockEgg();
    snake.addBlockEgg();
    snake.addBlockEgg();

    egg = new Egg(new THREE.Vector3(0, 2, 10));
    egg.build();

    duck = new Duck(new THREE.Vector3(0, 2, 20));
    duck.build();

    game.animate();
=======
    document.getElementById("Dark").onclick = function (event) {
        game.selectWorld = 2;
        console.log("User selected Dark : ", game.selectWorld);
        game = new Game(2);
        loadGame();
    }

    document.getElementById("Landscape").onclick = function (event) {
        game.selectWorld = 3;
        console.log("User selected Landscape-Earth : ", game.selectWorld);
        game = new Game(3);
        loadGame();
    }

    if (game.selectWorld == 0) loadGame();
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea
}

document.onkeydown = function checkKey(e) {
    globalKeyPressed = (e || window.event).keyCode;

    // [ E ] add edd
    if (globalKeyPressed == 69) egg.addEgg();
    // [ R ] add duck
    if (globalKeyPressed == 82) duck.addDuck();

}

// Needed by Game class
var updateFunction = function () {

<<<<<<< HEAD
    snake.update();
    egg.update();
    duck.update();
=======
    console.log("TEST : updateFunction : ", this.selectWorld);

    if (game.selectWorld != 0) {
        snake.update();
        egg.update();
        duck.update();
    }

    /* TODO
        if (snake.isDead == true) location.reload();
        globalKeyPressed = null;
    */
}

function loadGame() {
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea

    game.addLights();

    if (textureAttive) {
        game.createRiver(10, 0, 100, -0.4, 0); //larghezza altezza lunghezza posY posZ
        game.createFloorSx(50, 0, 100, 30, -0.4, 0);
        game.createFloorDx(50, 0, 100, -30, -0.4, 0);
        game.createSkyBox();
        game.createTrees();
    }
    var globalMap = makeMap();
    game.scene.add(globalMap);

    console.log("TEST : loadGame : ", game.selectWorld);

    if (game.selectWorld != 0) addCharacters();

    game.update = updateFunction;

    game.animate();
}

function addCharacters() {

    this.console.log("TEST: addCharacters : ", game.selectWorld);

    snake = new Snake(this.worldSelection);
    snake.buildHead();
    snake.addBlockEgg();
    snake.addBlockEgg();
    snake.addBlockEgg();

    egg = new Egg(new THREE.Vector3(0, 2, 10));
    egg.build();

    duck = new Duck(new THREE.Vector3(0, 2, 20));
    duck.build();
}

<<<<<<< HEAD
}

function chooseWorld(selection) {
    if (selection == 0) {
        // landscape
        river = "textures/land/river.jpg";
        floor = "textures/land/floor.jpg";
        albero = "textures/land/tree.png";
        directory = "textures/land/";
    }
    if (selection == 1) {
        // mars
        river = "textures/mars/river.jpg";
        floor = "textures/mars/floor.jpg";
        directory = "textures/mars/";
    }
    if (selection == 2) {
        // dark
        river = "textures/dark/river.jpg";
        floor = "textures/dark/floor.jpg";
        directory = "textures/dark/";
    }
}

function hideTitles() {
    document.getElementById("Dragon").style.visibility = 'hidden';
    document.getElementById("Mars").style.visibility = 'hidden';
    document.getElementById("Landscape").style.visibility = 'hidden';
    document.getElementById("Dark").style.visibility = 'hidden';
}


=======
>>>>>>> b73c7f933c34e7d75c2c286e370aa4a1ee4954ea
