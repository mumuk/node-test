const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const faker = require('faker');


//Создание юзера
router.post('/api/users', async (req, res) => {

  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({user});
  } catch (e) {
    res.status(400);
    res.send(`Error:, ${e.message}`)
  }
});


//Получить всех юзеров
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users);
  } catch (e) {

    res.status(404);
    res.send(`Error:, ${e.message}`)
  }
})


//Получить юзера по Id
router.get('/api/users/:id', async (req, res) => {

  try {
    const user = await User.findOne({_id: req.params.id});

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
})


// Модифицировать юзера
router.patch(`/api/users/:id`, async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = ['firstName', 'email', 'password', 'phone', 'location', 'socials'];
  const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdates) {
    return res.status(400).send({error: "Invalid user updates"})
  }
  try {
    const user = await User.findOne({_id: req.params.id});

    if (!user) {
      return res.status(404).send();
    }
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    res.send(user)
  } catch (e) {
    res.status(500).send(e);
  }
});


// Удалить юзера по Id
router.delete('/api/users/:id', async (req, res) => {

  try {
    const user = await User.findOneAndDelete({_id: req.params.id});

    if (!user) {
      return res.status(404).send();
    }

    res.send(user)

  } catch (e) {
    res.status(500).send(e);
  }
})


// Юзер инфо в пдфку и отправать
router.post('/api/user', async (req, res) => {

  const filePath = path.join(__dirname, `../../files/User_${req.body._id}.pdf`)

  try {
    const user = await User.findOne(req.body);

    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream(filePath))
    doc.text(`${user}`);
    doc.end()
    res.setHeader('Content-Type', 'application/pdf');

    let data = fs.readFileSync(filePath);

    res.contentType("application/pdf");
    res.send(data);

  } catch (e) {
    res.status(400);

    res.send(`Error:, ${e.message}`)
  }
});

// Создание фейковых юзеров
const createFakeUsers = async(amount) => {
  let usersArr = []

  for (i = 0; i < amount; i++) {
    const user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      location: {
        city: faker.address.city(),
        address: faker.address.streetAddress()
      }, socials: {
        facebook: `http://www.facebook.com/user${i}`,
        linkedIn: `https://www.linkedin.com/user${i}`,
        twitter: `https://twitter.com/user${i}`
      }
    })
    await user.save();
    usersArr.push(user)
  }
  return usersArr
}

// Создает заданное кол-во юзеров и сохраняет в файл с нужным именем
router.post('/api/createfakeusers', async (req, res) => {

  const {amount, fileName} = req.body

  const fakeUsers = JSON.stringify(createFakeUsers(amount), 2)


  const filePath = path.join(__dirname, `../../files/${fileName}.pdf`)

  try {
    if (fs.existsSync(filePath)) {
      res.send('Такой  файл существует');
    } else {
      const doc = new PDFDocument()
      doc.pipe(fs.createWriteStream(`${filePath}`))
      doc.text(`${fakeUsers}`);
      doc.end()
    }

    let data = fs.readFileSync(filePath);
    res.contentType("application/pdf");
    res.send(data);
  } catch (e) {

  }
});


module.exports = router
