import React, { Component } from "react";
import { getWordId } from "../../services/API";

export class API extends Component {
  state = {
    id: "",
    definition: "",
    search: "",
  };

  async componentDidMount() {
    let WordId = await getWordId();
    console.log(WordId[0].meta.id);
    console.log(WordId[0].shortdef);
    this.setState({
      id: WordId[0].meta.id,
      definition: WordId[0].shortdef,
    });
    console.log("i mounted");
  }

  handleChange = async (e) => {
    e.preventDefault();
    console.log("handleChange ran");
    console.log(e.target.value);

    const search = e.target.value;
    let WordId = await getWordId(search);
    console.log(WordId[0].meta.id);
    console.log(WordId[0].shortdef);
  };

  handleApi = async (e) => {
    e.preventDefault();
    console.log("handleApi ran");
    console.log(e.target.value);
    const search = e.target.value;
    let WordId = await getWordId(search);
    console.log(WordId[0].meta.id);
    console.log(WordId[0].shortdef);
  };

  render() {
    return (
      <div>
        <h1>API Page</h1>
        <form method="POST" action="">
          <label>
            <input
              type="text"
              onChange={() => this.handleChange}
              placeholder="Search"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.id} <br />
        {this.state.definition}
      </div>
    );
  }
}

export default API;
