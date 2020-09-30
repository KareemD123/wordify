import React, { Component } from "react";

export class VocabList extends Component {
  state = {
    listOfWords: [],
  };

  componentDidMount() {
    console.log("vocabcomponent mounted");
    let token = localStorage.getItem("token");
    return fetch("/api/users/vocabList", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
        body: JSON.stringify({ hello: "hello" }),
      }),
    })
      .then(async (res) => {
        console.log("we got a result! " + res);
        if (res.ok) {
          try {
            let listOfWords = await res.json();
            console.log(listOfWords);
            this.setState({
              listOfWords: listOfWords,
            });
            return listOfWords;
          } catch (err) {
            console.log("this is the catch err" + err);
          }
          throw new Error("Email already taken!");
        }
      })
      .then(() => console.log(this.state.listOfWords[0].name))
      .catch((error) => console.log(error));
  }

  showDef = (e) => {
    e.preventDefault();
    console.log(e.target.text);
  };

  render() {
    return (
      <div>
        <h1>This is my VocabList</h1>
        <p>Tada here are your list of words</p>
        {/* {this.state.listOfWords[0].name} */}

        <ul>
          {this.state.listOfWords.map((word) => (
            <li>
              <a href="" onClick={this.showDef} className="word">
                {word.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default VocabList;
