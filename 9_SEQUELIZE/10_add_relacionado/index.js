const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');
const Address = require('./models/Address');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use(express.static('public'));

app.get('/users/create', (req, res) => {
    res.render('adduser');
});

app.post('/users/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    console.log(req.body);
    await User.create({ name, occupation, newsletter });

    res.redirect('/');
});

app.get('/users/:id', function (req, res) {
    const id = req.params.id;

    User.findOne({
        raw: true,
        where: {
            id: id,
        },
    })
        .then((user) => {
            console.log(user);
            res.render('userview', { user });
        })
        .catch((err) => console.log(err));
});

app.post('/users/delete/:id', (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {
            id: id,
        },
    })
    .then(() => {
        console.log('User deleted');
        res.redirect('/');
    })
   .catch((err) => console.log(err));


})

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render('useredit', { user });


})

app.post('/users/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter,
    }

    await User.update(userData, {
        where: {
            id: id,
        },
    })
   .then(() => {
        console.log('User atualizado');
        res.redirect('/');
   })
})

app.post('/address/create', async function (req, res) {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city
  
    const address = {
      street,
      number,
      city,
      UserId,
    }
  
    await Address.create(address)
      .then(
        console.log('Address created'),
        res.redirect(`/users/edit/${UserId}`))
      .catch((err) => console.log(err))
  })

app.get('/', async function (req, res) {
    const users = await User.findAll({ raw: true });

    console.log(users);

    res.render('home', { users: users });
});

conn.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));


 