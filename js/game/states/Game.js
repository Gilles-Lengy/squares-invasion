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

        // Sounds
        this.onTimer1 = this.add.audio('onTimer1');
        this.hitAlphaSquareSound = this.game.add.audio('hitAlphaSquare');
        this.hitBlackSquareSound = this.game.add.audio('hitBlackSquare');
        this.onEndGame = this.add.audio('onEndGame');

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
        this.game.time.events.repeat(Phaser.Timer.SECOND, this.bonusNumber, this.bonusGenerator, this);

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
            this.game.physics.arcade.moveToPointer(this.player, 345, this.game.input.activePointer, 120);
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

        var squareX, squareY, vX, vY;

        var randomBonusDirection = this.game.rnd.integerInRange(0, 1);

        switch (origin) {
            case 'top' :
                squareX = this.game.world.randomX;
                squareY = 0;
                vX = this.vxvy(randomBonusDirection);
                vY = this.vxvy(0);
                break;
            case 'right':
                squareX = this.game.world.width;
                squareY = this.game.world.randomY;
                vX = this.vxvy(1);
                vY = this.vxvy(randomBonusDirection);
                break;
            case 'bottom':
                squareX = this.game.world.randomX;
                squareY = this.game.world.height;
                vX = this.vxvy(randomBonusDirection);
                vY = this.vxvy(1);
                break;
            case 'left':
                squareX = 0;
                squareY = this.game.world.randomY;
                vX = this.vxvy(0);
                vY = this.vxvy(randomBonusDirection);
                break;
            default :
                squareX = 0;
                squareY = 0;
                vX = this.vxvy(0);
                vY = this.vxvy(0);
        }

        var s = this.squares.create(squareX, squareY, 'square');
        s.anchor.setTo(0.5);
        s.name = 'square' + this.waveNumber;
        s.tint = 0x000000;
        s.alpha = 0.3;
        s.body.collideWorldBounds = true;
        s.body.bounce.setTo(0.8, 0.8);
        s.body.velocity.setTo(vX, vY);

    },
    waveGenerator: function () {

        this.onTimer1.play();


        this.alphaSquareGenerator('top');
        this.alphaSquareGenerator('right');
        this.alphaSquareGenerator('bottom');
        this.alphaSquareGenerator('left');


        this.waveNumber -= 1;
        this.score += 1;

        this.scoreText.text = this.scoreString + this.score;
        this.scoreText.x = this.game.world.centerX - this.scoreText.textWidth / 2;

        // Stock score and best score
        this.recordBestScore();


    },
    bonusGenerator: function () {

        var bonusX, bonusY, vX, vY;

        var randomBonusSide = this.game.rnd.integerInRange(0, 3);

        var randomBonusDirection = this.game.rnd.integerInRange(0, 1);


        switch (randomBonusSide) {
            case 0 :
                bonusX = this.game.world.randomX;
                bonusY = 0;
                vX = this.vxvy(randomBonusDirection);
                vY = this.vxvy(0);
                break;
            case 1:
                bonusX = this.game.world.width;
                bonusY = this.game.world.randomY;
                vX = this.vxvy(1);
                vY = this.vxvy(randomBonusDirection);
                break;
            case 2:
                bonusX = this.game.world.randomX;
                bonusY = this.game.world.height;
                vX = this.vxvy(randomBonusDirection);
                vY = this.vxvy(1);
                break;
            case 3:
                bonusX = 0;
                bonusY = this.game.world.randomY;
                vX = this.vxvy(0);
                vY = this.vxvy(randomBonusDirection);
                break;
            default :
                bonusX = 0;
                bonusY = 0;
                vX = this.vxvy(0);
                vY = this.vxvy(0);
        }

        var b = this.bonus.create(bonusX, bonusY, 'square');
        b.anchor.setTo(0.5);
        b.name = 'bonus' + this.waveNumber;
        b.tint = 0x000000;
        b.checkWorldBounds = true;
        b.outOfBoundsKill = true;
        b.body.velocity.setTo(vX, vY);

        this.bonusNumber -= 1;

    },
    vxvy: function (direction) {
        var v;

        v = 20 + Math.random() * 60;

        if (direction === 0) {
            return v;
        } else {
            return -v;
        }

    },
    sHit: function (player, square) {

        this.hitAlphaSquareSound.play();


        this.playerAlpha -= 0.1;
        this.playerAlpha = this.playerAlpha.toFixed(1);// Pour avoir unseul chiffre après la virgule, sinon bug ! // Utiliser dans playersFlashes -> playerOriginalTint
        this.playerFlashes();

        square.destroy();
        if (this.playerAlpha == 0) {
            this.onEndGame.play();
            this.state.start('GameOver');
        }


    },
    bHit: function (player, bonus) {

        this.hitBlackSquareSound.play();

        if (this.playerAlpha < 1) {
            this.playerAlpha = parseFloat(this.playerAlpha) + 0.1;// ParseFloat otherwise it's a string I guess...

        }
        this.playerAlpha = parseFloat(this.playerAlpha).toFixed(1);// Pour avoir unseul chiffre après la virgule, sinon bug !
        player.alpha = this.playerAlpha;
        bonus.destroy();
        this.score += 10;

        this.scoreText.text = this.scoreString + this.score;
        this.scoreText.x = this.game.world.centerX - this.scoreText.textWidth / 2;

        // Stock score and best score
        this.recordBestScore();

    },
    playerFlashes: function () {
        this.player.alpha = 0.99;
        this.player.tint = 0xff0000;
        this.game.time.events.add(111, this.playerOriginalTint, this);
    },
    playerOriginalTint: function () {
        this.player.alpha = this.playerAlpha;
        this.player.tint = 0x00000;
    },

    recordBestScore: function () {
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