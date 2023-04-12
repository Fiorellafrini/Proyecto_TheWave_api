const { Course } = require("../db");

const getCourse = async () => {
    try {
        const course = await Course.findAll()
        if(!course) throw new Error ("Course not found")
        return course
    } catch (error) {
        return error.message
    }
};

module.exports = getCourse