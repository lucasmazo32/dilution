import apiFunc from '../api/api';

const { featureArtist, getTracks } = apiFunc;

function getPlaylists(code, setLists) {
  featureArtist(code, 4).then(response => {
    setLists(response.playlists.items);
  });
}

export default { getPlaylists }
