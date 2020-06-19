var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://accounts.spotify.com/authorize?client_id=eb2f4cdf393141a0b1d63c2d2647fa2c&response_type=code&redirect_uri=http://localhost:3000", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  