//scene
let gameScene = new Phaser.Scene('Game');
windOn = 1;

//load assets
gameScene.preload = function(){
    this.load.image('background','phaser/imgs/back.png');
    this.load.image('powerplant','phaser/imgs/powerplant.png');
    this.load.image('solar','phaser/imgs/solar.png');
    this.load.image('wind','phaser/imgs/wind.png');
    this.load.image('wind2','phaser/imgs/wind2.png');
    

    //this.load.atlas('winda', 'phaser/imgs/winda.png', 'phaser/imgs/winda.json');
    this.load.spritesheet('winds', 'phaser/imgs/winda.png', { frameWidth: 1493 , frameHeight: 1299, endFrame: 2 });

    this.load.audio('cli','phaser/imgs/cli.mp3');
    this.load.audio('ck','phaser/imgs/ck.mp3');
}

//called once after preload
gameScene.create = function() {
    let bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);

    let cliSound = this.sound.add('cli');
    let ckSound = this.sound.add('ck');


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

    this.anims.create(windConfig);
    var windy = this.add.sprite(1350, 450, 'winds').setInteractive();

    windy.setScale(0.13);
    if (windOn == 0) {
        windy.play('wind2');
        current.setText('wind off');
    } else {
        windy.play('wind1');
        current.setText('wind on');
    }
    
    var solar = this.add.sprite(1200, 505, 'solar');
    solar.setScale(0.05);
    var solar2 = this.add.sprite(1130, 510, 'solar');
    solar2.setScale(0.05);

    windy.on('pointerdown', function (pointer) {
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
    });

    var pp = this.add.sprite(1700, 500, 'powerplant').setInteractive();
    pp.setScale(0.3);
    pp.on('pointerdown', function (pointer) {
        cliSound.play();
        pp.setScale(0.32);
        bigP = true;
    });
    pp.on('pointerout', function (pointer) {
        pp.setScale(0.3);
        if (bigP == true) {
            ckSound.play();
        };
        bigP = false;
    });
    pp.on('pointerup', function (pointer) {
        pp.setScale(0.3);
        if (bigP == true) {
            ckSound.play();
        };
        bigP = false;
    });
};

//config
let config = {
    type: Phaser.AUTO,
    width: 1875,
    height: 880,
    scene: gameScene
};

//new game
let game = new Phaser.Game(config);