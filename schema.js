const joi= require("joi");
module.exports.listingSchema= joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price:joi.number().required().min(0),
        image: joi.object({
      url: joi.string().uri().allow("", null),
      filename: joi.string().allow("", null)
        }).required()
      
    
    }).required()
});