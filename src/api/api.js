import info from './client_id'

const { client_id } = info;

const authSpotify = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const response = await fetch(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private`, requestOptions);
  console.log(response)
};

export default { authSpotify };
