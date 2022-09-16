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
    const newObj = { ...obj, id };
    return fs.writeFile(`${this.dirPath}/${id}.json`, JSON.stringify(newObj)).then(() => newObj);
  }

  getAll() {
    console.log(fs.readdir(this.dirPath));
    return fs.readdir(this.dirPath).then(paths => {
      const promises = paths.map(path =>
        fs.lstat(`${this.dirPath}/${path}`).then(stat => {
          if (stat.isDirectory()) {
            return '';
          } else {
            const id = path.replace('.json', '');
            return this.get(id);
          }
        }));
      return Promise.all(promises);
      // console.log(object);
    });
  }
}

module.exports = SimpleDb;
