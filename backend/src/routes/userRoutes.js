const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');
const {
  getUsers,
  getUser,
  updateUserRole,
  toggleUserStatus,
  deleteUser
} = require('../controllers/userController');

router.use(protect);
router.use(isAdmin);

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id/role', updateUserRole);
router.put('/:id/toggle-status', toggleUserStatus);
router.delete('/:id', deleteUser);

module.exports = router;