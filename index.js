const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((res) => console.log(res));
      break;

    case "get":
      if (!id) {
        console.log("Please enter an id, eg: node index.js -a get -i 1");
      } else {
        contacts.getContactById(id).then((res) => console.log(res));
      }
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log(
          "Please enter a name, an email address and a phone number, eg: node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22"
        );
      } else {
        contacts.addContact(name, email, phone).then((res) => console.log(res));
      }
      break;

    case "remove":
      if (!id) {
        console.log("Please enter an id, eg: node index.js -a remove -i 11");
      } else {
        contacts.removeContact(id).then((res) => console.log(res));
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
