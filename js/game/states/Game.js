sa.Game = function () {


};

sa.Game.prototype = {
    create: function () {


        this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'square');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(4);
        this.player.tint = 0x000000;
        this.player.smoothed = false;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;


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


    },
    shutdown: function () {


    }
    /******************************
     * THE GAME'S FUNCTIONS
     *******************************/


};