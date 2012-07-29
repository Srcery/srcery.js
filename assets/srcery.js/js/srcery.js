// Create the srcery object if it doesn't exist, and find the path if it
// hasn't been provided for us.
var srcery = srcery || {path: function() {
  var path = '';
  var i = document.scripts.length;
  while (i--) {
    var testsrc = document.scripts[i].getAttribute('src');
    var pos = testsrc.search(/(src|bin)\/srcery(\.compressed)?\.js$/);
    if (pos >= 0) {
      path = testsrc.substr(0, pos);
      break;
    }
  }
  return path;
}()};

// Create a check
var hasJQuery = function() {
  return typeof jQuery !== 'undefined';
};

// Add the yepnope dynamic loading...
yepnope([{
  test: typeof jQuery !== 'undefined',
  nope: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'
}, {
  test: typeof jQuery !== 'undefined' && typeof jQuery.fn.filedrop !== 'undefined',
  nope: srcery.path + '/lib/jquery.filedrop.js'
}, {
  load: srcery.path + '/app/srcery.image.js',
  complete: function () {
    new srcery.images();
  }
}, {
  load: srcery.path + '/app/srcery.server.js',
  complete: function () {
    new srcery.server();
  }
}, {
  load: srcery.path + '/app/srcery.admin.js',
  complete: function () {
    new srcery.admin();
  }
}]);