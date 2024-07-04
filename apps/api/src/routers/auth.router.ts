import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.login);
  }

  public getRouter(): Router {
    return this.router;
  }
}
