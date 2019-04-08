export default class Clock {
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