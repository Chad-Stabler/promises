const fs = require('fs/promises');
// const path = require('path');
const crypto = require('crypto');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  get(id) {
    const way = `${this.dirPath}/${id}.json`;
    return fs.readFile(way)
      .then((object) => {
        return JSON.parse(object.toString());
      });
  }

  save(obj) {
    const id = crypto.randomBytes(8).toString('hex');
    
  }

}

module.exports = SimpleDb;
