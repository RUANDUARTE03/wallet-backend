module.exports = {
  isEmpty: function (string) {
    return string != 0 && !string || string === 'undefined' || string === 'null' || string === '[object Object]' || string === '' || string === null;
  }
}