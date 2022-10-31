import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('./db/contacts.json');

const readFile = async () => {
  try {
    const data = await fs.readFileSync(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const writeFile = async (data) => {
  try {
    await fs.writeFileSync(contactsPath, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.log(error.message);
  }
};

export async function listContacts() {
  try {
    const data = await readFile();
    console.table(data);
  } catch (error) {
    console.log(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await readFile();

    const foundId = data.filter(({ id }) => id === contactId);
    console.table(foundId);
  } catch (error) {
    console.log(error.message);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await readFile();

    const foundContactIdx = data.findIndex(({ id }) => id === contactId);
    const newData = data.splice(foundContactIdx, 1);
    await writeFile(data);
    console.table(newData);
    return true;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await readFile();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    await writeFile(data);
    console.table(newContact);

    return data;
  } catch (error) {
    console.log(error.message);
  }
}
