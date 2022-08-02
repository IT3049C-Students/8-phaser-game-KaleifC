var config = {
    width: 800,
    height: 640,
    backgroundColor: 0x000000,
    scene: [Scene1],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
}

var game=new Phaser.Game(config);
