const asyncHandler = require("express-async-handler");
const contactModel = require("../model/contactModel");

// @dec get all contacts
// @route api/contacts.
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contact = await contactModel.find({ user_id: req.user.id });
  res.status(200).send(contact);
});

// @dec Create Contact
// @route api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all filelds are mandatory");
  }
  const contact = await contactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @dec Get contact by ID
// @route api/contacts
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).send(contact);
});

// @dec update contact by ID
// @route api/contacts
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have a permission to update other user contact "
    );
  }

  const updateContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).send(updateContact);
});

// @dec delete contact by ID
// @route api/contacts
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have a permission to delete other user contact "
    );
  }
  await contactModel.deleteOne({ _id: req.params.id });
  res.status(200).send(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
