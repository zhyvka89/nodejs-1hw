const { Command } = require('commander');
const contactsOperations = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.getContactsList();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);

      if (!contact) {
        throw new Error(`There is no contact with id: ${id}`);
      };

      console.table(contact);
      break;

    case 'add':
      const newContact = await contactsOperations.addNewContact({ name, email, phone });
      console.log(newContact);
      console.log(`${name} is added to your contacts list`)
      break;

    case 'remove':
      const result = await contactsOperations.deleteContact(id);

      if (!result) {
        throw new Error(`Contact with id: ${id} does not exist`);
      }
      console.log(`Contact ${id} is successfuly removed`);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);