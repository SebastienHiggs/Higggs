//Global Variables
width = window.innerWidth;
height = window.innerHeight;
yup = 1;
var windOn = 0;
var night = 0;

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
    this.load.image('night','phaser/imgs/night.png');
    this.load.image('sun','phaser/imgs/sun.png');
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
    

    let bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);

    let nightbg = this.add.sprite(0,0,'night');
    nightbg.setOrigin(0,0);
    nightbg.setScale(0.001)

    let cliSound = this.sound.add('cli');
    let ckSound = this.sound.add('ck');

    bg.setScale(sceneWidth/1816); //back.png is 1816*908

    const windConfig = {
        key: 'wind1',
        frames: this.anims.generateFrameNumbers('winds', { frames: [ 0, 1 ] }),
        frameRate: 4,
        repeat: -1
    };

    //Creating the Windmills
    this.anims.create(windConfig);
    var windy = this.add.sprite(sceneWidth*0.74, sceneHeight*0.47, 'winds').setInteractive();

    windy.setScale(0.13*basicScale);

    windy.on('pointerdown', function (pointer) {
        cliSound.play();
        windy.setScale(0.14*basicScale);
        mouseOver = true;
        if (windOn == 0) {
            windy.play({
                key: 'wind1',
                repeat: -1
            });
            windOn = 1;
        } else {
            windy.play({
                key: 'wind1',
                repeat: 0
            });
            windOn = 0;
        }
    });
    windy.on('pointerout', function (pointer) {
        windy.setScale(0.13*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });
    windy.on('pointerup', function (pointer) {
        windy.setScale(0.13*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });

    
    
    //Creating the Solar Panels
    var solar = this.add.sprite(sceneWidth*0.62, sceneHeight*0.57, 'solar').setInteractive();
    solar.setScale(0.05*basicScale);
    var solar2 = this.add.sprite(sceneWidth*0.66, sceneHeight*0.56, 'solar').setInteractive();
    solar2.setScale(0.05*basicScale);

    solar.on('pointerdown', function (pointer) {
        cliSound.play();
        solar.setScale(0.053*basicScale);
        mouseOver = true;
    });
    solar.on('pointerout', function (pointer) {
        solar.setScale(0.05*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });
    solar.on('pointerup', function (pointer) {
        solar.setScale(0.05*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });

    solar2.on('pointerdown', function (pointer) {
        cliSound.play();
        solar2.setScale(0.053*basicScale);
        mouseOver = true;
    });
    solar2.on('pointerout', function (pointer) {
        solar2.setScale(0.05*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });
    solar2.on('pointerup', function (pointer) {
        solar2.setScale(0.05*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });


    //Make the powerplant
    var pp = this.add.sprite(sceneWidth*0.9, sceneHeight*0.56, 'powerplant').setInteractive();
    pp.setScale(0.3*basicScale);
    
    pp.on('pointerdown', function (pointer) {
        cliSound.play();
        pp.setScale(0.32*basicScale);
        mouseOver = true;
    });
    pp.on('pointerout', function (pointer) {
        pp.setScale(0.3*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });
    pp.on('pointerup', function (pointer) {
        pp.setScale(0.3*basicScale);
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });

    //Block the sun
    var sun = this.add.sprite(sceneWidth*0.595, sceneHeight*0.135, 'sun').setInteractive();
    sun.setScale(basicScale*0.8);
    
    sun.on('pointerdown', function (pointer) {
        cliSound.play();
        mouseOver = true;
        if (night == 1) {
            nightbg.setScale(0.001);
            night = 0;
        } else {
            nightbg.setScale(basicScale);
            night = 1;
        }
    });
    sun.on('pointerout', function (pointer) {
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });
    sun.on('pointerup', function (pointer) {
        if (mouseOver == true) {
            ckSound.play();
        };
        mouseOver = false;
    });
};

//config
var config = {
    type: Phaser.AUTO,
    width: sceneWidth,
    height: sceneHeight,
    pixelArt: true,
    scene: gameScene
};

//new game
let game = new Phaser.Game(config);