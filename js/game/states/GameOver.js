squaresinvasion.GameOver = function() {

};

squaresinvasion.GameOver.prototype = {
    create: function() {

        this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'square');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(4);
        this.player.tint = 0x000000;
        this.player.smoothed = false;
        this.player.inputEnabled = true;
        this.player.events.onInputDown.add(this.playGame, this);

        this.gameBestScoreText = this.game.add.bitmapText(0,0, 'squareFont', 'Your best score : ' + this.game.bestScore, 88);
        this.gameBestScoreText.x = this.game.world.centerX - this.gameBestScoreText.textWidth / 2;
        this.gameBestScoreText.y = this.player.y - 250;

        this.gameScoreText = this.game.add.bitmapText(0,0, 'squareFont', 'Your score : ' + this.game.score, 69);
        this.gameScoreText.x = this.game.world.centerX - this.gameScoreText.textWidth / 2;
        this.gameScoreText.y = this.player.y - 150;
        this.gameScoreText.tint = 0xdddddd;

        this.gameStartText = this.game.add.bitmapText(0,0, 'squareFont', 'Click the black square and move it around to play !!!', 32);
        this.gameStartText.x = this.game.world.centerX - this.gameStartText.textWidth / 2;
        this.gameStartText.y = this.player.y + 100;
        this.gameStartText.tint = 0xff6600;

        // Sounds
        this.onStartGame = this.game.add.audio('onStartGame');




    },
    update: function() {

    },
    playGame: function () {
        this.onStartGame.play();
        this.game.state.start('Game');
    }
};