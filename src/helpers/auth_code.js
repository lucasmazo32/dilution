import cookies from '../api/session';
import apiFunc from '../api/api';

const { accessToken } = apiFunc;
const { setCookie } = cookies;

const getCode = () => {
  const url = window.location.href;
  const code = url.match(/code=.+&*/);
  if (code) {
    const myUrl = url.match(/.+\?/);
    if (myUrl) {
      const urlString = myUrl[0];
      const credentials = accessToken(code[0].slice(5), urlString.slice(0, urlString.length - 1));
      credentials.then((response) => {
        setCookie(response.access_token, 'nav-at');
        setCookie(response.refresh_token, 'nav-rt');
        window.location.replace(urlString.slice(0, urlString.length - 1));
      });
    }
  }
};

export default getCode;
