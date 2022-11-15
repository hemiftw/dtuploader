/**
 * Converts base64 to File
 * @param dataurl String
 * @param filename String
 * @returns File
 */
export const convertbase64ToFile: Function = (
  dataurl: string,
  filename: string,
  lastModified: string | number
): File => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {
    type: mime,
    lastModified:
      typeof lastModified === "string" ? parseInt(lastModified) : lastModified,
  });
};
