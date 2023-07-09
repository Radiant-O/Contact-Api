const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, mail, phone } = req.body;

  if (!name || !mail || !phone) {
    res.status(400);
    throw new Error("All Fields are necessary!");
  }

  const contact = await Contact.create({
    name,
    mail,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  res.status(200).json(contact);
});

//@desc Update New contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //Prevent Other User
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Operation not allowed");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});

//@desc Delete New contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //Prevent Other User
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Operation not allowed");
  }

  // await Contact.remove();

  const delContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(delContact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
