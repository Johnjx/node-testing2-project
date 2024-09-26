exports.up = function(knex) {
    return knex.schema
        .createTable('classes', tbl => {
            tbl.increments('class_id')
            tbl.string('name', 64).unique().notNullable()
    })
    .createTable('resources', tbl => {
        tbl.increments('resource_id')
        tbl.string('resource_name', 64).unique().notNullable()
        tbl.integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('classes')
};
