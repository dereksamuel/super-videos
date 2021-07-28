class Observer {
  update(data) {
    return () => {};
  }
}

class Subject extends Observer {
  constructor() {
    super();
  }

  subscribe(observer) {
    return () => {};
  }

  unsubscribe(observer) {
    return () => {};
  }
}

class BitcoinPrice extends Subject {
  constructor() {
    super();
    this.observers = [];
    this.el = document.getElementById("value");
    this.el.addEventListener("input", () => {
      this.notify(this.el.value);
    });
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.observers.findIndex((obs) => {
      return obs === observer;
    });
    this.observers.splice(index, 1);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class PriceDisplay extends Observer {
  constructor() {
    super();
    this.el = document.querySelector("#price");
  }

  update(data) {
    this.el.innerHTML = `
      <strong>$${data}</strong>
    `;
  }
}

const val = new BitcoinPrice();
const display = new PriceDisplay();

val.subscribe(display);

// setTimeout(() => {
//   val.unsubscribe(display);
// }, 10000);
