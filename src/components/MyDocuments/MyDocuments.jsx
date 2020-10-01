import React, { Component } from "react";
import storageService from "../../services/storageService";
import { getWordId } from "../../services/API";

export class MyDocuments extends Component {
  state = {
    listOfDocs: [],
  };

  componentDidMount() {
    console.log("Doc List component mounted");
    let token = localStorage.getItem("token");
    return fetch("/api/users/docList", {
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
            let listOfDocs = await res.json();
            console.log(listOfDocs);
            this.setState({
              listOfDocs: listOfDocs,
            });
            return listOfDocs;
          } catch (err) {
            console.log("this is the catch err" + err);
          }
          throw new Error("Email already taken!");
        }
      })
      .then(() => console.log(this.state.listOfDocs[0].name))
      .catch((error) => console.log(error));
  }

  showDef = (e) => {
    e.preventDefault();
    console.log(e.target.text);
  };

  handleDelete = (e) => {
    console.log("I ran handleDelete");
    console.log(e.target.value);
    var matchedName;
    let listOfDocs = this.state.listOfDocs;
    for (let i = 0; i < this.state.listOfDocs.length; i++) {
      if (e.target.value === listOfDocs[i].name) {
        console.log("We matched! " + listOfDocs[i].name);
        console.log("We matched! " + listOfDocs[i].paragraph);
        matchedName = {
          id: listOfDocs[i].name,
          paragraph: listOfDocs[i].paragraph,
        };
      }
    }
    const savedWord = matchedName;
    storageService.deleteDoc(savedWord);
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <span className="title">Documents</span>
        <p>Tada here are your list of Docs</p>

        <ul>
          {this.state.listOfDocs.map((word) => (
            <li>
              <a href="" onClick={this.showDef} className="word">
                {word.name}
                <br />
              </a>
              {word.paragraph}
              <br />
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
      </div>
    );
  }
}

export default MyDocuments;
