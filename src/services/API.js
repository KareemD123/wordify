export function getWordId(search) {
  console.log(`API search: ${search}`);
  const wordSearch = search;
  const API_KEY = "7c0a2aa7-d004-4305-8efe-38f17184ef39";
  const endpoint = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordSearch}?key=${API_KEY}`;
  return fetch(endpoint, { mode: "cors" }).then((res) => res.json());
}
