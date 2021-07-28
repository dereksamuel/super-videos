function MediaPlayer ({ el, buttonToggle, buttonMutedToggle, plugins = [] }) {
  this.media = el;
  this.plugins = plugins;
  this.container = null;
  this.$buttonToggle = buttonToggle;
  this.$buttonMutedToggle = buttonMutedToggle;

  this._initPlayer();
  this._initPlugins();
}

MediaPlayer.prototype._initPlayer = function () {
  this.container = document.createElement("div");
  this.container.style.position = "relative";
  this.media.parentNode.insertBefore(this.container, this.media);
  this.container.appendChild(this.media);
}

MediaPlayer.prototype._initPlugins = function () {
  const player = {
    play: () => this.play(),
    pause: () => this.pause(),
    media: this.media,
    container: this.container,
    $buttonMutedToggle: this.$buttonMutedToggle,
    $buttonToggle: this.$buttonToggle,
    get muted() {
      return this.media.muted;
    },

    set muted(value) {
      this.media.muted = value;
    },
  };

  for (const plugin of this.plugins) {
    plugin.run(player, toggleButton);
  }
}

MediaPlayer.prototype.toggle = function () {
  if (this.media.paused) {
    toggleButton("none", "block", this.$buttonToggle);
    this.play();
    return;
  }
  toggleButton("block", "none", this.$buttonToggle);
  this.pause();
};

MediaPlayer.prototype.play = function () {
  this.media.play();
};

MediaPlayer.prototype.pause = function () {
  this.media.pause();
};

MediaPlayer.prototype.mute = function () {
  this.media.muted = true;
};

MediaPlayer.prototype.unmute = function () {
  this.media.muted = false;
};

MediaPlayer.prototype.toggleMuted = function () {
  if (this.media.muted) {
    this.unmute();
    toggleButton("none", "block", this.$buttonMutedToggle);
  } else {
    this.mute();
    toggleButton("block", "none", this.$buttonMutedToggle);
  }
};

function toggleButton(one = "none", two = "none", $buttonToggle) {
  $buttonToggle[0].style.display = one;
  $buttonToggle[1].style.display = two;
}

export default MediaPlayer;
