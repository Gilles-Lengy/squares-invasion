squaresinvasion.Preload = function() {
    this.ready = false;
};

squaresinvasion.Preload.prototype = {
    preload: function() {

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('square', 'assets/images/white-square-20.png');


        this.load.bitmapFont('squareFont', 'assets/fonts/square8blackborder1/font.png', 'assets/fonts/square8blackborder1/font.fnt');

        // Audio
        this.load.audio('onStartGame', ['assets/sounds/on-start-game.ogg', 'assets/on-start-game.mp3']);
        this.load.audio('onEndGame', ['assets/sounds/on-end-game.ogg', 'assets/on-end-game.mp3']);

        this.load.onLoadComplete.add(this.onLoadComplete, this);

    },
    create: function() {

        this.preloadBar.cropEnabled = false;

    },
    update: function() {

        if(this.ready === true) {
            this.state.start('MainMenu');
        }

    },
    onLoadComplete: function() {

        this.ready = true;

    }
};