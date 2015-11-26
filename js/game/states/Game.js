squaresinvasion.Game = function () {


};

squaresinvasion.Game.prototype = {
    create: function () {

        // Vars
        this.waveNumber = 1000;
        this.bonusNumber = 500;
        this.playerAlpha = 1;
        this.scoreString = "Score : ";
        this.score = 0;

        // Local storage
        // Best score
        if (!!localStorage) {
            this.bestScore = localStorage.getItem('bestScoreSquaresInvasion');
        } else {
            // Fallback. LocalStorage isn't available
            this.bestScore = 'N/A';
        }

        // Score text
        this.scoreText = this.game.add.bitmapText(10, 10, 'squareFont', this.scoreString + this.score, 88);
        this.scoreText.x = this.game.world.centerX - this.scoreText.textWidth / 2;
        this.scoreText.y = this.game.world.centerY - this.scoreText.textHeight / 2;
        this.scoreText.tint = 0xdedede;

        // Repeating events
        this.game.time.events.repeat(Phaser.Timer.SECOND, this.waveNumber, this.waveGenerator, this);
        this.game.time.events.repeat(Phaser.Timer.SECOND * 2, this.bonusNumber, this.bonusGenerator, this);

        // Player
        this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'square');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(4);
        this.player.tint = 0x000000;
        this.player.smoothed = false;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;

        // Alpha squares group
        this.squares = this.game.add.group();
        this.squares.enableBody = true;

        // Bonus squares group
        this.bonus = this.game.add.group();
        this.bonus.enableBody = true;


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

        // To handle player and alphasquare squares collision
        this.game.physics.arcade.collide(this.player, this.squares, this.sHit, null, this);
        // To handle player and bonus squares collision
        this.game.physics.arcade.collide(this.player, this.bonus, this.bHit, null, this);


    },
    shutdown: function () {
        this.player.destroy();
        this.squares.destroy();

        this.scoreText.destroy();


        this.game.score = this.score;
        this.score = 0;

        this.game.bestScore = this.bestScore;


    },
    /******************************
     * THE GAME'S FUNCTIONS
     *******************************/
    alphaSquareGenerator: function (origin) {

        var squareX, squareY;

        if (origin == 'top') {
            squareX = this.game.world.randomX;
            squareY = 0;
        }
        if (origin == 'right') {
            squareX = this.game.world.width;
            squareY = this.game.world.randomY;
        }

        if (origin == 'bottom') {
            squareX = this.game.world.randomX;
            squareY = this.game.world.height;
        }
        if (origin == 'left') {
            squareX = 0;
            squareY = this.game.world.randomY;
        }

        var s = this.squares.create(squareX, squareY, 'square');
        s.anchor.setTo(0.5);
        s.name = 'square' + this.waveNumber;
        s.tint = 0x000000;
        s.alpha = 0.3;
        s.body.collideWorldBounds = true;
        s.body.bounce.setTo(0.8, 0.8);
        s.body.velocity.setTo(20 + Math.random() * 60, 20 + Math.random() * 60);

    },
    waveGenerator: function () {

        this.alphaSquareGenerator('top');
        this.alphaSquareGenerator('right');
        this.alphaSquareGenerator('bottom');
        this.alphaSquareGenerator('left');

        this.waveNumber -= 1;
        this.score += 1;

        this.scoreText.text = this.scoreString + this.score;
        this.scoreText.x = this.game.world.centerX - this.scoreText.textWidth / 2;

        // Stock score and best score
        if (!!localStorage) {
            this.bestScoreStored = localStorage.getItem('bestScoreSquaresInvasion');
            if (!this.bestScoreStored || this.bestScore < this.score) {
                this.bestScore = this.score;
                localStorage.setItem('bestScoreSquaresInvasion', this.bestScore);
            }
        } else {
            // Fallback. LocalStorage isn't available
            this.game.bestScore = 'N/A';
        }


    },
    bonusGenerator: function () {

        var bonusX, bonusY;

        var randomBonusSide = this.game.rnd.integerInRange(0, 3);

        if (randomBonusSide == 0) {
            bonusX = this.game.world.randomX;
            bonusY = 0;
        }
        if (randomBonusSide == 1) {
            bonusX = this.game.world.width;
            bonusY = this.game.world.randomY;
        }

        if (randomBonusSide == 2) {
            bonusX = this.game.world.randomX;
            bonusY = this.game.world.height;
        }
        if (randomBonusSide == 3) {
            bonusX = 0;
            bonusY = this.game.world.randomY;
        }

        var b = this.bonus.create(bonusX, bonusY, 'square');
        b.anchor.setTo(0.5);
        b.name = 'bonus' + this.waveNumber;
        b.tint = 0x000000;
        b.checkWorldBounds = true;
        b.outOfBoundsKill = true;
        b.body.velocity.setTo(20 + Math.random() * 60, 20 + Math.random() * 60);

        this.bonusNumber -= 1;

    },
    sHit: function (player, square) {

        this.playerAlpha -= 0.1;
        this.playerAlpha = this.playerAlpha.toFixed(1);// Pour avoir unseul chiffre après la virgule, sinon bug !
        player.alpha = this.playerAlpha;
        square.destroy();
        if (this.playerAlpha == 0) {
            this.state.start('GameOver');
        }

    },
    bHit: function (player, bonus) {
        if (this.playerAlpha < 1) {
            this.playerAlpha = parseFloat(this.playerAlpha)+ 0.1;// ParseFloat otherwise it's a string I guess...

        }
        this.playerAlpha = parseFloat(this.playerAlpha).toFixed(1);// Pour avoir unseul chiffre après la virgule, sinon bug !
        player.alpha = this.playerAlpha;
        bonus.destroy();
        this.score += 10;

        this.scoreText.text = this.scoreString + this.score;
        this.scoreText.x = this.game.world.centerX - this.scoreText.textWidth / 2;

        // Stock score and best score
        if (!!localStorage) {
            this.bestScoreStored = localStorage.getItem('bestScoreSquaresInvasion');
            if (!this.bestScoreStored || this.bestScore < this.score) {
                this.bestScore = this.score;
                localStorage.setItem('bestScoreSquaresInvasion', this.bestScore);
            }
        } else {
            // Fallback. LocalStorage isn't available
            this.game.bestScore = 'N/A';
        }
    }

};