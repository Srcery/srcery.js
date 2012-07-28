srcery.image = function() {
};

srcery.images = function() {
  var from = null;
  jQuery('.srcery-img').each(function() {
    var src = jQuery(this).attr('src');
    //src += '?XDEBUG_SESSION_START=netbeans-xdebug';

    // Handle drag and drop images from one to another.
    this.swap = function() {
      if (from) {
        var fromSrc = jQuery(from).attr('src');
        jQuery(this).attr('src', fromSrc);
        jQuery.post(src, {
          'swap': fromSrc.match(/inst\/([0-9a-z\-]+)/i)[1]
        });
        from = null;
      }
    };

    jQuery(this).filedrop({
      paramname:'img',
      maxfiles: 5,
      maxfilesize: 2,
      url: src,
      dragStart: function(e) {
        from = this;
      },
      drop: function(e) {
        var files = e.dataTransfer.files;
        if (files === null || files === undefined || files.length === 0) {
          this.swap();
        }
      },
      uploadFinished:function(i,file,response){
        console.log('finished!');
        console.log(response);
      },
      error: function(err, file) {
        console.log(err);
      },
      beforeEach: function(file){
        if(!file.type.match(/^image\//)){
          alert('Only images are allowed!');
          return false;
        }
      },
      uploadStarted:(function(image) {
        return function(i, file, len){
          var reader = new FileReader();
          reader.onload = function(e){
            $(image).attr('src',e.target.result);
          };
          reader.readAsDataURL(file);
        };
      })(this),
      progressUpdated: function(i, file, progress) {
        console.log('Uploading...' + progress);
      }
    });
  });
};
