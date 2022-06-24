const db = require("../data/db-config");
const classes = require("./wow-classes/model");
const server = require('./server');
const request = require('supertest');

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

test("sanity 1+1", () => {
  expect(1 + 1).toEqual(2);
});

test("Check environment var", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("DB model tests", () => {

  test("findAll()", async () => {
    const result = await classes.findAll();
    expect(result).toHaveLength(2);
    expect(result[1]).toHaveProperty("name", "shaman");
  });

  test("findById()", async () => {
    let result = await classes.findById(1);
    expect(result).toBeDefined();
    expect(result.class_id).toBe(1);
    expect(result.name).toBe("warrior");

    result = await classes.findById(20);
    expect(result).not.toBeDefined();
  });

  test("insert()", async () => {
    let result = await classes.insert({ name: "mage" });
    expect(result).toBeDefined();
    expect(result.class_id).toBe(3);
    expect(result.name).toBe("mage");

    result = await classes.findAll();
    expect(result).toHaveLength(3);
    expect(result[2]).toMatchObject({ name: "mage" });
  });

});

describe("HTTP tests", () => {

  test("API is up", async () => {
    let res = await request(server).get("/");
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ api: "up" });
  });

  test('GET /classes', async () => {
    let res = await request(server).get('/classes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(2);
  });

  test('GET /classes/:id', async () => {
    let res = await request(server).get('/classes/2');
    expect(res).toBeDefined();
    expect(res.body.class_id).toBe(2);
    expect(res.body.name).toBe('shaman');

    res = await request(server).get('/classes/20');
    expect(res.statusCode).toBe(404);
  });
  
});
