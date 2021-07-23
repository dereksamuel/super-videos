function MediaPlayer ({ el, buttonToggle, buttonMutedToggle, plugins = [] }) {
  this.media = el;
  this.plugins = plugins;
  this.$buttonToggle = buttonToggle;
  this.$buttonMutedToggle = buttonMutedToggle;

  this._initPlugins();
}

MediaPlayer.prototype._initPlugins = function () {
  for (const plugin of this.plugins) {
    plugin.run(this, toggleButton);
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
