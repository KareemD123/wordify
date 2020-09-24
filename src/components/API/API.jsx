import React, { Component } from "react";
import { getWordId } from "../../services/API";

export class API extends Component {
  state = {
    id: "",
    definition: "",
  };

  async componentDidMount() {
    let WordId = await getWordId();
    console.log(WordId);
    console.log(WordId[0].meta.id);
    console.log(WordId[0].shortdef);
    this.setState({
      id: WordId[0].meta.id,
      definition: WordId[0].shortdef,
    });
    console.log("i mounted");
  }

  render() {
    return (
      <div>
        <h1>API Page</h1>
        {this.state.id} <br />
        {this.state.definition}
      </div>
    );
  }
}

export default API;
