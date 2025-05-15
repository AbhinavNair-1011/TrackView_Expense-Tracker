const {Model, DataTypes, UUIDV4}= require("sequelize");
const {sequelize}= require("../database/dbConfig")

class User extends Model{

    static associate(models){
        
    }
}

User.init({
    id:{      
        type:DataTypes.UUID,  
        defaultValue:UUIDV4,
        primaryKey:true
       },
    first_name:{
        type:DataTypes.CHAR(25),
        allowNull:false,
    },
    last_name:{
        type:DataTypes.CHAR(25),
        allowNull:false,

    },
    phone:{
        type:DataTypes.BIGINT,
        allowNull:false,
        unique:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    token:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:null
    }, 
},
    {  
        sequelize,
        tableName:"users",
        timeStamps:true       
    } 
    
)

module.exports= User

