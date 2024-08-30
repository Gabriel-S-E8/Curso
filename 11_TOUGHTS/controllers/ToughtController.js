const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.render('toughts/home');
  }

  static async dashboard(req, res) {
    const UserId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: UserId,
      },
      include: Tought,
      plain: true,
    });

    // check if user exists
    if (!user) {
      res.redirect('/login');
    }

    const toughts = user.Toughts.map((results) => results.dataValues);

    let emptyToughts = false

    if (toughts.length === 0) {
        emptyToughts = true;
    }

    res.render('toughts/dashboard', { toughts });
  }

  static createTought(req, res) {
    res.render('toughts/create');
  }

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Tought.create(tought);

      req.flash('message', 'Pensamento registrado com sucesso');
      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log('Aconteceu um erro' + err);
    }
  }

  static async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } });

      req.flash('message', 'Pensamento removed');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log('Aconteceu um erro' + err);
    }
  }
};
