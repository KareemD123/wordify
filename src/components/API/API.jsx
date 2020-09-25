import React, { Component } from "react";
import { getWordId } from "../../services/API";

export class API extends Component {
  state = {
    id: "Welcome",
    definition: "Search for a word and find its definition",
    search: "",
  };

  async componentDidMount() {
    let WordId = await getWordId();
    console.log(WordId[0].meta.id);
    console.log(WordId[0].shortdef);
    console.log("i mounted");
  }

  handleChange = async (e) => {
    e.preventDefault();
    console.log("handleChange ran");
    console.log(e.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit ran");
    console.log(e.target.search.value);

    const search = e.target.search.value;
    let WordId = await getWordId(search);
    console.log(WordId[0].meta.id);
    console.log(WordId[0].shortdef);
    const id = WordId[0].meta.id;
    const definition = WordId[0].shortdef;
    this.setState({
      id: id,
      definition: definition,
    });
  };

  render() {
    return (
      <div>
        <h1>API Page</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="search"
              name="search"
              onChange={this.handleChange}
            />
            <input type="submit" name="submit" />
          </div>
        </form>
        {this.state.id} <br />
        {this.state.definition}
      </div>
    );
  }
}

export default API;
