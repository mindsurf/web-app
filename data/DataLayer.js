module.exports = function(){
    //model
    this.userModel = require('./model/userModel');

    //bussiness objects

    console.log("Data Layer Up");
    return this;
}
