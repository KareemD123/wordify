import React, { Component } from "react";
import storageService from "../../services/storageService";

export class VocabList extends Component {
  state = {
    listOfWords: [],
    matchedDef: "",
    displayDef: false,
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
    this.setState({
      displayDef: !this.state.displayDef,
    });
    let listOfWords = this.state.listOfWords;
    console.log(listOfWords);
    console.log(e.target.text);
    var matchedDef;
    for (let i = 0; i < this.state.listOfWords.length; i++) {
      if (e.target.text == listOfWords[i].name) {
        console.log("We matched! " + listOfWords[i].name);
        console.log("We matched! " + listOfWords[i].definition);
        matchedDef = listOfWords[i].definition;
        this.setState({
          matchedDef: matchedDef,
        });
      }
    }
  };

  handleDelete = (e) => {
    console.log("I ran handleDelete");
    console.log(e.target.value);
    var matchedName;
    let listOfWords = this.state.listOfWords;
    for (let i = 0; i < this.state.listOfWords.length; i++) {
      if (e.target.value === listOfWords[i].name) {
        console.log("We matched! " + listOfWords[i].name);
        console.log("We matched! " + listOfWords[i].definition);
        matchedName = {
          id: listOfWords[i].name,
          definition: listOfWords[i].definition,
        };
      }
    }
    const savedWord = matchedName;
    storageService.deleteWord(savedWord);
    this.componentDidMount();
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
              <button
                type="Submit"
                value={word.name}
                onClick={this.handleDelete}
                className="submit-save"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {this.state.matchedDef}
      </div>
    );
  }
}

export default VocabList;
