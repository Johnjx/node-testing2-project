const classes = [
  { name: 'warrior', },
  { name: 'shaman'},
]

const resources = [
  {
    resource_name: 'rage',
    class_id: '1'
  },
  {
    resource_name: 'maelstrom',
    class_id: '2'
  }
]

exports.seed = async function(knex) {
  await knex('classes').insert(classes);
  await knex('resources').insert(resources);
};
