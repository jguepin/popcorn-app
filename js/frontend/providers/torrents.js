App.getTorrentsCollection = function (options) {

    var url = require('url');
    var query = {};

    if (options.genre) {
      query.genre = options.genre.toLowerCase();
    } else if (options.keywords) {
      query.keywords = options.keywords
    }

    var collectionUrl = url.format({
      protocol: 'http:',
      host: 'yts.re',
      pathname: '/api/list.json',
      query: query
    });

    // var supportedLanguages = ['english', 'french', 'dutch', 'portuguese', 'romanian', 'spanish', 'turkish', 'brazilian',
    //                           'italian', 'german', 'hungarian', 'russian', 'ukrainian', 'finnish', 'bulgarian', 'latvian'];
    //
    // if (options.page && options.page.match(/\d+/)) {
    //     var str = url.match(/\?/) ? '&' : '?';
    //     url += str + 'page=' + options.page;
    // }

    var MovieTorrentCollection = Backbone.Collection.extend({
        url: collectionUrl,
        model: App.Model.Movie,
        parse: function (data) {

            var movies = [];

            data.MovieList.forEach(function (movie) {

                var videos = {};
                var torrents = {};
                torrent = '';
                quality = '';
                var subtitles = {};

                // // Put the video and torrent list into a {quality: url} format
                // for( var k in movie.videos ) {
                //     if( typeof videos[movie.videos[k].quality] == 'undefined' ) {
                //       videos[movie.videos[k].quality] = movie.videos[k].url;
                //     }
                // }
                //
                // for( var k in movie.torrents ) {
                //   if( typeof torrents[movie.torrents[k].quality] == 'undefined' ) {
                //     torrents[movie.torrents[k].quality] = movie.torrents[k].url;
                //   }
                // }
                //
                // // Pick the worst quality by default
                // if( typeof torrents['720p'] != 'undefined' ){ quality = '720p'; torrent = torrents['720p']; }
                // else if( typeof torrents['1080p'] != 'undefined' ){ quality = '1080p'; torrent = torrents['1080p']; }
                //
                // for( var k in movie.subtitles ) {
                //     if( supportedLanguages.indexOf(movie.subtitles[k].language) < 0 ){ continue; }
                //     if( typeof subtitles[movie.subtitles[k].language] == 'undefined' ) {
                //         subtitles[movie.subtitles[k].language] = movie.subtitles[k].url;
                //     }
                // }
                //
                // if( (typeof movie.subtitles == 'undefined' || movie.subtitles.length == 0) && (typeof movie.videos == 'undefined' || movie.videos.length == 0) ){ return; }

                movies.push({
                    imdb:       movie.ImdbCode,
                    yts:        movie.MovieID,
                    title:      movie.MovieTitle,
                    year:       movie.MovieYear,
                    runtime:    0,
                    synopsis:   '',
                    voteAverage:parseFloat(movie.MovieRating),

                    image:      movie.CoverImage,
                    bigImage:   movie.CoverImage,
                    backdrop:   movie.CoverImage,

                    quality:    movie.Quality,
                    torrent:    movie.TorrentUrl,
                    torrents:   {'720p': movie.TorrentUrl},
                    videos:     {'720p': movie.TorrentUrl},
                    subtitles:  {},
                    seeders:    movie.TorrentSeeds,
                    leechers:   movie.TorrentPeers
                });
            });

            return movies;
        }
    });

    return new MovieTorrentCollection();
};
