import MediaPlayer from "./MediaPlayer.js";
import AutoPlay from "./plugins/AutoPlay.js";
import AutoPause from "./plugins/AutoPause.js";
import Ads from "./plugins/indexAds.js";

const $video = document.querySelector("video");
const $buttonToggle = document.querySelectorAll(".play-pause");
const $buttonMutedToggle = document.querySelectorAll(".Header__bar--unmuted");

const player = new MediaPlayer({
  el: $video,
  buttonToggle: $buttonToggle,
  buttonMutedToggle: $buttonMutedToggle,
  plugins: [
    new AutoPlay(),
    new AutoPause(),
    new Ads(),
  ],
});

Array.prototype.forEach.call($buttonToggle, ($button) => {
  $button.onclick = () => player.toggle();
});

Array.prototype.forEach.call($buttonMutedToggle, ($button) => {
  $button.onclick = () => player.toggleMuted();
});

$video.onclick = () => player.toggle();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/assets/sw.js").catch((error) => {
    console.error(error);
  });
}
