class Boot extends Phaser.Scene {
    constructor() {
        super({key: "Boot"});
    }

    preload() {
        this.load.image('preloadbar', 'assets/images/preload-bar.png');
    }

    create() {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;


        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        console.log('Boot created');
        //this.scene.start('Preload');
    }
}

export default Boot;