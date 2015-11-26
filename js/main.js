'use strict';

//global variables
window.onload = function () {
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

    // Game States
    game.state.add('Boot', squaresinvasion.Boot);
    game.state.add('MainMenu', squaresinvasion.MainMenu);
    game.state.add('Game', squaresinvasion.Game);
    game.state.add('GameOver', squaresinvasion.GameOver);
    game.state.add('Preload', squaresinvasion.Preload);


    game.state.start('Boot');
};