const db = require("../data/db-config");
const classes = require('./wow-classes/model');

test("sanity 1+1", () => {
  expect(1 + 1).toEqual(2);
});

test("Check environment var", () => {
  console.log(process.env.NODE_ENV);
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("resources").truncate();
  await db("classes").truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('DB model tests', () => {

    test('findAll', async () => {
        const result = await classes.findAll();
        expect(result).toHaveLength(2);
        expect(result[1]).toHaveProperty('name', 'shaman');
    })
})
