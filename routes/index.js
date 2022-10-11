const userRoutes=require('./users');
const homeRoutes=require('./home');

const constructorMethod=(app) =>{
    app.use('/',userRoutes);
    //app.use('/home',homeRoutes);
    /*
    app.use("",(req,res)=>{
        res.redirect("/home");
    })
    app.use('*', (req,res) => {
        res.sendStatus(404);
    })
    */
}

module.exports=constructorMethod;