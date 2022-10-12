const loginRoute = require('./login');
const signupRoute=require('./signup');

const constructorMethod = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup',signupRoute);

  app.use('*', (req, res) => {
    res.redirect('/login');
  });
};

module.exports = constructorMethod;