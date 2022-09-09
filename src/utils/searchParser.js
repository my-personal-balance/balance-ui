
export const searchParser = (query) => {
  var dictionary = {};
  let searchParams = new URLSearchParams(query);
  if (searchParams.entries()) {
    for (let [key, value] of searchParams) {
      dictionary[key] = value;
    }
  }
  return dictionary;
};