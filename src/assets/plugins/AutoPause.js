function AutoPause() {
}

function handleVisibilityChange(player, toggleButton) {
  const isVisible = document.visibilityState === "visible";
  if (isVisible) {
    toggleButton("none", "block", player.$buttonToggle);
    player.play();
  } else {
    toggleButton("block", "none", player.$buttonToggle);
    player.pause();
  }
}

AutoPause.prototype.run = (player, toggleButton) => {
  const threshold = 0.20;
  const observer = new IntersectionObserver((entries) => {
    // entries//lo que observamos
    const entry = entries[0];
    const isVisible = entry.intersectionRatio >= threshold;

    if (isVisible) {
      toggleButton("none", "block", player.$buttonToggle);
      player.play();
    } else {
      toggleButton("block", "none", player.$buttonToggle);
      player.pause();
    }
  }, {
    threshold: threshold,//porcentaje de vista del elemento
  });

  observer.observe(player.media);

  document.addEventListener("visibilitychange", () => handleVisibilityChange(player, toggleButton));
};

export default AutoPause;
