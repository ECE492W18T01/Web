Vue.component('wheels', {
  props: ['data'],
  template: '<div>fr:{{ data.fr }}, fl: {{ data.fl }}, rr: {{ data.rr }}, rl: {{ data.rl }}</div>\
  <canvas id="wheel-canvas"></canvas>'
})
