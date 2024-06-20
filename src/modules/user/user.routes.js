const express = require('express');
const userService = require('./user.service');

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtiene una lista de usuarios paginada
 *     parameters:
 *       - in: header
 *         name: params
 *         required: false
 *         schema:
 *           type: string
 *           example: '{"perPage": 10, "page": 0, "filter": {}, "sort": {}}'
 *     responses:
 *       200:
 *         description: Lista de usuarios paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/User'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       400:
 *         description: Parámetros inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/api/user', async (req, res) => {
  try {
    let params = {};
    try {
      params = JSON.parse(req.headers['params']);
    } catch (error) {
      console.log('Error parsing params header:', error);
      return res.status(400).send('Invalid params header');
    }

    let paginated = await userService.paginated(params);
    return res.status(200).send(paginated);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.findOneById(userId);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/api/user', async (req, res) => {
  try {
    const newUser = req.body;
    const user = await userService.save(newUser);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       500:
 *         description: Error interno del servidor
 */
router.put('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await userService.update(userId, updatedUser);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.remove(userId);
    return res.status(200).send('Usuario eliminado correctamente.');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
//Codigo funciona OK
/*
// routes/user.routes.js
const express = require('express');
const userService = require('./user.service');

const router = express.Router();

// GET /api/user
router.get('/api/user', async (req, res) => {
  try {
    let params = {};
    // if (req.headers['params']) {
    //     try {
    //         params = JSON.parse(req.headers['params']);
    //     } catch (error) {
    //         console.log('Error parsing params header:', error);
    //         return res.status(400).send('Invalid params header');
    //     }
    // }
    try {
      params = JSON.parse(req.headers['params']);
    } catch (error) {
      console.log('Error parsing params header:', error);
      return res.status(400).send('Invalid params header');
    }

    let paginated = await userService.paginated(params);
    return res.status(200).send(paginated);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/user/:id
router.get('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.findOneById(userId);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/user
router.post('/api/user', async (req, res) => {
  try {
    const newUser = req.body;
    const user = await userService.save(newUser);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/user/:id
router.put('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await userService.update(userId, updatedUser);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/user/:id
router.delete('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.remove(userId);
    return res.status(200).send('Usuario eliminado correctamente.');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
*/

// Rutas Sergio
/*
const express = require("express");
const userService = require("./user.service");

const router = express.Router();

// GET /api/user
router.get("/api/user", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    params = JSON.parse(req.headers['params'])

    let paginated = await userService.paginated(params)
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

// GET /api/user/:id
router.get("/api/user/:id",  async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    const user = await userService.findOneById(userId);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/user
router.post("/api/user", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const newUser = req.body;
    console.log(newUser);
    const user = await userService.save(newUser);
    return res.status(201).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/user/:id
router.put("/api/user/:id",  async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await userService.update(userId, updatedUser);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/user/:id
router.delete("/api/user/:id", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    await userService.remove(userId);
    return res.status(200).send("Usuario eliminado correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
*/