const db = require("../../data/db-config");

function findAll() {
    return db('classes');
}

function findById(class_id) {
    return db('classes').where({class_id}).first();
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
