const BASE_URL = "/api/users/";

function save(savedWord) {
  console.log("I made it to the storage service");
  console.log(savedWord);
  return fetch(BASE_URL + "savedWord", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(savedWord),
  })
    .then((res) => {
      console.log("we got a result! " + res.json());
      console.log("res is okay!");
    })
    .catch((error) => console.log(error));
}

export default {
  save,
};
