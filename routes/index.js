const loginRoute = require('./login');
const signupRoute=require('./signup');
const homeRoutes=require('./home');

const constructorMethod = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup',signupRoute);
  app.use('/home',homeRoutes);
  app.use('*', (req, res) => {
    res.redirect('/login');
  });
};

module.exports = constructorMethod;
