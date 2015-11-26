squaresinvasion.Game = function () {


};

squaresinvasion.Game.prototype = {
    create: function () {

        this.waveNumber = 1000;
        this.playerAlpha = 1;

        this.game.time.events.repeat(Phaser.Timer.SECOND, this.waveNumber, this.waveGenerator, this);


        this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'square');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(4);
        this.player.tint = 0x000000;
        this.player.smoothed = false;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;

        this.squares = this.game.add.group();
        this.squares.enableBody = true;





    },
    update: function () {
        //  only move when you click
        if (this.game.input.mousePointer.isDown) {
            if (Phaser.Rectangle.contains(this.player.body, this.game.input.x, this.game.input.y))
                this.player.body.velocity.setTo(0, 0);
            else {
                this.game.physics.arcade.moveToPointer(this.player, 400);
            }
        }
        else {
            this.player.body.velocity.setTo(0, 0);
        }

        this.game.physics.arcade.collide(this.player, this.squares, this.sHit, null, this);


    },
    shutdown: function () {


    },
    /******************************
     * THE GAME'S FUNCTIONS
     *******************************/
    waveGenerator: function () {
        var squareX, squareY;

        squareX = this.game.world.randomX;



            squareY =  0;


        var sh = this.squares.create(squareX, squareY, 'square');
        sh.anchor.setTo(0.5);
        sh.name = 'square' + this.waveNumber;
        sh.tint = 0x000000;
        sh.alpha=0.3;
        sh.body.collideWorldBounds = true;
        sh.body.bounce.setTo(0.8, 0.8);
        sh.body.velocity.setTo(20 + Math.random() * 60, 20 + Math.random() * 60);

        squareX = 0;



        squareY = this.game.world.randomY;




        var sg = this.squares.create(squareX, squareY, 'square');
        sg.anchor.setTo(0.5);
        sg.name = 'square' + this.waveNumber;
        sg.tint = 0x000000;
        sg.alpha=0.3;
        sg.body.collideWorldBounds = true;
        sg.body.bounce.setTo(0.8, 0.8);
        sg.body.velocity.setTo(20 + Math.random() * 60, 20 + Math.random() * 60);


        this.waveNumber -= 1;
    },
    sHit: function (player, square) {
        this.playerAlpha -= 0.1;
        player.alpha = this.playerAlpha;
        square.destroy();




    }

};