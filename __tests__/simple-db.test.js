const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('get:id returns object by ID', async () => {
    const objToFind = {
      name: 'test',
      age: 'newBorn'
    };
    const id = crypto.randomBytes(8).toString('hex');

    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(objToFind));
    const db = new SimpleDb(TEST_DIR);
    expect(await db.get(id)).toEqual(objToFind);
  });

  it('save should save an object', async () => {
    const objToSave = {
      name: 'weeee',
      age: 'new'
    };
    const db = new SimpleDb(TEST_DIR);

    const obj = await db.save(objToSave);
    
    expect(await db.get(obj.id)).toEqual({ ...objToSave, id: expect.any(String) });
  });

  it('getall() should return all objects in directory', async () => {
    const objects = [
      {
        age: 'that',
        name: 'sluzurp'
      },
      {
        name: 'wee',
        age: 'too young'
      },
      {
        name: 'woo',
        age: 'old enough'
      },
    ];

    const db = new SimpleDb(TEST_DIR);

    objects.forEach(async object => {
      await db.save(object);
    });

    expect(await db.getAll()).toEqual([
      {
        name: expect.any(String),
        age: expect.any(String),
        id: expect.any(String)
      },
      {
        name: expect.any(String),
        age: expect.any(String),
        id: expect.any(String)
      },
      {
        name: expect.any(String),
        age: expect.any(String),
        id: expect.any(String)
      }
    ].sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    }));
  });
});
