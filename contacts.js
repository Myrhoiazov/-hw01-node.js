import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('./db/contacts.json');

const readFile = async () => {
  const data = await fs.readFileSync(contactsPath, 'utf8');
  return JSON.parse(data);
};

const writeFile = async (data) => {
  await fs.writeFileSync(contactsPath, JSON.stringify(data), 'utf8');
};

export async function listContacts() {
  const data = await readFile();
  console.table(data);
}

export async function getContactById(contactId) {
  const data = await readFile();

  const foundId = data.filter(({ id }) => id === contactId);
  console.table(foundId);
}

export async function removeContact(contactId) {
  const data = await readFile();

  const foundContactIdx = data.findIndex(({ id }) => id === contactId);
  const newData = data.splice(foundContactIdx, 1);
  await writeFile(newData);
  console.table(newData);
  return true;
}

export async function addContact(name, email, phone) {
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
}
