import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Method that takes some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content, id = 1) => {
  console.log('PUT to the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id, value: content });
    const result = await request;
    console.log('Data saved to the database', result.value);
  } catch (error) {
    console.error('Error saving to the database', error);
  }
};


// TODO: Add logic for a method that gets all the content from the database
// Method to get content from the IndexedDB using the idb module
export const getDb = async () => {
  console.log('GET from the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;

    result
      ? console.log('Data retrieved from the database', result.value)
      : console.log('No data found in the database');

    return result?.value || null; // Return null if no data is found
  } catch (error) {
    console.error('Error retrieving data from the database', error);
    return null; // Return null on error to avoid breaking anything
  }
};


initdb();
