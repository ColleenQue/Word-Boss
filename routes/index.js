const loginRoute = require('./login');
const signupRoute=require('./signup');
const vocabRoute = require('./vocab');
const homeRoutes=require('./home');
const profileRoutes=require('./profile');
const { propfind } = require('./login');
const spellingRoutes = require('./spelling');

const constructorMethod = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup',signupRoute);
  app.use('/vocab', vocabRoute);
  app.use('/home',homeRoutes);
  app.use('/profile',profileRoutes);
  app.use('/spelling',spellingRoutes);
  app.use('*', (req, res) => {
    res.redirect('/home');
  });
};

module.exports = constructorMethod;
