const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  type: { type: String, default: "movie" },
  title: { type: String, required: true },
  overview: { type: String, default: null },
  rating: { type: Number, default: null },
  voteCount: { type: Number, default: null },
  posterPath: { type: String, default: null },
  releaseDate: { type: String, default: "0000-00-00" },
  runtime: { type: Number, default: null },
  genre: { type: String, default: null },
  comments: [{
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    text: { type: String, required: true }
  }]
});

MovieSchema.pre('save', function (next, done) {
  const document = this;
  this.constructor.findOne({ id: this.id }).then(function (movie) {
    if (movie) {
      var err = new Error('Movie exists');
      // Add show
      err.movie = movie;
      return;
    } else {
      next();
    }
  });
});


module.exports = mongoose.model('Movie', MovieSchema);

/* Example response object from TMDb's Movies -> Get Details API endpoint ~ /movie/{movie_id}
{
  "adult": false,
  "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    }
  ],
  "homepage": "",
  "id": 550,
  "imdb_id": "tt0137523",
  "original_language": "en",
  "original_title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
  "popularity": 0.5,
  "poster_path": null,
  "production_companies": [
    {
      "id": 508,
      "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
      "name": "Regency Enterprises",
      "origin_country": "US"
    },
    {
      "id": 711,
      "logo_path": null,
      "name": "Fox 2000 Pictures",
      "origin_country": ""
    },
    {
      "id": 20555,
      "logo_path": null,
      "name": "Taurus Film",
      "origin_country": ""
    },
    {
      "id": 54050,
      "logo_path": null,
      "name": "Linson Films",
      "origin_country": ""
    },
    {
      "id": 54051,
      "logo_path": null,
      "name": "Atman Entertainment",
      "origin_country": ""
    },
    {
      "id": 54052,
      "logo_path": null,
      "name": "Knickerbocker Films",
      "origin_country": ""
    },
    {
      "id": 25,
      "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
      "name": "20th Century Fox",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1999-10-12",
  "revenue": 100853753,
  "runtime": 139,
  "spoken_languages": [
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "How much can you know about yourself if you've never been in a fight?",
  "title": "Fight Club",
  "video": false,
  "vote_average": 7.8,
  "vote_count": 3439
}
*/

