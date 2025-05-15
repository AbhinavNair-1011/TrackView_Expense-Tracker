const User = require("./userModel");

const models={User};



Object.keys(models).forEach(model => {

    if(models[model].associate){
        models[model].associate=models
    }
    
});

module.exports=models