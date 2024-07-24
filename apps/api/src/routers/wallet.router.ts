import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();
const walletController = new WalletController();

router.post(
  '/top-up',
  authenticateToken,
  authorize(['ADMIN', 'CUSTOMER']),
  walletController.topUpWallet
);

export default router;
