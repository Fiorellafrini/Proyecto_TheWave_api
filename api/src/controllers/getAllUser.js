
const { User } = require("../db");


// const getAllUser = async()=>{
//     const user = await User.findAl({ where: { id } })
//     if (!user) throw Error ('error')
//     return user
// }


const getAllUser = async () => {
 
    const users = await User.findAll(); // Busca todos los usuarios en tu base de datos
    if (!users) throw Error ('error')
        return users
}

module.exports = getAllUser;

