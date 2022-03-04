const router = require('express').Router();
const { models: { Cart, Tea, User }} = require('../db');
module.exports = router;

//GET /api/carts/
router.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    next(error);
  }
});

// GET /api/carts/:userid/:cartid (serves up cart belonging to user with items in cart
// users can have many carts, but only one cart
//to get a cart, you would find the user, use where to find checkout=false, and that would be the cart to return
//localhost:8080/api/carts/1
// router.get('/:cartid', async (req, res, next) => {
//   try {
//     const singleCart = await Cart.findByPk(req.params.cartid, {
//       include:[Tea]
//     })
//     res.json(singleCart)
//   } catch(err) {
//     next(err)
//   }
// })

router.get("/:credential", async (req, res, next) => {
  try {

    let foundCart
    if(Number(req.params.credential)) {
      foundCart = await Cart.findOne(
        {
          where: {
            userId: req.params.credential,
            checkedOut: false
          },
          include: [Tea]
      }
      )
      res.send(foundCart)
    } else {
      let user = await User.findByToken(req.params.credential)
      let cart = await Cart.findOne(
        {
          where: {
            userId: user.id,
            checkedOut: false
          },
          include: [Tea]
        }
      )

      res.send(cart)
    }

  } catch (error) {
    next(error)
  }
})


// router.put('/:cartid', async (req, res, next) => {
//   try {
//     const cartToUpdate = await Cart.findByPk(req.params.cartid);
//     console.log('this is req.body',req.body)
//     res.send(await cartToUpdate.update(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/:teaId/:credential', async (req, res, next)=>{
  try {
    let user = await User.findByToken(req.params.credential)
    let cart =await Cart.findOne(
      {
        where: {
          userId: user.id,
          checkedOut: false
        },
        include: [Tea]
      }
    )
    res.send(cart)
  } catch (error) {
    next(error)
  }
})
