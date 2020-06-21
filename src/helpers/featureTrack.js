import apiFunc from '../api/api';

const { featureArtist, getTracks } = apiFunc;

export default function featureTrack(code, setTrack, setAudio) {
  let track;
  featureArtist(code).then(response => {
    const hyperRef = response.playlists.items[0].tracks.href;
    getTracks(code, hyperRef).then(givenTracks => {
      const tracks = givenTracks.items;
      let checker = true;
      while (checker) {
        track = tracks[Math.floor(Math.random() * tracks.length)].track;
        if (track.preview_url) {
          checker = false;
          setTrack(track);
          setAudio(new Audio(track.preview_url));
        }
      }
    })
  });
}
