function* generate(start = 0) {
  while(true) {
    const curr = start++;
    const reset = yield curr;
    if(reset) start = 0;
  }
}

(function seconds() {
  const gen = generate();
  let s = 0;
  let m = 0;
  let h = 0;

  this.setInterval(() => {
    if(s !== 59) {
      s = gen.next().value; 
    }
    else {
      m += 1;

      if(m === 60) {
        m = 0;
        h += 1;

        if(h === 12) {
          h = 0;
        }
      }

      s = gen.next(true).value;
    }

    console.log(`${h}:${m}:${s}`);
  }, 1);
})();
