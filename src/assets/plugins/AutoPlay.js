function AutoPlay() {}

AutoPlay.prototype.run = function (player, toggleButton) {
  // player.mute();
  // player.play();

  if (player.media.muted) {
    toggleButton("block", "none", player.$buttonMutedToggle);
  } else {
    toggleButton("none", "block", player.$buttonMutedToggle);
  }

  if (player.media.paused) {
    toggleButton("block", "none", player.$buttonToggle);
  } else {
    toggleButton("none", "block", player.$buttonToggle);
  }
};

export default AutoPlay;
