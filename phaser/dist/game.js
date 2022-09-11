//scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = function(){
    this.load.image('background','phaser/imgs/back.png');
    this.load.image('powerplant','phaser/imgs/powerplant.png');
    this.load.image('solar','phaser/imgs/solar.png');
    this.load.image('wind','phaser/imgs/wind.png');
    this.load.image('wind2','phaser/imgs/wind2.png');
    windImg = 1;

    this.load.atlas('winda', 'phaser/imgs/winda.png', 'phaser/imgs/winda.json');

    this.load.audio('cli','phaser/imgs/cli.mp3');
    this.load.audio('ck','phaser/imgs/ck.mp3');
}

//called once after preload
gameScene.create = function() {
    let bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);
    //let pp = this.add.sprite(1700,500,'powerplant');
    //pp.depth =  1; //not necessary here but good for refence
    //pp.setScale(0.3);

    let cliSound = this.sound.add('cli');
    let ckSound = this.sound.add('ck');

    this.anims.create({
        key: 'wind',
        frames: 'winda',
        frameRate: 12,
        repeat: -1
    });

    this.add.sprite(400, 300).play('wind');

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('brawler', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 8,
        repeat: -1
    });
    
    var solar = this.add.sprite(1200, 505, 'solar');
    solar.setScale(0.05);
    var solar2 = this.add.sprite(1130, 510, 'solar');
    solar2.setScale(0.05);

    var wind = this.add.sprite(1350, 450, 'wind').setInteractive();
    wind.setScale(0.2);

    wind.on('pointerdown', function (pointer) {
        cliSound.play();
        wind.setScale(0.22);
        bigW = true;
        if (windImg == 2) {
            wind.setTexture('wind2');
            windImg = 1;
        } else {
            wind.setTexture('wind');
            windImg = 2;
        }
        
    });
    wind.on('pointerout', function (pointer) {
        wind.setScale(0.2);
        if (bigW == true) {
            ckSound.play();
        };
        bigW = false;
    });
    wind.on('pointerup', function (pointer) {
        wind.setScale(0.2);
        if (bigW == true) {
            ckSound.play();
        };
        bigW = false;
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