var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover','states/GameOver.js');
    game.load.script('credits', 'states/Credits.js');
    game.load.script('options', 'states/Options.js');
  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/background_music.mp3');
    game.load.audio('startDing', 'assets/bgm/startDing.wav');
  },
  // varios freebies found from google image search
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/BigAutumn.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/BigSummer.jpg');
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  init: function () {
    // 387/2 gets center of loading bar image
    this.loadingBar = game.make.sprite(game.world.centerX-387/2, game.height/1.5, "loading");
    this.logo       = game.make.sprite(game.world.centerX, game.height/3, 'brand');
    this.status     = game.make.text(game.world.centerX, game.height/1.58, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    game.add.sprite(0, 0, 'stars');
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("Credits",Credits);
    game.state.add("Options",Options);
  },

  addGameMusic: function () {
    music = this.add.audio('dangerous');
    music.play('', 0, 1, true);
    //.play('startMarker', startPosition, volume(0 to 1), loop t/f)
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();
    this.add.audio('startDing');  

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};
