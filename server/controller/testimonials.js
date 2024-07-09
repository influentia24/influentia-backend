const testimonialDAO = require('../dao/testimonials.js')

const createTestimonial = async (req,res)=>{
    try {
        const body = req.body;
        const data = await testimonialDAO.createTestimonial(body);
        res.status(200).json({message:'Testimonial created sucessfully',data})
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error})
    }
}


const getTestimonial = async (req,res)=>{
    try {
        const params = req.query;
        const data = await testimonialDAO.getTestimonials(params.currentPage,params.limit);
        res.status(200).json({message:'Testimonial fetched sucessfully',data})
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error})
    }
}

module.exports = {
    createTestimonial,
    getTestimonial,
}