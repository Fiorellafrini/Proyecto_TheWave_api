// const {Course} = require("../db")

// const postCourse = async(course) =>{
//     try {
//         const {name, location, teacher} = course
//         if(!name || !location ||teacher) throw new Error("Missing Information")
//         const newCourse = await Course.create({
//             name,
//             location,
//             teacher
//         })
//         return newCourse
//     } catch (error) {
//         return error.message
//     }

// }

// module.exports = postCourse