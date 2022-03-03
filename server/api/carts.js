const router = require('express').Router();
const { models: { Cart, Tea, User }} = require('../db');
module.exports = router;

// GET /api/carts/:userid/:cartid (serves up cart belonging to user with items in cart
// users can have many carts, but only one cart
//to get a cart, you would find the user, use where to find checkout=false, and that would be the cart to return
//localhost:8080/api/carts/1
router.get('/:cartid', async (req, res, next) => {
  try {
    const singleCart = await Cart.findByPk(req.params.cartid, {
      include:[Tea]
    })
    res.json(singleCart)
  } catch(err) {
    next(err)
  }
})
