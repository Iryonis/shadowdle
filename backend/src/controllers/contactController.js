import Contact from "../models/contactModel.js";

// Get all contacts
export async function getAllContacts() {
  let total = await Contact.countDocuments({});
  let limit = parseInt(total);

  try {
    const contacts = await Contact.find().limit(limit);
    return {
      success: true,
      data: contacts,
      total: total.toString(),
    };
  } catch (err) {
    return { success: false, message: "Contacts not found " + err };
  }
}

// Get contact by Id
export async function getContactById(id) {
  try {
    const contact = await Contact.findById(id);
    return { success: true, data: contact };
  } catch (err) {
    return { success: false, message: "Contact not found " + id + ": " + err };
  }
}

// Add a new contact, returns the added contact
export async function addContact(body) {
  try {
    const newContact = await Contact.insertOne(body);
    return { success: true, data: newContact };
  } catch (err) {
    return { success: false, message: "Failed to add contact " + err };
  }
}

// Update an existing contact
export async function updateContact(id, name = null, age = null) {
  try {
    const updatedContact = await Contact.updateOne(
      { _id: id },
      { name: name, age: age }
    );
    return { success: true, data: updatedContact };
  } catch (err) {
    return {
      success: false,
      message: "Failed to update contact " + id + ": " + err,
    };
  }
}

// Remove an existing contact
export async function removeContact(id) {
  try {
    const deleted = await Contact.deleteOne({ _id: id });
    return { success: true, data: deleted };
  } catch (err) {
    return {
      success: false,
      message: "Failed to delete contact " + id + ": " + err,
    };
  }
}
