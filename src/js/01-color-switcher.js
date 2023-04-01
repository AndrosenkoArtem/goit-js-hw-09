const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
const garland = {
  colorIntervalId: null,
  isActive: false,
  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  },
  onChangeColorBody() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.colorIntervalId = setInterval(() => {
      refs.body.style.backgroundColor = this.getRandomHexColor();
    }, 1000);
  },
  onStopChangeColorBody() {
    this.isActive = false;
    clearInterval(this.colorIntervalId);
  },
};

refs.btnStart.addEventListener(
  'click',
  garland.onChangeColorBody.bind(garland)
);
refs.btnStop.addEventListener(
  'click',
  garland.onStopChangeColorBody.bind(garland)
);
