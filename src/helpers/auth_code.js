import cookies from '../api/session';

const { setCookie } = cookies;

const getCode = () => {
  const url = window.location.href;
  const code = url.match(/code=.+&*/);
  if (code) {
    setCookie(code[0].slice(5));
    const myUrl = url.match(/.+\?/);
    if (myUrl) {
      const urlString = myUrl[0];
      window.location.replace(urlString.slice(0, urlString.length - 1));
    }
  }
};

export default getCode;
