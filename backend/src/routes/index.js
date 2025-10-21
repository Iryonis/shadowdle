import { Router } from "express";
import {
  getAllContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
} from "../controllers/contactController.js";

const router = Router();

router.get("/", function (req, res) {
  res.status(200).json({
    status: "API is Working",
    message: "Welcome!",
  });
});

/**
 * @openapi
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get all contacts
 *     description: Returns all the contacts. Requires a JWT in the Authorization header.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (JWT)
 *     responses:
 *       '200':
 *         description: Returns all the contacts
 *       '401':
 *         description: Unauthorized, missing or invalid token
 */

router.route("/contacts").get(async (req, res) => {
  let response = await getAllContacts();
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(404).json(response);
  }
});

/**
 * @openapi
 * /contacts/:id:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get contact by Id
 *     description: Get contact by Id
 *     responses:
 *       '200':
 *         description: Returns the contact
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (JWT)
 */
router.route("/contacts/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    let response = await getContactById(id);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @openapi
 * /contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Create a new contact
 *     description: Create a new contact
 *     responses:
 *       '200':
 *         description: Returns the created contact
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (JWT)
 */
router.route("/contacts").post(async (req, res) => {
  const body = { name: req.body.name, age: req.body.age };
  try {
    let response = await addContact(body);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @openapi
 * /contacts/:id:
 *   put:
 *     tags:
 *       - Contacts
 *     summary: Update a contact
 *     description: Update a contact
 *     responses:
 *       '200':
 *         description: Returns the updated contact
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (JWT)
 */
router.route("/contacts/:id").put(async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  try {
    let response = await updateContact(id, name, age);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @openapi
 * /contacts/:id:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete a contact
 *     description: Delete a contact
 *     responses:
 *       '200':
 *         description: Returns data on the deleted contact
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token (JWT)
 */
router.route("/contacts/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    let response = await removeContact(id);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
