const SET_REQUEST_HEADER = function (ctx) {
  ctx.set('Content-Type', 'text/plain')
  ctx.set("Access-Control-Allow-Origin", '*');
}
module.exports = SET_REQUEST_HEADER