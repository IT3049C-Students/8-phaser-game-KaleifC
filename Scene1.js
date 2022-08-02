let gameStarted=false
class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    
    preload(){
        this.load.image('ball','assets/images/ball_32_32.png');
        this.load.image('paddle', 'assets/images/paddle_128_32.png');
        this.load.image('brick1', 'assets/images/brick1_64_32.png');
        this.load.image('brick2', 'assets/images/brick2_64_32.png');
        this.load.image('brick3', 'assets/images/brick3_64_32.png');
    }

    create(){
        this.add.text(20,20,"Test start")

        this.player = this.physics.add.sprite(400,600,'paddle');
        this.ball = this.physics.add.sprite(400,565, 'ball');
        this.violetBricks = this.physics.add.group({
            key: 'brick1',
            repeat: 9,
            immovable: true,
            setXY: {x: 80,y: 140,stepX: 70}
        });
        this.yellowBricks = this.physics.add.group({
            key: 'brick2',
            repeat: 9,
            immovable: true,
            setXY: {x: 80,y: 90,stepX: 70}
        });
        this.redBricks = this.physics.add.group({
            key: 'brick3',
            repeat: 9,
            immovable: true,
            setXY: {x: 80,y: 40,stepX: 70}
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1,1);
        this.physics.world.checkCollision.down = false;

        this.physics.add.collider(this.ball, this.violetBricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.yellowBricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.redBricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this);
        this.player.setImmovable(true);
    }

    hitBrick(ball, brick){
        brick.disableBody(true,true);
        if(this.ball.velocityX ==0){
            this.ball.setVelocityX(150);
        } else{
            this.ball.setVelocityX(-150);
        }
    }
    //this function is causing some sort of issue, the collision deletes the ball
    hitPlayer(ball, player) {
        this.ball.setVelocityY(this.ball.velocityY - 5);
        let newXVelocity = Math.abs(this.ball.velocityX) + 5;
        if (this.ball.x < this.player.x) {
            this.ball.setVelocityX(-newXVelocity);
        } else {
            this.ball.setVelocityX(newXVelocity);
        }
      }
    
    isGameOver(world) {
        return ball.body.y > world.bounds.height;
    }
    isWon() {
        return violetBricks.countActive() + yellowBricks.countActive() + redBricks.countActive() == 0;
    }

    update(){

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-350);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(350);
        } else {
            this.player.body.setVelocityX(0);
        }

        if (!gameStarted) {
            this.ball.setX(this.player.x);
            if (this.cursors.space.isDown) {
              gameStarted = true;
              this.ball.setVelocityY(-200);
            }
        }
    }
}