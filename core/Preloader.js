Circles.Preloader = function (game) {
    Circles.GAME_WIDTH = 640;
    Circles.GAME_HEIGHT = 800;
    Circles.GAME_SCORE = 0;
    Circles.GAME_LEVEL = 1;
    
};
Circles.Preloader.prototype = {
    preload: function () {
        this.stage.backgroundColor = '#FFF';
        this.preloadBar = this.add.sprite((Circles.GAME_WIDTH - 311) / 2, (Circles.GAME_HEIGHT - 27) / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('timerBar', 'assets/img/timerBar.png');
        this.load.image('titleRow', 'assets/img/titleRow.png');
        this.load.image('headerRow', 'assets/img/headerRow.png');
        this.load.image('title', 'assets/img/title.png');
        this.load.image('coin', 'assets/img/coin.png');
        this.load.image('dialog-ready', 'assets/img/dialogready.png');
        this.load.image('dialog-win', 'assets/img/dialogwin.png');
        this.load.image('dialog-gameover', 'assets/img/dialoggameover.png');
        this.load.image('splash', 'assets/img/splash.png');
        this.load.image('splash-title', 'assets/img/splashtitle.png');
        /**fonts**/
        this.load.bitmapFont('dosis', 'assets/fonts/dosis.png', 'assets/fonts/dosis.fnt');


        //load spreadsheet
        this.load.atlas(
            'circles',
            'assets/img/circlestexture.png',
            'core/circles.json'
        );
        this.load.spritesheet('button-start', 'assets/img/buttonstart.png', 303, 301);
        
        //load sounds
        this.load.audio('happy','assets/sounds/happy_janian.mp3');
        this.load.audio('hit','assets/sounds/hit.wav');
    },
    create: function () {
        //call main menu.
        //debug
        this.state.start('MainMenu');
    }
};