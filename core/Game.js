Circles.Game = function (game) {
    this._circle = null;
    this._grid = null;
    this._frames = [
        'amarillo.png',
        'anaranjado.png',
        'azul.png',
        'morado.png',
        'rojo.png',
        'verde.png'
    ];
    this._framesArray = []; //arreglo de todos los circulos
    this._timerBar = null;
    this._counter = 0;
    this._startTimer = false;
    this._timer = null;
    this._timeElapsed = null;
    this._fontStyle = null;
    this._circlesHeaderArray = []; // arreglo de circulos del encabezado (temporal)
    Circles._gameCircleHeaderArray = []; //arreglo de circulos para todo el juego
    Circles._scoreText = null;
    Circles._score = 0;
    Circles._coinAsset = null;
    Circles._coinTween = null;
    Circles._counter = 0;
    Circles._gameState = 0; // 1:win | 2:game over 
};
Circles.Game.prototype = {
    create: function () {
        //******BUILD UI
        var titleRow = this.add.image(0, 0, 'titleRow');
        var headerRow = this.add.image(0, 75, 'headerRow');
        this._timerBar = this.add.image(0, 175, 'timerBar');
        var bmpTextTitle = this.add.bitmapText(15, 15, 'dosis', 'Cisrcles!!', 60);
        var bmpTextPoints = this.add.bitmapText(Circles.GAME_WIDTH - 150, 15, 'dosis', 'points: ', 25);
        Circles._scoreText = this.add.bitmapText(Circles.GAME_WIDTH - 85, 15, 'dosis', '000', 40);
        //******END BUILD UI
        this._fontStyle = {
            font: "40px Arial",
            fill: "#FFCC00",
            stroke: "#333",
            strokeThickness: 5,
            align: "center"
        };
        this._timerBar.width += 0.01;
        this._grid = this.add.group();
        var circAxisX = 60;
        var circAxisY = 200;
        var circleHeader;
        Circles._score = 0;
        Circles._coinAsset = this.add.image(0, 0, 'coin');
        Circles._coinTween = this.add.tween(Circles._coinAsset).to({
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, false, 0, 0, false);
        Circles._coinTween.onComplete.add(function () {
            Circles._coinAsset.alpha = 1;
            Circles._coinAsset.visible = false;
        }, this);
        this.recursive(this.rnd.integerInRange(0, 5));
        for (h = 0; h < 6; h++) {
            circleHeader = this.add.sprite(circAxisX, 90, 'circles', this._framesArray[h]);
            this._circlesHeaderArray.push(circleHeader);
            Circles._gameCircleHeaderArray.push(this._framesArray[h]);
            this.add.tween(circleHeader).from({
                y: -100
            }, 1000, Phaser.Easing.Bounce.Out, true, 500 + 200 * h, false);
            circAxisX += 90;
            //circleHeader = null;
        }
        circAxisX = 60;
        this._framesArray = [];
        for (c = 0; c < 6; c++) {
            this._framesArray = [];
            this.recursive(this.rnd.integerInRange(0, 5));
            for (f = 0; f < 6; f++) {
                this._grid.create(circAxisX, circAxisY, 'circles', this._framesArray[f]);
                circAxisX += 90;
            }
            circAxisX = 60;
            circAxisY += 90;
        }
        this.time.events.add(Phaser.Timer.SECOND * 3, this.startTimer, this);
        _timer = this.time.create(false);
        _timer.loop(1000, this.countDownTimer, this);
    },
    greyOutCircles: function () {
        for (carr = 0; carr < 6; carr++) {
            this._circlesHeaderArray[carr].frame = 3;
        }
    },
    readyPause: function () {
        this.game.paused = true;
        var pausedDialog = this.add.sprite(Circles.GAME_WIDTH / 2, Circles.GAME_HEIGHT / 2, 'dialog-ready');
        pausedDialog.anchor.set(0.5);
        this.input.onDown.add(function () {
            this.greyOutCircles();
            pausedDialog.destroy();
            this.game.paused = false;
            Circles.item.buildCircles(this);
        }, this);
    },
    recursive: function (index) {
        if (this._framesArray.indexOf(this._frames[index]) < 0) {
            this._framesArray.push(this._frames[index]);
            if (this._framesArray.length < 6) {
                this.recursive(this.rnd.integerInRange(0, 5));
            } else {
                return 0;
            }
        } else {
            this.recursive(this.rnd.integerInRange(0, 5));
        }
    },
    update: function () {
        if (Circles._gameState == 1) {
            this.win();
        } else if (Circles._gameState == 2) {
            this.gameOver();
        } else {
            //keep running
        }
    },
    startTimer: function () {
        this.readyPause();
        this._startTime = true;
        _timer.start();
    },
    countDownTimer: function () {
        this._timeElapsed++;
        if (this._startTime) {
            var timeLimit = 10;
            countDownSeconds = timeLimit - this._timeElapsed;
            this._timerBar.width += 21.7;
            if (countDownSeconds <= 0) {
                this.gameOver();
            }
        }
    },
    restartGame: function () {
        this._circle = null;
        this._grid = null;
        /*this._frames = [
        'amarillo.png',
        'anaranjado.png',
        'azul.png',
        'morado.png',
        'rojo.png',
        'verde.png'
    ];*/
        this._framesArray = []; //arreglo de todos los circulos
        this._timerBar = null;
        this._counter = 0;
        this._startTimer = false;
        this._timer = null;
        this._timeElapsed = null;
        this._fontStyle = null;
        this._circlesHeaderArray = []; // arreglo de circulos del encabezado (temporal)
        Circles._gameCircleHeaderArray = []; //arreglo de circulos para todo el juego
        Circles._scoreText = null;
        Circles._score = 0;
        Circles._coinAsset = null;
        Circles._coinTween = null;
        Circles._counter = 0;
        Circles._gameState = 0; // 1:win | 2:game over 
        this.state.start('Game');
    },
    gameOver: function () {
        this.game.paused = true;

        var pausedDialog = this.add.sprite(Circles.GAME_WIDTH / 2, Circles.GAME_HEIGHT / 2, 'dialog-gameover');
        pausedDialog.anchor.set(0.5);


        this.input.onDown.add(function () {
            pausedDialog.destroy();
            this.game.paused = false;

            this.restartGame();
        }, this);
    },
    win: function () {
        this.game.paused = true;
        var pausedDialog = this.add.sprite(Circles.GAME_WIDTH / 2, Circles.GAME_HEIGHT / 2, 'dialog-win');
        pausedDialog.anchor.set(0.5);
        this.input.onDown.add(function () {
            pausedDialog.destroy();
            this.game.paused = false;

            //share score on twitter
            var tweetbegin = 'http://twitter.com/home?status=';
            var tweettxt = 'I scored ' + Circles._score + ' at #Circles!! -' + window.location.href + '.';
            var finaltweet = tweetbegin + encodeURIComponent(tweettxt);
            window.open(finaltweet, '_blank');


            this.restartGame();
        }, this);
    }
};
Circles.item = {
    buildCircles: function (game) {
        game._grid.setAllChildren('inputEnabled', true);
        game._grid.callAll('events.onInputDown.add', 'events.onInputDown', this.removeCircle);
    },
    removeCircle: function (circle) {
        if (Circles._gameCircleHeaderArray[Circles._counter] == circle.frameName) {
            Circles._coinAsset.x = circle.x;
            Circles._coinAsset.y = circle.y;
            Circles._coinAsset.visible = true;
            Circles._coinTween.start();
            //anim poits.
            Circles._score += 10;
            Circles._scoreText.setText(Circles._score);
            circle.kill();
            if (Circles._counter == 5) {
                Circles._gameState = 1;
            } else {
                Circles._counter++;
            }
        } else {
            Circles._gameState = 2;
        }
    }
};
