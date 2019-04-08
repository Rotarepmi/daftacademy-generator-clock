import Clock from './Clock';
import '../css/style.css';

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


