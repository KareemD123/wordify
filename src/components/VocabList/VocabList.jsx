import React, { Component } from "react";

export class VocabList extends Component {
  componentDidMount() {
    console.log("vocabcomponent mounted");
  }
  render() {
    return (
      <div>
        <h1>This is my VocabList</h1>
        <p>Tada</p>
      </div>
    );
  }
}

export default VocabList;