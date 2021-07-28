let allAds = [];

class Ad {
  createAd({
    title,
    body,
    url,
    imageUrl,
  }) {
    return {
      title,
      body,
      url,
      imageUrl,
    };
  }
}

class Ads {
  static #instance;
  #ads = [];

  constructor() {
    this.#initAds();
  }

  static getInstance() {
    if (!Ads.#instance) {
      Ads.#instance = new Ads();
    }

    return Ads.#instance;
  }

  async #initAds() {
    allAds = await (await fetch("/assets/plugins/data.json")).json();
    this.#ads = [...allAds];// para hacer una copia de un array
  }

  getAd() {
    if (!this.#ads.length) {
      this.#initAds();
    }
    return this.#ads.pop();
  }
}

export default Ads;
