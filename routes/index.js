const loginRoute = require('./login');
const signupRoute=require('./signup');
const homeRoutes=require('./home');
const profileRoutes=require('./profile');
const { propfind } = require('./login');

const constructorMethod = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup',signupRoute);
  app.use('/home',homeRoutes);
  app.use('/profile',profileRoutes);
  app.use('*', (req, res) => {
    res.redirect('/home');
  });
};

module.exports = constructorMethod;
