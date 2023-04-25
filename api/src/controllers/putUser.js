const { User } = require("../db");



    const upDateUser = async (id, body) => {
        const { name,lastName,email } = body;
      
        try {
            const user = await User.findOne({ where: { id } });
            if (user) {
              await user.update({ name,lastName,email });
              return user;
            } else {
                throw new Error('The specified user was not found');
            }
          } catch (error) {
            console.log(error);
            throw new Error('There was an error updating the user');
          }
        }



  //       await product.set(body); 
  // await product.save(); 
    
        module.exports= upDateUser;