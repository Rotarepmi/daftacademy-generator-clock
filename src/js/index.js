function* generate(start = 0) {
  while (true) {
    const curr = start++;
    const reset = yield curr;
    if (reset) start = 0;
  }
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

(function init() {
  const hCont = document.querySelector('#h');
  const mCont = document.querySelector('#m');
  const sCont = document.querySelector('#s');
  const inForm = document.querySelector('#inForm');

  const currTime = new Date();
  let s = currTime.getSeconds();
  let m = currTime.getMinutes();
  let h = currTime.getHours();

  const gen = generate(s);

  let clockInterval = this.setInterval(runClock, inForm.querySelector('input').value);

  function runClock() {
    if (s !== 59) {
      s = gen.next().value;
    }
    else {
      m += 1;

      if (m === 60) {
        m = 0;
        h += 1;

        if (h === 12) {
          h = 0;
        }
      }

      s = gen.next(true).value;
    }

    hCont.innerHTML = pad(h);
    mCont.innerHTML = pad(m);
    sCont.innerHTML = pad(s);
  }

  const updateClock = (e) => {
    e.preventDefault();

    clearInterval(clockInterval);
    clockInterval = this.setInterval(runClock, inForm.querySelector('input').value);
  }

  inForm.onsubmit = updateClock;
})();


