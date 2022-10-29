const loginRoute = require('./login');
const signupRoute=require('./signup');
const homeRoutes=require('./home');
const spellingRoutes = require('./spelling');
const learnRoutes = require('./learn');

const constructorMethod = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup',signupRoute);
  app.use('/home',homeRoutes);
  app.use('/learn',learnRoutes);
  app.use('/spelling',spellingRoutes);
  app.use('*', (req, res) => {
    res.redirect('/home');
  });
};

module.exports = constructorMethod;
