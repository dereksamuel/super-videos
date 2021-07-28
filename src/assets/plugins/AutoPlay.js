function AutoPlay() {}

AutoPlay.prototype.run = function (player, toggleButton) {
  player.muted = true;
  player.play();

  if (player.muted) {
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