/* Example response object from TMDb's TV -> Get Details API endpoint ~ /tv/{tv_id}
{
  "backdrop_path": "/gX8SYlnL9ZznfZwEH4KJUePBFUM.jpg",
  "created_by": [
    {
      "id": 9813,
      "credit_id": "5256c8c219c2956ff604858a",
      "name": "David Benioff",
      "gender": 2,
      "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
    },
    {
      "id": 228068,
      "credit_id": "552e611e9251413fea000901",
      "name": "D. B. Weiss",
      "gender": 2,
      "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
    }
  ],
  "episode_run_time": [
    60
  ],
  "first_air_date": "2011-04-17",
  "genres": [
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10759,
      "name": "Action & Adventure"
    }
  ],
  "homepage": "http://www.hbo.com/game-of-thrones",
  "id": 1399,
  "in_production": true,
  "languages": [
    "es",
    "en",
    "de"
  ],
  "last_air_date": "2017-08-27",
  "last_episode_to_air": {
    "air_date": "2017-08-27",
    "episode_number": 7,
    "id": 1340528,
    "name": "The Dragon and the Wolf",
    "overview": "A meeting is held in King's Landing. Problems arise in the North.",
    "production_code": "707",
    "season_number": 7,
    "show_id": 1399,
    "still_path": "/jLe9VcbGRDUJeuM8IwB7VX4GDRg.jpg",
    "vote_average": 9.145,
    "vote_count": 31
  },
  "name": "Game of Thrones",
  "next_episode_to_air": null,
  "networks": [
    {
      "name": "HBO",
      "id": 49,
      "logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
      "origin_country": "US"
    }
  ],
  "number_of_episodes": 67,
  "number_of_seasons": 7,
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_name": "Game of Thrones",
  "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  "popularity": 53.516,
  "poster_path": "/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg",
  "production_companies": [
    {
      "id": 76043,
      "logo_path": "/9RO2vbQ67otPrBLXCaC8UMp3Qat.png",
      "name": "Revolution Sun Studios",
      "origin_country": "US"
    },
    {
      "id": 3268,
      "logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
      "name": "HBO",
      "origin_country": "US"
    },
    {
      "id": 12525,
      "logo_path": null,
      "name": "Television 360",
      "origin_country": ""
    },
    {
      "id": 5820,
      "logo_path": null,
      "name": "Generator Entertainment",
      "origin_country": ""
    },
    {
      "id": 12526,
      "logo_path": null,
      "name": "Bighead Littlehead",
      "origin_country": ""
    }
  ],
  "seasons": [
    {
      "air_date": "2010-12-05",
      "episode_count": 14,
      "id": 3627,
      "name": "Specials",
      "overview": "",
      "poster_path": "/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg",
      "season_number": 0
    },
    {
      "air_date": "2011-04-17",
      "episode_count": 10,
      "id": 3624,
      "name": "Season 1",
      "overview": "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.",
      "poster_path": "/zwaj4egrhnXOBIit1tyb4Sbt3KP.jpg",
      "season_number": 1
    },
    {
      "air_date": "2012-04-01",
      "episode_count": 10,
      "id": 3625,
      "name": "Season 2",
      "overview": "The cold winds of winter are rising in Westeros...war is coming...and five kings continue their savage quest for control of the all-powerful Iron Throne. With winter fast approaching, the coveted Iron Throne is occupied by the cruel Joffrey, counseled by his conniving mother Cersei and uncle Tyrion. But the Lannister hold on the Throne is under assault on many fronts. Meanwhile, a new leader is rising among the wildings outside the Great Wall, adding new perils for Jon Snow and the order of the Night's Watch.",
      "poster_path": "/5tuhCkqPOT20XPwwi9NhFnC1g9R.jpg",
      "season_number": 2
    },
    {
      "air_date": "2013-03-31",
      "episode_count": 10,
      "id": 3626,
      "name": "Season 3",
      "overview": "Duplicity and treachery...nobility and honor...conquest and triumph...and, of course, dragons. In Season 3, family and loyalty are the overarching themes as many critical storylines from the first two seasons come to a brutal head. Meanwhile, the Lannisters maintain their hold on King's Landing, though stirrings in the North threaten to alter the balance of power; Robb Stark, King of the North, faces a major calamity as he tries to build on his victories; a massive army of wildlings led by Mance Rayder march for the Wall; and Daenerys Targaryen--reunited with her dragons--attempts to raise an army in her quest for the Iron Throne.",
      "poster_path": "/qYxRy8ZYCo2yTz7HsO6J1HWtPsY.jpg",
      "season_number": 3
    },
    {
      "air_date": "2014-04-06",
      "episode_count": 10,
      "id": 3628,
      "name": "Season 4",
      "overview": "The War of the Five Kings is drawing to a close, but new intrigues and plots are in motion, and the surviving factions must contend with enemies not only outside their ranks, but within.",
      "poster_path": "/dniQ7zw3mbLJkd1U0gdFEh4b24O.jpg",
      "season_number": 4
    },
    {
      "air_date": "2015-04-12",
      "episode_count": 10,
      "id": 62090,
      "name": "Season 5",
      "overview": "The War of the Five Kings, once thought to be drawing to a close, is instead entering a new and more chaotic phase. Westeros is on the brink of collapse, and many are seizing what they can while the realm implodes, like a corpse making a feast for crows.",
      "poster_path": "/527sR9hNDcgVDKNUE3QYra95vP5.jpg",
      "season_number": 5
    },
    {
      "air_date": "2016-04-24",
      "episode_count": 10,
      "id": 71881,
      "name": "Season 6",
      "overview": "Following the shocking developments at the conclusion of season five, survivors from all parts of Westeros and Essos regroup to press forward, inexorably, towards their uncertain individual fates. Familiar faces will forge new alliances to bolster their strategic chances at survival, while new characters will emerge to challenge the balance of power in the east, west, north and south.",
      "poster_path": "/zvYrzLMfPIenxoq2jFY4eExbRv8.jpg",
      "season_number": 6
    },
    {
      "air_date": "2017-07-16",
      "episode_count": 7,
      "id": 81266,
      "name": "Season 7",
      "overview": "The long winter is here. And with it comes a convergence of armies and attitudes that have been brewing for years.",
      "poster_path": "/3dqzU3F3dZpAripEx9kRnijXbOj.jpg",
      "season_number": 7
    }
  ],
  "status": "Returning Series",
  "type": "Scripted",
  "vote_average": 8.2,
  "vote_count": 4682
}
*/