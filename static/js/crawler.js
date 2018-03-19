var app = new Vue({
  el: '#crawler',
  data: {
    message: "Hello world!",
    crawler: {
      "connected": 0,
      "motor": 0,
      "wheels": {
        "fl": 0,
        "fr": 0,
        "rl": 0,
        "rr": 0
      }
  }
});
