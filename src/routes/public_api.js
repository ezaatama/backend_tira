import express from 'express';
import userController from '../controller/user_controller.js';

const publicRouter = new express.Router();
publicRouter.get("/hello", (req, res) => {
  res.json({ message: "Hello from API" });
});
publicRouter.post('/api/login', userController.login);

export {
    publicRouter
}