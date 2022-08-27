//scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = function(){
    this.load.image('background','phaser/imgs/back.png');
    this.load.image('powerplant','phaser/imgs/powerplant.png');

    this.load.audio('click','phaser/imgs/click.mp3');
}

//called once after preload
gameScene.create = function() {
    let bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);
    let pp = this.add.sprite(1000,500,'powerplant');
    pp.depth =  1; //not necessary here but good for refence
    pp.setScale(0.3);

    let clickSound = this.sound.add('click');
    clickSound.play();
}

//config
let config = {
    type: Phaser.AUTO,
    width: 1875,
    height: 880,
    scene: gameScene
};

//new game
let game = new Phaser.Game(config);