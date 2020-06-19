const getCode = () => {
  const url = window.location.href;
  const code = url.match(/code=.+&*/);
  console.log(code);
};

export default getCode;
