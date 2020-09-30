import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  console.log("I made it to the signup");
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user),
  })
    .then(async (res) => {
      console.log("we got a result! " + res);
      if (res.ok) {
        try {
          let x = await res.json();
          console.log(x);
          return x;
        } catch (err) {
          console.log("this is the catch err" + err);
        }
        throw new Error("Email already taken!");
      }
    })
    .then(({ token }) => {
      console.log("this is the token part of signup function" + token);
      tokenService.setToken(token);
    });
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  console.log(creds.email);
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function test(user) {
  console.log("this is the test function! " + user);
}

export default {
  signup,
  getUser,
  logout,
  login,
  test,
};
