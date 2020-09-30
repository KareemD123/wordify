import React, { Component } from "react";
import { getWordId } from "../../services/API";
import storageService from "../../services/storageService";

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
    console.log(WordId[0]);
    console.log(WordId[0].shortdef);
    const id = WordId[0].meta.id;
    const definition = WordId[0].shortdef;
    let colon = id.indexOf(":");
    let stringId = id.toString();
    let newId = stringId.slice(0, colon);
    this.setState({
      id: newId,
      definition: definition,
    });
  };

  handleSave = (e) => {
    console.log("I ran handleSave");
    console.log(this.state.id);
    const savedWord = this.state;
    storageService.save(savedWord);
  };

  render() {
    return (
      <div>
        <div className="middle">
          <span className="other-title">Search</span>
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
          <button onClick={this.handleSave}>Save</button>
          {this.state.definition}
        </div>
      </div>
    );
  }
}

export default API;
