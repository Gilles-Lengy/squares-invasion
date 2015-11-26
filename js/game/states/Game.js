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




    },
    shutdown: function () {





    }
    /******************************
     * THE GAME'S FUNCTIONS
     *******************************/


};