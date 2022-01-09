/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import { validationResult, checkSchema } from "express-validator";
import { Schema, ValidationError } from "express-validator";

const validator = (schema: Schema) => {
  return async (req: Request, res: Response, next: () => any) => {
    const validations = checkSchema(schema);
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    // is valid
    if (errors.isEmpty()) {
      return next();
    }

    // is invalid
    const result: { [key: string]: any } = {};
    errors.array().map((error: ValidationError) => {
      if (!result[error.param]) {
        result[error.param] = [];
      }

      result[error.param].push(error.msg);
    });

    res.status(400).json(result);
  };
};

export default validator;
