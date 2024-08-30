const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // find the user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash('message', 'User not found');
      res.render('auth/login');

      return;
    }

    // check if the password match
    const match = await bcrypt.compareSync(password, user.password);

    if (!match) {
      req.flash('message', 'Incorrect password');
      res.render('auth/login');
    }

    // log the user
    req.session.userid = user.id;

    req.flash('message', 'login successful');

    req.session.save(() => {
      res.redirect('/');
    });
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    //password match validation
    if (password !== confirmpassword) {
      // Mensagem para o front
      req.flash('message', 'Passwords do not match!');
      res.render('auth/register');

      return;
    }

    // check if user is already registered
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash('message', 'Email already registered!');
      res.render('auth/register');
      return;
    }

    // create a pasword
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      // initialize the session
      req.session.userid = createdUser.id;

      req.flash('message', 'Registration successful!');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};
