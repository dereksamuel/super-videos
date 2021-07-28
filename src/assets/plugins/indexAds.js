import Ads from "./Ads.js";

class AdsPlugin {
  #player;
  #media
  constructor() {
    this.ads = Ads.getInstance();
    this.currentAd;
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.adsContainer = document.createElement("section");
  }

  run(player) {
    this.#player = player;
    this.#media = player.media;
    this.#player.container.appendChild(this.adsContainer);
    this.#media.addEventListener("timeupdate", this.handleTimeUpdate);
  }

  handleTimeUpdate() {
    const currentTime = Math.ceil(this.#media.currentTime);

    console.log(currentTime);
    if (currentTime % 20 === 0) {
      this.#renderAd();
    }
  }

  #renderAd() {
    const ad = this.ads.getAd();
    this.currentAd = ad;
    this.adsContainer.innerHTML = `
      <div class="Add__container">
        <a href="${this.currentAd.url}" target="blank" class="Add__container__link">
          <img class="Add__image" src="${this.currentAd.imageUrl}" />
          <div>
            <h1 class="Add__container__title">${this.currentAd.title}</h1>
            <p class="Add__container__pharragraph">${this.currentAd.body}</p>
          </div>
        </a>
      </div>
    `;

    // setTimeout(() => {
    //   this.adsContainer.innerHTML = "";
    // }, 10000);
  }
}

export default AdsPlugin;
