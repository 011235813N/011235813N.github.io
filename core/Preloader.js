Circles.Preloader = function (game) {
    Circles.GAME_WIDTH = 640;
    Circles.GAME_HEIGHT = 800;
    Circles.GAME_SCORE = 0;
    
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
        /**fonts**/
        this.load.bitmapFont('dosis', 'assets/fonts/dosis.png', 'assets/fonts/dosis.fnt');


        //load spreadsheet
        this.load.atlas(
            'circles',
            'assets/img/circlestexture.png',
            'core/circles.json'
        );
    },
    create: function () {
        //call main menu.
        //debug
        this.state.start('Game');
    }
};