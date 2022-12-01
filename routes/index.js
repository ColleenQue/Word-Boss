const loginRoute = require('./login');
const signupRoute=require('./signup');
const vocabRoute = require('./vocab');
const quizRoute = require('./quiz');
const homeRoutes=require('./home');
const profileRoutes=require('./profile');
const paymentRoutes=require('./payment');
const { propfind } = require('./login');
const spellingRoutes = require('./spelling');
const fillBlankRoutes=require('./fillblank');
const logoutRoutes = require('./logout');
const leaderRoutes = require('./leader');

const constructorMethod = (app) => {
  app.use('/login', loginRoute);
  app.use('/signup',signupRoute);
  app.use('/vocab', vocabRoute);
  app.use('/quiz', quizRoute);
  app.use('/home',homeRoutes);
  app.use('/profile',profileRoutes);
  app.use('/spelling',spellingRoutes);
  app.use('/payment', paymentRoutes);
  app.use('/fillblank',fillBlankRoutes);
  app.use('/logout',logoutRoutes);
  app.use('/leader',leaderRoutes);
  app.use('*', (req, res) => {
    res.redirect('/home');
  });
};

module.exports = constructorMethod;
