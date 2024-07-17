// wallet.router.ts
import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';

const router = Router();
const walletController = new WalletController();

router.post('/topup', walletController.topUpWallet);

export default router;
