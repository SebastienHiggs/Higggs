//scene
let gameScene = new Phaser.Scene('Game');

//load assets
gameScene.preload = function(){
    this.load.image('background','phaser/imgs/back.gif');
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