const db = require("../../data/db-config");

function findAll() {
    return db('classes');
}

function findById(id) {
    return db('classes').where({id}).first();
}

function insert(body) {
    return db('classes')
    .insert(body)
    .then(([id]) => {
      return findById(id);
    });
}

module.exports = {
  findAll,
  findById,
  insert
};
