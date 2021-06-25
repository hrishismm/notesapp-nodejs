const fs = require("fs");
const chalk = require("chalk");

//AddNotes
const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New Note Added");
  } else {
    console.log("Note title taken");
  }
};

//SaveNotes
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};


//ReadNotes
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title == title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(chalk.green.inverse(note.body));
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};


//ListNotes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("Your Notes"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};


//LoadNotes
const loadNotes = () => {
  try {
    const databuffer = fs.readFileSync("notes.json");
    const dataJson = databuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};


//Remove Notes
const removeNote = (title) => {
  const notes = loadNotes();
  //console.log(notes);

  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });

  if (notesToKeep.length < notes.length) {
    console.log(chalk.green.inverse("Note removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No Note removed"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
