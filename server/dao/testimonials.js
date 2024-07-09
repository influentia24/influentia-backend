const testimonialModel = require('../models/testimonials.js')

module.exports.createTestimonial = async(data)=>{
    return await testimonialModel.create(data);
}
module.exports.getTestimonials = async(currentPage,limit)=>{
       const skip = (currentPage-1)*limit;
       return await testimonialModel.find().skip(skip).limit(limit).sort({createdAt:-1}) 
}