const validationCheckToken = (token: any) => {
  if (token === '') {
    return false;
  } else {
    return true;
  }
};
export default validationCheckToken;
