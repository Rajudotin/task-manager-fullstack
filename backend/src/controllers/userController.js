const { User, Task } = require('../models');
const { HTTP_STATUS } = require('../utils/constants');
const logger = require('../utils/logger');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: Task,
        as: 'tasks',
        required: false,
        attributes: ['id', 'title', 'status']
      }]
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      message: 'Error fetching users'
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Task,
        as: 'tasks'
      }]
    });
    
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      message: 'Error fetching user'
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid role'
      });
    }
    
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await user.update({ role });
    
    logger.info(`User role updated: ${user.email} to ${role} by admin: ${req.user.id}`);
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Update user role error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      message: 'Error updating user role'
    });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await user.update({ isActive: !user.isActive });
    
    logger.info(`User status toggled: ${user.email} active: ${user.isActive} by admin: ${req.user.id}`);
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    logger.error('Toggle user status error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      message: 'Error toggling user status'
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.id === req.user.id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }
    
    await user.destroy();
    
    logger.info(`User deleted: ${user.email} by admin: ${req.user.id}`);
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER).json({
      success: false,
      message: 'Error deleting user'
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUserRole,
  toggleUserStatus,
  deleteUser
};