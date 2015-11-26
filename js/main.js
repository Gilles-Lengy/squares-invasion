'use strict';

//global variables
window.onload = function () {
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

    // Game States
    game.state.add('Boot', sa.Boot);
    game.state.add('MainMenu', sa.MainMenu);
    game.state.add('Game', sa.Game);
    game.state.add('GameOver', sa.GameOver);
    game.state.add('Preload', sa.Preload);


    game.state.start('Boot');
};