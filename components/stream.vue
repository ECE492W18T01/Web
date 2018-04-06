Vue.component('stream', {
  prop: ['data'],
  template: '\
    <iframe id="feed" height=data.height src="http://172.20.138.44:8080/stream.mjpg" type="video/mp4" style="padding:1px;border:1px solid black;"></iframe>\
    '
})
