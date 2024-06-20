const express = require('express');
const taskService = require('./task.service');
const userService = require('../user/user.service'); // Importa el userService

const router = express.Router();

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Obtiene una lista de tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Task'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/api/task', async (req, res) => {
    try {
        const tasks = await taskService.findAll();
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.findOneById(taskId);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Crea una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Task'
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/api/task', async (req, res) => {
    try {
        const newTask = req.body;
        const task = await taskService.save(newTask);

        // Si la tarea tiene un userId, asociarla al usuario
        if (task.user) {
            await userService.addTaskToUser(task.user, task._id);
        }

        res.status(201).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Actualiza una tarea por ID
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
 *             $ref: '#/definitions/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 *       500:
 *         description: Error interno del servidor
 */
router.put('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        const task = await taskService.update(taskId, updatedTask);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await taskService.remove(taskId);
        res.status(200).send('Tarea eliminada correctamente.');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;

// Codigo funciona OK
/*
// routes/task.routes.js
const express = require('express');
const taskService = require('./task.service');
const userService = require('../user/user.service'); // Importa el userService

const router = express.Router();

// GET /api/task
router.get('/api/task', async (req, res) => {
    try {
        const tasks = await taskService.findAll();
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// GET /api/task/:id
router.get('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.findOneById(taskId);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// POST /api/task
router.post('/api/task', async (req, res) => {
    try {
        const newTask = req.body;
        const task = await taskService.save(newTask);

        // Si la tarea tiene un userId, asociarla al usuario
        if (task.user) {
            await userService.addTaskToUser(task.user, task._id);
        }

        res.status(201).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// PUT /api/task/:id
router.put('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        const task = await taskService.update(taskId, updatedTask);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// DELETE /api/task/:id
router.delete('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await taskService.remove(taskId);
        res.status(200).send('Tarea eliminada correctamente.');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
*/

// Codigo funcional
/*
// routes/task.routes.js
const express = require('express');
const taskService = require('./task.service');

const router = express.Router();

// GET /api/task
router.get('/api/task', async (req, res) => {
    try {
        const tasks = await taskService.findAll();
        res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// GET /api/task/:id
router.get('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.findOneById(taskId);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// POST /api/task 1.0

router.post('/api/task2', async (req, res) => {
    try {
        const newTask = req.body;
        const task = await taskService.save(newTask);
        res.status(201).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


// POST /api/task 2.0
router.post('/api/task', async (req, res) => {
  try {
      const newTask = req.body;
      const task = await taskService.save(newTask);

      // Si la tarea tiene un userId, asociarla al usuario
      if (task.user) {
          await userService.addTaskToUser(task.user, task._id);
      }

      res.status(201).send(task);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});

// PUT /api/task/:id
router.put('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        const task = await taskService.update(taskId, updatedTask);
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// DELETE /api/task/:id
router.delete('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await taskService.remove(taskId);
        res.status(200).send('Tarea eliminada correctamente.');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
*/