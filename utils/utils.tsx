export const getLastElementInURL = (str: string) => {
  const cutText = str.split('/')
  while (cutText[cutText.length - 1] === '') {
    cutText.pop()
  }
  return cutText[cutText.length - 1];
}