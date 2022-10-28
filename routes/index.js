const loginRoute = require('./login');
const signupRoute=require('./signup');
const homeRoutes=require('./home');
const spellingRoute=require('./spelling')

const constructorMethod = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup',signupRoute);
  app.use('/home',homeRoutes);
  app.use('/spelling', spellingRoute);
  app.use('*', (req, res) => {
    res.redirect('/home');
  });
};

module.exports = constructorMethod;
