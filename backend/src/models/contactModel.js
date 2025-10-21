import { Schema, model } from "mongoose";

// Setup schema
const contactSchema = new Schema({
  name: { type: String },
  age: { type: Number },
});

const contact = model("Contact", contactSchema);
export default contact;
