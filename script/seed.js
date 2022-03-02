'use strict';

const {
  db,
  models: { User, Tea, Cart },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({
      username: 'hector',
      password: '123',
      email: 'hector@gmail.com',
      isAdmin: true,
      firstName: 'Hector',
      lastName: 'Hippo',
    }),
    User.create({
      username: 'katelyn',
      password: '123',
      email: 'katelyn@gmail.com',
      isAdmin: true,
      firstName: 'Katelyn',
      lastName: 'Miller',
    }),
    User.create({
      username: 'qina',
      password: '123',
      email: 'qina@gmail.com',
      isAdmin: true,
      firstName: 'Qina',
      lastName: 'Zeng',
    }),
    User.create({
      username: 'jessica',
      password: '123',
      email: 'jessica@gmail.com',
      isAdmin: true,
      firstName: 'Jessica',
      lastName: 'Donig',
    }),
    User.create({
      username: 'kris',
      password: '123',
      email: 'kris@gmail.com',
      isAdmin: true,
      firstName: 'Kris',
      lastName: 'Hill',
    }),
  ]);

  // Creating Teas
  const teas = [
    {
      name: 'Classic milktea',
      description: 'made with classic black tea with milk',
      price: 6,
    },
    {
      name: 'Mango milktea',
      description: 'mango flavor milktea',
      price: 9,
    },
    {
      name: 'Strawberry milktea',
      description: 'strawberry flavor milktea',
      price: 6,
    },
    {
      name: 'Matcha milktea',
      description: 'matcha flavor milktea',
      price: 5,
    },
    {
      name: 'Osmanthus Oolong Tea',
      description: 'made with osmanthus and oolong tea',
      price: 7,
    },
  ];

  // Creating Carts
  const carts = [
    {
      numberOfItems: 2,
      subTotal: 13,
      userId: 5,
    },
    {
      numberOfItems: 1,
      subTotal: 9,
      userId: 6,
    },
    {
      items: null,
      subTotal: 0,
      userId: 1,
    },
  ];

  const createdTeas = await Promise.all(
    teas.map((tea) => {
      return Tea.create(tea);
    })
  );

  const createdCarts = await Promise.all(
    carts.map((cart) => {
      return Cart.create(cart);
    })
  );

  const cart1 = createdCarts[0];
  const tea1 = createdTeas[0];
  await cart1.addTeas(tea1);

  const cart2 = createdCarts[1];
  const tea2 = createdTeas[1];
  await cart2.addTeas(tea2);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${teas.length} teas`);
  console.log(`seeded ${carts.length} carts`);

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      hector: users[2],
      katelyn: users[3],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
