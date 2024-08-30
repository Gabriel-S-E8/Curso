const Tought = require('../models/Tought');
const User = require('../models/User');

const { Op } = require('sequelize')



module.exports = class ToughtController {
  static async showToughts(req, res) {

    let search = ''

    if (req.query.search) {
      search = req.query.search
    }

    let order = 'DESC'

    if (req.query.order === 'old') {
      order = 'ASC'

    }else{
      order = 'DESC'
    }


    const toughts = await Tought.findAll({
      include: User,
      where:{
        title: { [Op.like]: `%${search}%`}
      },
      raw: true,
      nest: true,
      order:[['createdAt', order]]
  });

  let toughtsQty = toughts.length

  if (toughtsQty === 0) {
    toughtsQty = false
  }

  res.render('toughts/home', { toughts, search, toughtsQty});

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

    res.render('toughts/dashboard', { toughts, emptyToughts });
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

  static async updateTought(req, res) {
    const id = req.params.id

    await Tought.findOne({ where: { id: id }, raw: true })
      .then((tought) => {
        res.render('toughts/edit', { tought })
      })
      .catch((err) => console.log())
  }

  static async updateToughtSave(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };

    try {
      await Tought.update(tought, { where: { id: id } });

      req.flash('message', 'Pensamento Editado com sucesso');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (err) {
      console.log('Aconteceu um erro' + err);
    }

  }



};
