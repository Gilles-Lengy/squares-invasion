'use strict';

import Boot from "./game/scenes/Boot.js";

const config = {
    type: Phaser.AUTO,
    width: 777,
    height: 777,
    scale: {
        mode: Phaser.Scale.FIT,   // Scale the game to fit the window
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game in the window
    },
    // Other game configurations (e.g. scenes, physics) go here
    backgroundColor: '#fff',
    autoRound: false,
    parent: "game-container",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Boot]
};

// Create the game instance
const game = new Phaser.Game(config);