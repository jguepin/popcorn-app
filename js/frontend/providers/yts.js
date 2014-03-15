App.findMovieInfo = function (ytsId, callback) {

  App.Cache.getItem('tmdb', ytsId, function (cachedItem) {
      if (cachedItem) {
          callback(cachedItem);
      } else {
        var url = 'http://yts.re/api/movie.json?id='+ ytsId;
        $.getJSON(url, function(data) {
          if (data) {
            // Save to cache
            App.Cache.setItem('tmdb', ytsId, data);

            // Return callback call
            callback(data);
          } else {
            callback();
          }
        });
      }
  });
};
