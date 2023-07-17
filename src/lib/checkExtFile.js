const checkExtFile = (url) => {
  if (url) {
    const fileName = url?.split(".");
    const ext = fileName[fileName?.length - 1];
    return ext;
  }
};

export default checkExtFile;
