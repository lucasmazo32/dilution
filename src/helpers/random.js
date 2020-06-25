import apiFunc from '../api/api';

const { recommendArray, recommendTracks } = apiFunc;

const randomTracks = (code, setTrack, setLoading) => {
  recommendArray(code).then((response) => {
    const arr = [];
    const max = response.genres.length;
    while (arr.length < 3) {
      const r = response.genres[Math.floor(Math.random() * max) + 1];
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    recommendTracks(code, arr.join(',')).then((tracks) => {
      setTrack(tracks.tracks.filter((track) => track.preview_url));
      setLoading(false);
    });
  });
};

export default randomTracks;
