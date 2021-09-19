const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactPath = path.join('db', 'contacts.json');

const getContactsList = async () => {
  try {
    const data = await fs.readFile(contactPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await getContactsList();
    const index = contacts.findIndex(contact => contact.id === Number(id));

    if (index === -1) {
      return null;
    }

    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
};

const addNewContact = async ({ name, email, phone }) => {
  try {
    const contacts = await getContactsList();
    const newContact = { id: uuidv4(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteContact = async(id) => {
  try {
    const contacts = await getContactsList();
    const idx = contacts.findIndex(item => item.id === Number(id));

    if (idx === -1) {
      return null;
    };

    contacts.splice(idx, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts));

    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getContactsList,
  getContactById,
  deleteContact,
  addNewContact
}