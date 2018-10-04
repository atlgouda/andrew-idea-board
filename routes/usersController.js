const router = require('express').Router()
const { User } = require('../db/model')

// Show all
router.get('/', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

// HOW TO USE .then INSTEAD OF ASYNC/AWAIT
// router.get('/', async (req, res) => {
//   User.find()
//   .then((response) => {
//     res.send(response)
//   })
  
// })

// Show One

router.get('/:id', async (req, res) => {
  
  // const user = await User.find(_id:req.params.id)
  //How to use with "findById"
  const user = await User.findById(req.params.id)
  res.send(user)
})

// Create - use "post" method
router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
})

// UPDATE -Must use "put"request
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.send(user)
})

// Delete - use "delete" request
router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
  res.sendStatus(200)
})


module.exports = router
