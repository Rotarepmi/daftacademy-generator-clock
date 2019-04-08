import '../css/style.css';

class Clock {
  constructor(currTime) {
    this.sGen = this.generate(currTime.getSeconds());
    this.mGen = this.generate(currTime.getMinutes());
    this.hGen = this.generate(currTime.getHours() % 12, 11);

    this.s = this.sGen.next().value;
    this.m = this.mGen.next().value;
    this.h = this.hGen.next().value;
  }

  runClock() {
    if (this.m === 59 && this.s === 59) this.h = this.hGen.next().value;
    if (this.s === 59) this.m = this.mGen.next().value;
    this.s = this.sGen.next().value;
  }

  pad(num) {
    return num.toString().padStart(2, '0');  // padStart - the ES2017 function which fulfills strings
  }

  *generate(start = 0, threshold = 59) {
    while (true) {
      const curr = start++;
      yield curr;
      if (curr === threshold) start = 0;
    }
  }
}

(function run() {
  const hCont = document.querySelector('#h');
  const mCont = document.querySelector('#m');
  const sCont = document.querySelector('#s');
  const inForm = document.querySelector('#inForm');
  const inInput = inForm.querySelector('input');

  const clock = new Clock(new Date());

  function runClock() {
    clock.runClock();

    hCont.innerHTML = clock.pad(clock.h);
    mCont.innerHTML = clock.pad(clock.m);
    sCont.innerHTML = clock.pad(clock.s);
  }

  let clockInterval = window.setInterval(runClock, inInput.value);

  inForm.onsubmit = (e) => {
    e.preventDefault();

    clearInterval(clockInterval);
    clockInterval = window.setInterval(runClock, inInput.value);
  }
})();


