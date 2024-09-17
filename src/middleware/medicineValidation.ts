import { join } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

/** creat a schema 
 * for add new medicine
 */
const createSchema = Joi.object ({
    name: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(1).required(),
    exp_date: Joi.date().required(),
    type: Joi.string()
            .valid("Syrup","Tablet","Powder")
            .required()
})

const createValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = createSchema.validate(req.body)
    if (validate.error) {
        return res.status(400)
        .json({
            message: validate.
            error.details.map( it => it.message).join(" ")
        });
    }

    next();
};

/** creat a schema 
 * for change medicine
 */
const updateSchema = Joi.object ({
    name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    price: Joi.number().min(1).optional(),
    exp_date: Joi.date().optional(),
    type: Joi.string()
            .valid("Syrup","Tablet","Powder")
            .optional()
})

const updateValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = updateSchema.validate(req.body)
    if (validate.error) {
        return res.status(400)
        .json({
            message: validate.
            error.details.map( it => it.message).join(" ")
        });
    }

    next();
};

const deleteScheme = Joi.object({
    name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    exp_date: Joi.date().optional(),
    price: Joi.number().min(1).optional(),
    type: Joi.string().valid("Syrup", "tablet", "powder").optional()
})

const deleteValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = deleteScheme.validate(req.body)
    if (validate.error) {
        return res.status(400).json({
            message: validate
            .error
            .details
            .map(item => item.message).join()
        })
    }

    return next()
}

export { createValidation, updateValidation,deleteValidation }