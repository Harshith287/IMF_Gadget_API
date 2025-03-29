export  function generateCodename() {
    const codenames = ['The Nightingale', 'The Kraken', 'Phantom', 'Shadow', 'Ghost'];
    return codenames[Math.floor(Math.random() * codenames.length)];
  }
  export  function generateSuccessProbability() {
    return Math.floor(Math.random() * 100);
  }