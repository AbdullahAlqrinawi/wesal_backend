import { Router } from 'express';
import authRoutes from '@/modules/auth/auth.routes';
import rolesRoutes from '@/modules/roles/roles.routes';
import usersRoutes from '@/modules/users/users.routes';
import hospitalsRoutes from '@/modules/hospitals/hospitals.routes';
import inventoryRoutes from '@/modules/blood-inventory/inventory.routes';
import { authMiddleware } from '@/middlewares/auth.middleware';
import bloodRequestsRoutes from '@/modules/blood-requests/blood-requests.routes';
import appointmentsRoutes from '@/modules/appointments/appointments.routes';
import campaignsRoutes from '@/modules/campaigns/campaigns.routes';
import notificationsRoutes from '@/modules/notifications/notifications.routes';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/health', (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Wisal API is running',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current authenticated payload
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current auth payload
 */
router.get('/me', authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Authenticated user payload fetched successfully',
    data: req.auth ?? null
  });
});

router.use('/auth', authRoutes);
router.use('/roles', rolesRoutes);
router.use('/users', usersRoutes);
router.use('/hospitals', hospitalsRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/blood-requests', bloodRequestsRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/campaigns', campaignsRoutes);
router.use('/notifications', notificationsRoutes);

export default router;