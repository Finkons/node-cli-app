const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");
const newId = Math.floor(Math.random() * 100);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((contact) => contact.id === contactId);
    console.table(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  const newList = JSON.stringify(filteredContacts);
  await fs.writeFile(contactsPath, `${newList}`);
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: `${newId}`,
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    const newList = JSON.stringify([...contacts, newContact]);
    await fs.writeFile(contactsPath, `${newList}`);

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};