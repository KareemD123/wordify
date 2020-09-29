// import React from 'react';

// handleDef = async (e) => {
//     e.preventDefault();
//     console.log("HandleDef Ran");
//     console.log(e.target.text);
//     const search = e.target.text;
//     let WordId = await getWordId(search);
//     console.log(WordId[0].meta.id);
//     console.log(WordId[0].shortdef);
//     const id = WordId[0].meta.id;
//     const definition = WordId[0].shortdef;
//     this.setState({
//       id: id,
//       definition: definition,
//     });