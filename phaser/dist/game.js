//Global Variables
width = window.innerWidth;
height = window.innerHeight;
yup = 1;

if (width > height*1.9) {
    sceneHeight = Math.round(height*0.9);
    sceneWidth = Math.round(sceneHeight*2);
} else {
    sceneWidth = Math.round(width*0.95);
    sceneHeight = Math.round(sceneWidth/2);
}

var basicScale = sceneWidth/1816;

//scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = function() {
    this.load.image('background','phaser/imgs/back.png');
    this.load.image('powerplant','phaser/imgs/powerplant.png');
    this.load.image('solar','phaser/imgs/solar.png');
    this.load.image('wind','phaser/imgs/wind.png');
    this.load.image('wind2','phaser/imgs/wind2.png');
    
    this.load.spritesheet('winds', 'phaser/imgs/winda.png', { frameWidth: 1493 , frameHeight: 1299, endFrame: 2 });

    this.load.audio('cli','phaser/imgs/cli.mp3');
    this.load.audio('ck','phaser/imgs/ck.mp3');
}

//called once after preload
gameScene.create = function() {
    windOn = 1;

    let bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);

    let cliSound = this.sound.add('cli');
    let ckSound = this.sound.add('ck');

    bg.setScale(sceneWidth/1816); //back.png is 1816*908

    const windConfig = {
        key: 'wind1',
        frames: this.anims.generateFrameNumbers('winds', { frames: [ 0, 1 ] }),
        frameRate: 4,
        repeat: -1
    };

    const noWindConfig = {
        key: 'wind2',
        frames: this.anims.generateFrameNumbers('winds', { frames: [ 0, 0] }),
        frameRate: 10,
        repeat: -1
    };

    const current = this.add.text(48, 460, 'Playing: walk', { color: '#00ff00' });

    //Creating the Windmills
    this.anims.create(windConfig);
    var windy = this.add.sprite(1350, 450, 'winds').setInteractive();

    windy.setScale(0.13);
    if (windOn == 0) {
        windy.play('wind2');
        current.setText("wind off");
    } else {
        windy.play('wind1');
        current.setText((sceneWidth));//+toString(sceneHeight));
    }
    
    //Creating the Solar Panels
    var solar = this.add.sprite(sceneWidth*0.62, sceneHeight*0.57, 'solar');
    solar.setScale(0.05*basicScale);
    var solar2 = this.add.sprite(sceneWidth*0.66, sceneHeight*0.56, 'solar');
    solar2.setScale(0.05*basicScale);

    clickScale(solar,0.05);

    //Move the windmills?
    /*windy.on('pointerdown', function (pointer) {
        cliSound.play();
        windy.setScale(0.14);
        bigW = true;
        windOn = 0;
    });
    windy.on('pointerout', function (pointer) {
        windy.setScale(0.13);
        if (bigW == true) {
            ckSound.play();
        };
        bigW = false;
        windOn = 0;
    });
    windy.on('pointerup', function (pointer) {
        windy.setScale(0.13);
        if (bigW == true) {
            ckSound.play();
        };
        bigW = false;
        windOn = 0;
    });*/

    //Make the powerplant
    var pp = this.add.sprite(sceneWidth*0.9, sceneHeight*0.56, 'powerplant').setInteractive();
    pp.setScale(0.3*basicScale);
    pp.on('pointerdown', function (pointer) {
        cliSound.play();
        pp.setScale(0.32*basicScale);
        bigP = true;
    });
    pp.on('pointerout', function (pointer) {
        pp.setScale(0.3*basicScale);
        if (bigP == true) {
            ckSound.play();
        };
        bigP = false;
    });
    pp.on('pointerup', function (pointer) {
        pp.setScale(0.3*basicScale);
        if (bigP == true) {
            ckSound.play();
        };
        bigP = false;
    });
};

function clickScale(spriteName,itemScale) {
    spriteName.setScale(itemScale*basicScale);
    spriteName.on('pointerdown', function (pointer) {
        cliSound.play();
        spriteName.setScale(1.07*itemScale*basicScale);
        bigP = true;
    });
    spriteName.on('pointerout', function (pointer) {
        pp.setScale(itemScale*basicScale);
        if (bigP == true) {
            ckSound.play();
        };
        bigP = false;
    });
    spriteName.on('pointerup', function (pointer) {
        spriteName.setScale(itemScale*basicScale);
        if (bigP == true) {
            ckSound.play();
        };
        bigP = false;
    });
}


//config
var config = {
    type: Phaser.AUTO,
    width: sceneWidth,
    height: sceneHeight,
    scene: gameScene
};

//new game
let game = new Phaser.Game(config);