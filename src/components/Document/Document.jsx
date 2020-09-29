import React, { Component } from "react";
import Definition from "../Definition/Definition";
import { getWordId } from "../../services/API";
import "./Document.css"

export class Document extends Component {
  state = {
    id: "Welcome",
    definition:
      "Copy and Paste an excerpt that you would like to find the definition of words in",
    search: "",
    paragraph: [],
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

  // document submission page
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit ran");
    console.log(e.target.paragraph_text.value);

    const paragraph = e.target.paragraph_text.value;
    const myParagraph = `${paragraph}`;
    // splits up submitted text
    const splitString = myParagraph.split(" ");
    for (let i = 0; i < splitString.length - 1; i++) {
      splitString[i] += " ";
    }
    console.log("this is the splitString: " + splitString);
    this.setState({
      paragraph: splitString,
    });
  };
  
  // definition component
  handleDef = async (e) => {
    e.preventDefault();
    console.log("HandleDef Ran");
    console.log(e.target.text);
    const search = e.target.text;
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
      <div className="container">
        <div className="left-side">
          <span className="other-title">My Document</span>
          <form onSubmit={this.handleSubmit}>
            <div>
              <textarea name="paragraph_text" cols="50" rows="10"></textarea>
              <div className="btn-container"><input type="submit" name="submit" /></div>
            </div>
          </form>
          <p>
            {this.state.paragraph.map((word) => (
              <a href="/document" onClick={this.handleDef} className="word">
                {word}
              </a>
            ))}
          </p>
        </div>
        <div className="right-side">
          <h3>Word : {this.state.id}</h3>
          <Definition definition={this.state.definition}/>
        </div>
      </div>
    );
  }
}

export default Document;
