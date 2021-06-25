const notes = require("./notes");
const yargs = require("yargs");
const { listNotes } = require("./notes");
const chalk = require("chalk");

//Creating add command
yargs.version("1.1.0");
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },

  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//Creating remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
    
  },
});

//Creating list command
yargs.command({
  command: "list",
  describe: "listing notes",
  handler() {
   
    notes.listNotes();
  },
});

//Creating read command
yargs.command({
  command: "read",
  describe: "Reading notes",
  builder: {
    title: {
      describe: "Note Read",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
    
  },
});

yargs.parse();
