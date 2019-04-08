function* generate(start = 0, threshold = 59) {
  while (true) {
    const curr = start++;
    yield curr;
    if (curr === threshold) start = 0;
  }
}

// padStart - the ES2017 function which fulfills strings
function pad(num) {
  return num.toString().padStart(2, '0');
}

(function clock() {
  const hCont = document.querySelector('#h');
  const mCont = document.querySelector('#m');
  const sCont = document.querySelector('#s');
  const inForm = document.querySelector('#inForm');

  const currTime = new Date();
  const sGen = generate(currTime.getSeconds());
  const mGen = generate(currTime.getMinutes());
  const hGen = generate(currTime.getHours() % 12, 11);

  // first generation gives default value
  let s = sGen.next().value;
  let m = mGen.next().value;
  let h = hGen.next().value;

  let clockInterval = this.setInterval(runClock, inForm.querySelector('input').value);

  // higher digit changes before lower reaches 60
  function runClock() {
    if (m === 59 && s === 59) h = hGen.next().value;
    if (s === 59) m = mGen.next().value;
    s = sGen.next().value;

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


