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
    User.create({
      username: 'cody@gmail.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Lomax',
    }),
    User.create({
      username: 'john@gmail.com',
      password: '123',
      firstName: 'john',
      lastName: 'doe'
    }),
    User.create({
      username: 'murphy@yahoo.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Jones'
    }),
    User.create({
      username: 'hector@gmail.com',
      password: '123',
      isAdmin: true,
      firstName: 'Hector',
      lastName: 'Hippo',
    }),
    User.create({
      username: 'katelyn@gmail.com',
      password: '123',
      isAdmin: true,
      firstName: 'Katelyn',
      lastName: 'Miller',
    }),
    User.create({
      username: 'qina@gmail.com',
      password: '123',
      isAdmin: true,
      firstName: 'Qina',
      lastName: 'Zeng',
    }),
    User.create({
      username: 'jessica@gmail.com',
      password: '123',
      isAdmin: true,
      firstName: 'Jessica',
      lastName: 'Donig',
    }),
    User.create({
      username: 'kris@gmail.com',
      password: '123',
      isAdmin: true,
      firstName: 'Kris',
      lastName: 'Hill',
    }),
  ]);

  // Creating Teas
  const teas = [
    {
      name: 'Classic Hippo Milk Tea',
      description: 'made with classic black tea with milk',
      price: 6,
      imageUrl:
        'https://abeautifulmess.com/wp-content/uploads/2013/08/no-fail-boba-pearl-method.jpg',
    },
    {
      name: 'Mango Milk Tea',
      description: 'mango flavor milktea',
      price: 9,
      imageUrl:
        'https://www.theflavorbender.com/wp-content/uploads/2020/06/Bubble-Milk-Tea-SM-7518-2.jpg',
    },
    {
      name: 'Strawberry Milk Tea',
      description: 'strawberry flavor milktea',
      price: 6,
      imageUrl:
      'http://abeautifulmess.com/wp-content/uploads/2013/08/no-fail-boba-pearl-method.jpg',
    },
    {
      name: 'Matcha Milk Tea',
      description: 'matcha flavor milktea',
      price: 5,
      imageUrl:
      'https://www.aimeemars.com/wp-content/uploads/2021/03/IMG_4398.jpg',
    },
    {
      name: 'Brown Sugar Bubble Milk Tea',
      description: 'made with brown sugar',
      price: 6,
      imageUrl:
      'https://abeautifulmess.com/wp-content/uploads/2013/08/no-fail-boba-pearl-method.jpg',
    },
    {
      name: 'Osmanthus Oolong Tea',
      description: 'made with osmanthus and oolong tea',
      price: 7,
      imageUrl:
      'https://www.theflavorbender.com/wp-content/uploads/2020/06/Bubble-Milk-Tea-SM-7518-2.jpg',
    },
    {
      name: 'Peach Oolong Tea',
      description: 'made with peach and oolong tea',
      price: 4,
      imageUrl:
      'https://abeautifulmess.com/wp-content/uploads/2013/08/no-fail-boba-pearl-method.jpg',
    },
    {
      name: '4 Season Oolong Bubble Tea',
      description: 'classic 4 season oolong tea',
      price: 4,
      imageUrl:
      'https://www.aimeemars.com/wp-content/uploads/2021/03/IMG_4398.jpg',
    },
    {
      name: 'Yogurt Strawberry Tea',
      description: 'made with fresh strawberry',
      price: 6,
      imageUrl:
      'https://abeautifulmess.com/wp-content/uploads/2013/08/no-fail-boba-pearl-method.jpg',
    },
    {
      name: 'Yogurt Mango Tea',
      description: 'made with fresh mango',
      price: 6,
      imageUrl:
      'https://www.theflavorbender.com/wp-content/uploads/2020/06/Bubble-Milk-Tea-SM-7518-2.jpg',
    },
    {
      name: 'Yogurt Dragon Fruit Tea',
      description: 'made with fresh dragon fruit',
      price: 6,
      imageUrl:
      'https://abeautifulmess.com/wp-content/uploads/2013/08/no-fail-boba-pearl-method.jpg',
    },
    {
      name: 'Yogurt Kiwi Tea',
      description: 'made with fresh kiwi',
      price: 6,
      imageUrl:
      'https://www.aimeemars.com/wp-content/uploads/2021/03/IMG_4398.jpg',
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
      murphy: users[2],
      hector: users[3],
      katelyn: users[4],
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
