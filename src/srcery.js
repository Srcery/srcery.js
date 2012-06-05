// Define the srcery object.
var srcery = {
  ready: false,
  queue: [],
  path: '',
  onReady: function(callback) {
    if (this.ready) {
      callback(this);
    }
    else {
      this.queue.push(callback);
    }
  },
  isReady: function() {
    this.ready = true;
    var queueLength = this.queue.length;
    for (var i=0; i < queueLength; i++) {
      this.queue[i](this);
    }
  }
};

// Dynamically load a javascript file.
var srceryLoad = function(src, getObject, callback) {
  var object = getObject();
  if (typeof object == 'undefined') {
    var tag = document.createElement('script');
    tag.src = src;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    setTimeout(function tryAgain() {
      object = getObject();
      if (typeof object == 'undefined') {
        setTimeout(tryAgain, 200);
      }
      else if (callback) {
        callback(object);
      }
    }, 200);
  }
  else if (callback) {
    callback(object);
  }
};

// Get the protocol for dynamically loading jQuery.
var prot = window.location.protocol;
if (prot.charAt(prot.length - 1) == ':') {
  prot = prot.substring(0, prot.length - 1);
}

// Get the src for jQuery.
var src = prot;
src += '://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';

// Load jQuery.
srceryLoad(src, function() {
  return window['jQuery'];
}, function($) {

  // Get the srcery base path.
  jQuery('script').each(function() {
    var testsrc = $(this).attr('src');
    var pos = testsrc.search(/(src|bin)\/srcery(\.compressed)?\.js$/);
    if (pos >= 0) {
      srcery.path = testsrc.substr(0, pos);
      return false;
    }
  });

  // Load srcery.image.js
  srceryLoad(srcery.path + 'src/srcery.image.js', function() {
    return srcery['image'];
  });

  // Load srcery.server.js
  srceryLoad(srcery.path + 'src/srcery.server.js', function() {
    return srcery['server'];
  });

  // Load srcery.admin.js
  srceryLoad(srcery.path + 'src/srcery.admin.js', function() {
    return srcery['admin'];
  });

  // Load jquery.filedrop.js.
  srceryLoad(srcery.path + 'lib/jquery.filedrop.js/jquery.filedrop.js', function() {
    return jQuery.fn['filedrop'];
  }, function() {
    srcery.isReady();
  });
});
