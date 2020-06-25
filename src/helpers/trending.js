import apiFunc from '../api/api';

const { featureArtist, getTracks } = apiFunc;

function getPlaylists(code, setLists) {
  featureArtist(code, 4).then((response) => {
    setLists(response.playlists.items);
  });
}

function playlistTracks(code, href, setTracks) {
  getTracks(code, href).then((response) => {
    const myArray = response.items.filter((track) => track.track.preview_url);
    setTracks(myArray.slice(0, 20));
  });
}

export default { getPlaylists, playlistTracks };
