import React, { Component } from "react";

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

  render() {
    return (
      <div>
        <span className="title">Documents</span>
        <p>Tada here are your list of words</p>
        {/* {this.state.listOfDocs[0].name} */}

        <ul>
          {this.state.listOfDocs.map((word) => (
            <li>
              <a href="" onClick={this.showDef} className="word">
                {word.name}
                <br />
                {word.paragraph}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MyDocuments;
