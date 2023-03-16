import * as mongooose from 'mongoose';
// import * as unique from 'mongoose-unique-validator';
var uniqueValidator = require('mongoose-unique-validator');

export const RegisterSchema = new mongooose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String },
  email: { type: String },
  phoneNumber: { type: Number },
  password: { type: String },
});
RegisterSchema.plugin(uniqueValidator);

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
}
