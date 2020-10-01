import React, { Component } from "react";
import Definition from "../Definition/Definition";
import { getWordId } from "../../services/API";
import "./Document.css";
import storageService from "../../services/storageService";

export class Document extends Component {
  state = {
    id: "Welcome",
    definition:
      "Copy and Paste an excerpt that you would like to find the definition of words in",
    search: "",
    paragraph: [],
    textparagraph: "",
    docName: "",
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
    console.log(e.target.name.value);
    const name = e.target.name.value;
    console.log(e.target.paragraph_text.value);
    this.setState({
      textparagraph: e.target.paragraph_text.value,
    });
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
      docName: name,
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

    let stringId = id.toString();
    var newId;
    var colon;
    if (stringId.includes(":")) {
      colon = id.indexOf(":");
      newId = stringId.slice(0, colon);
      this.setState({
        id: newId,
        definition: definition,
      });
    } else {
      console.log("word doesnt have a colon");
      this.setState({
        id: id,
        definition: definition,
      });
    }
  };

  handleSave = (e) => {
    console.log("I ran handleSave");
    console.log(this.state.id);
    const savedDoc = this.state;
    storageService.saveDoc(savedDoc);
  };

  render() {
    return (
      <div className="container">
        <div className="left-side">
          <div className="form-container">
            <span className="other-title">My Document</span>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="title-input"
                placeholder="Name your passage"
                name="name"
                onChange={this.handleChange}
              />
              <div>
                <textarea name="paragraph_text" cols="50" rows="10"></textarea>
                <div className="btn-container">
                  <input type="submit" name="submit" className="submit-save" />
                  <button onClick={this.handleSave} className="submit-save">
                    Save
                  </button>
                </div>
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
        </div>
        <div className="right-side">
          <div className="def-container">
            <span>{this.state.id}</span>
            <Definition definition={this.state.definition} />
          </div>
        </div>
      </div>
    );
  }
}

export default Document;
