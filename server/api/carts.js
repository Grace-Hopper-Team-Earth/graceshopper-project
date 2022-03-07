const router = require('express').Router();
const { models: { Cart, Tea, CartTea, User }} = require('../db');
module.exports = router;

//GET/api/carts/
router.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    next(error);
  }
});

//GET/api/carts/:credential- gets a user's current open cart
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
      let user = await User.findBy(req.params.credential)
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

//POST/api/carts/:teaId/:credential -adds a selected tea to a cart. 
//Finds the correct user and cart by userid and cart status
//hecks to see if the requested tea is already in the users cart
//- If it is, it increments the number of this item by one 
//-If it is not, if adds qty=1 of the item. 
router.post(':teaId/:credential', async (req, res, next) => {
  try {
    //find the correct user and cart--cart that is not yet checkout out and belongs to user
    let user = await User.findByToken(req.params.credential);
    let cart = await Cart.findOne(
      {
        where: {
          userId: user.id,
          checkedOut: false
        }, 
        //load all of the teas in the cart
        include: [Tea]
      }
    )

    //Search for a record of the selected tea in the users open cart, and either adds it or increments qty based on serach result
    const teaInCart = await CartTea.findOne(
      {
        where: {
          cartId: cart.id,
          teaId: req.params.teaId
        }
      }
    )
    //If this tea is not in the cart, use the magic method to add it to the user's cart
    if(!teaInCart) {
      await cart.addTea(req.params.teaId)
    } else {
      //if it is already in the cart, increment quantity by 1 using magic method
      await teaInCart.update({...teaInCart, itemQty: ++teaInCart.itemQty})
    }
    //respond with the updated cart
    res.send(cart)
  } catch (error) {
    next (error)
  }
} )

//PUT/api/carts/:teaId/:credential -allows user to edit item quantity for a selected tea
router.put(':teaId/:credential', async(req, res, next)=> {
  try {
    //find the correct user and their open cart
    let user = await User.findByToken(req.params.credential)
    let cart = await Cart.findOne(
      {
        where:{
          userId: user.id,
          checkedOut: false
        }, 
        include: [Tea]
      }
    )

    const teaInCart = await CartTea.findOne(
      {
        where: {
          cartId: cart.id,
          teaId: req.params.teaId
        }
      }
    )
    //This is an either/or update: if the tea is not in the cart, it gets added. If the cart has more than 1 of the item, it decrements.
    if (!teaInCart) {
      await cart.addTea(req.params.teaId)
    } else if(teaInCart.itemQty > 1) {
      await teaInCart.update({...teaInCart, itemQty: --teaInCart})
    }

    res.send(cart)
  } catch (error) {
    next (error)
  }
})

//DELETE/api/carts/:cartId/:teaId -deletes a tea from a user's open cart
router.delete('/:cartId/:teaId', async (req, res, next) => {
  try {
    const teaInCart = await CartTea.findOne(
      {
        where:{
          cartId: req.params.cartId,
          teaId: req.params.teaId
        }
      }
    )
    await teaInCart.destroy()

    res.sendStatus(200)
  } catch (error) {
    next (error)
  }
})

//for now I have not add checkout routes to cart