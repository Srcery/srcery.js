srcery.image = function() {
};

srcery.images = function() {
  jQuery('.srcery-img').each(function() {
    var src = jQuery(this).attr('src');
    jQuery(this).filedrop({
      paramname:'pic',
      maxfiles: 5,
      maxfilesize: 2,
      url: src,
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
