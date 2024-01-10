import Joi from "joi";
import { validateEmail } from "./loginValidation";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const subTitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().min(5).required(),
});
const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(2).max(11).required(),
});
const webSchema = Joi.object({
  web: Joi.string().min(14).allow(""),
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
  zip: Joi.string().min(2).max(256).allow(""),
});

const validateTitleSchema = (title) => titleSchema.validate(title);
const validateSubTitleSchema = (subTitle) => subTitleSchema.validate(subTitle);
const validateEmailSchema = (email) => emailSchema.validate(email);
const validateDescription = (description) =>
  descriptionSchema.validate(description);
const validatePhone = (phone) => phoneSchema.validate(phone);
const validateWeb = (web) => webSchema.validate(web);
const validateUrl = (url) => urlSchema.validate(url);
const validateAlt = (alt) => altSchema.validate(alt);
const validateState = (state) => stateSchema.validate(state);
const validateCountry = (country) => countrySchema.validate(country);
const validateCity = (city) => citySchema.validate(city);
const validateStreet = (street) => streetSchema.validate(street);
const validateHouseNumber = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZip = (zip) => zipSchema.validate(zip);

const validateSchema = {
  title: validateTitleSchema,
  subtitle: validateSubTitleSchema,
  description: validateDescription,
  phone: validatePhone,
  email: validateEmailSchema,
  web: validateWeb,
  url: validateUrl,
  alt: validateAlt,
  state: validateState,
  country: validateCountry,
  city: validateCity,
  street: validateStreet,
  houseNumber: validateHouseNumber,
  zip: validateZip,
};

export default validateSchema;
