const Joi =  require("joi");
module.exports = {
  schema : {
    todoValid  : Joi.object().keys({
      title: Joi.string().min(3).max(50).required(),
      description: Joi.string(),
      isDone: Joi.boolean().default(false)
    })
  },

  validateBody : (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if( result.error ) {
        return res.status(400).json({
          message : result.error.details
        })
      }
      else {
        if(!req.value) {   
          req.value = {}
        }
        req.value["body"] = result.value;
        next();
      }
    }
  }  
}
