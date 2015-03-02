Circles.MainMenu = function(game){
    this._title = null;
    this._hit = null;
};
Circles.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'splash');
		this._title = this.add.sprite((Circles.GAME_WIDTH-300)/2, 250, 'splash-title');
		// add the button that will start the game
		this._buttonstart = this.add.button((Circles.GAME_WIDTH/2)-150, Circles.GAME_HEIGHT/2, 'button-start', this.startGame, this, 1, 1,0);
        this.add.tween(this._title).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
        this._hit = new Phaser.Sound(this, 'hit', 0.3, false);
	},
	startGame: function() {
		// start the Game state
        this._hit.play();
		this.state.start('Game');
	}
};