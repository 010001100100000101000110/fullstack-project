// const Joi = require("joi");
// const { check, validationResult } = require("express-validator");
// const database = require("./databases/wordpairDBFunctions.js");

// const idSchema = Joi.number().integer().min(1).required();

// const validating = {
//   async existsInDatabase(id) {
//     console.info("looking for id in database...");
//     try {
//       const foundById = await database.queryDatabase(
//         `SELECT * FROM Locations WHERE id = ?`,
//         [id],
//       );
//       if (foundById.length === 0) {
//         throw {
//           error: `Location with ID ${id} not found.`,
//           suggestion: "Verify the ID or check available locations.",
//         };
//       }
//     } catch (err) {
//       throw {
//         error: `Location with ID ${id} not found.`,
//         suggestion: "Verify the ID or check available locations.",
//       };
//     }
//   },

//   validateId(id) {
//     console.info(`validating id ${id}...`);
//     const { error } = idSchema.validate(id);
//     if (error) {
//       throw {
//         error: "Invalid ID format. ID should be a positive integer.",
//         suggestion: "Ensure the ID is a valid integer.",
//       };
//     }
//   },

//   validateLocationReq(locationReq) {
//     console.info(`validating location ${locationReq.body}...`);
//     const errors = validationResult(locationReq);
//     if (!errors.isEmpty()) {
//       throw {
//         error:
//           "Invalid data format. Latitude and longitude must be numbers. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180",
//         suggestion:
//           "Check the data format and ensure latitude and longitude are provided as numbers.",
//       };
//     }
//   },

//   validateFiltering(query) {
//     if (!query.latitude && !query.longitude) {
//       throw {
//         error:
//           "Invalid filter type. Filter can only be 'latitude' or 'longitude'.",
//       };
//     }
//     if (query.latitude) {
//       if (isNaN(query.latitude)) {
//         throw {
//           error: "Invalid latitude value. Latitude must be a number.",
//           suggestion: "Ensure the latitude value is a valid number.",
//         };
//       }
//     }

//     if (query.longitude) {
//       if (isNaN(query.longitude)) {
//         throw {
//           error: "Invalid longitude value. Longitude must be a number.",
//           suggestion: "Ensure the longitude value is a valid number.",
//         };
//       }
//     }
//   },

//   putPostInputValidation: [
//     check("latitude")
//       .exists()
//       .withMessage("Latitude is required")
//       .isFloat({ min: -90, max: 90 })
//       .withMessage("Latitude must be a number between -90 and 90"),
//     check("longitude")
//       .exists()
//       .withMessage("Longitude is required")
//       .isFloat({ min: -180, max: 180 })
//       .withMessage("Longitude must be a number between -180 and 180"),
//   ],

//   patchInputValidation: [
//     check("latitude")
//       .optional()
//       .isFloat({ min: -90, max: 90 })
//       .withMessage("Latitude must be a number between -90 and 90"),
//     check("longitude")
//       .optional()
//       .isFloat({ min: -180, max: 180 })
//       .withMessage("Longitude must be a number between -180 and 180"),
//   ],
// };
// module.exports = validating;
