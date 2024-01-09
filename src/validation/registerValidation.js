import Joi from "joi";
import { validateEmail, validatePassword } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
});
const middleSchema = Joi.object({
  middle: Joi.string().min(2).max(256).allow(""),
});
const lastSchema = Joi.object({
  last: Joi.string().min(2).max(256).required(),
});

const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const urlSchema = Joi.object({
  url: Joi.string().min(14).allow(""),
});
const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});
const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});
const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
});
const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
});
const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
});
const houseNumberSchema = Joi.object({
  houseNumber: Joi.string().min(2).max(256).required(),
});
const zipSchema = Joi.object({
  zip: Joi.string().min(2).max(256).required(),
});

const validateFirstSchema = (first) => {
  return firstSchema.validate(first);
};
const validateMiddleSchema = (middle) => {
  return middleSchema.validate(middle);
};
const validateLastSchema = (last) => {
  return lastSchema.validate(last);
};
const validatePhoneSchema = (phone) => {
  return phoneSchema.validate(phone);
};
const validateUrlSchema = (url) => {
  return urlSchema.validate(url);
};
const validateAltSchema = (alt) => {
  return altSchema.validate(alt);
};
const validateStateSchema = (state) => {
  return stateSchema.validate(state);
};
const validateCountrySchema = (country) => {
  return countrySchema.validate(country);
};
const validateCitySchema = (city) => {
  return citySchema.validate(city);
};
const validateStreetSchema = (street) => {
  return streetSchema.validate(street);
};
const validateHouseNumberSchema = (houseNumber) => {
  return houseNumberSchema.validate(houseNumber);
};
const validateZipSchema = (zip) => {
  return zipSchema.validate(zip);
};

const validateSchema = {
  first: validateFirstSchema,
  middle: validateMiddleSchema,
  last: validateLastSchema,
  email: validateEmail,
  password: validatePassword,
  phone: validatePhoneSchema,
  url: validateUrlSchema,
  alt: validateAltSchema,
  state: validateStateSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
};

export {
  validateEmail,
  validateFirstSchema,
  validatePassword,
  validateMiddleSchema,
  validateLastSchema,
  validatePhoneSchema,
  validateUrlSchema,
  validateAltSchema,
  validateStateSchema,
  validateCountrySchema,
  validateCitySchema,
  validateStreetSchema,
  validateHouseNumberSchema,
  validateZipSchema,
  validateSchema,
};
