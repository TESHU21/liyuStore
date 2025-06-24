import { isValidObjectId } from "mongoose";

/**
 * Middleware to validate MongoDB ObjectId in route params
 * @param {string} paramName - The name of the route param to check (default: 'id')
 */
function checkId(paramName = 'id') {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error(`Invalid ID format: ${id}`);
    }

    next();
  };
}

export default checkId;
