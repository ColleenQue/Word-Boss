const loginRoute = require('./login');

const constructorMethod = (app) => {
  app.use('/login', loginRoute);

  app.use('*', (req, res) => {
    res.redirect('/login');
  });
};

module.exports = constructorMethod;