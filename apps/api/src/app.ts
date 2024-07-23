import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PORT } from './config';
import authRouter from './routers/auth.router';
import concertRouter from './routers/concert.router';
import walletRouter from './routers/wallet.router';
import locationRouter from './routers/location.router';
import categoryRouter from './routers/category.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found!');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error:', err.stack);
          res.status(500).send('Error!');
        } else {
          next();
        }
      }
    );
  }

  private routes(): void {
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/auth', authRouter);
    this.app.use('/api/concerts', concertRouter); 
    this.app.use('/api/wallet', walletRouter);
    this.app.use('/api/locations', locationRouter);
    this.app.use('/api/categories', categoryRouter);
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`➜ [API] Local: http://localhost:${PORT}/`);
    });
  }
}
