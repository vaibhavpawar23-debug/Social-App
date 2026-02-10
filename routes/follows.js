const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/follows/:userId
// @desc    Follow a user
// @access  Private
router.post('/:userId', protect, async (req, res) => {
  try {
    const userIdToFollow = req.params.userId;
    const currentUserId = req.user._id;

    // Validate ObjectId
    if (!userIdToFollow.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Check if trying to follow oneself
    if (userIdToFollow === currentUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself'
      });
    }

    // Find user to follow
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find current user
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'Current user not found'
      });
    }

    // Check if already following
    if (currentUser.following.includes(userIdToFollow)) {
      return res.status(400).json({
        success: false,
        message: 'You are already following this user'
      });
    }

    // Add to following list of current user
    currentUser.following.push(userIdToFollow);
    await currentUser.save();

    // Add to followers list of user being followed
    userToFollow.followers.push(currentUserId);
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: 'User followed successfully',
      data: {
        isFollowing: true,
        followersCount: userToFollow.followers.length,
        followingCount: currentUser.following.length
      }
    });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while following user'
    });
  }
});

// @route   DELETE /api/follows/:userId
// @desc    Unfollow a user
// @access  Private
router.delete('/:userId', protect, async (req, res) => {
  try {
    const userIdToUnfollow = req.params.userId;
    const currentUserId = req.user._id;

    // Validate ObjectId
    if (!userIdToUnfollow.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Check if trying to unfollow oneself
    if (userIdToUnfollow === currentUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot unfollow yourself'
      });
    }

    // Find user to unfollow
    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find current user
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'Current user not found'
      });
    }

    // Check if not following
    if (!currentUser.following.includes(userIdToUnfollow)) {
      return res.status(400).json({
        success: false,
        message: 'You are not following this user'
      });
    }

    // Remove from following list of current user
    currentUser.following.pull(userIdToUnfollow);
    await currentUser.save();

    // Remove from followers list of user being unfollowed
    userToUnfollow.followers.pull(currentUserId);
    await userToUnfollow.save();

    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully',
      data: {
        isFollowing: false,
        followersCount: userToUnfollow.followers.length,
        followingCount: currentUser.following.length
      }
    });
  } catch (error) {
    console.error('Unfollow user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while unfollowing user'
    });
  }
});

// @route   GET /api/follows/status/:userId
// @desc    Check if current user is following a specific user
// @access  Private
router.get('/status/:userId', protect, async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUserId = req.user._id;

    // Validate ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Check if trying to check follow status for oneself
    if (userId === currentUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot check follow status for yourself'
      });
    }

    // Find user to check
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find current user
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'Current user not found'
      });
    }

    const isFollowing = currentUser.following.includes(userId);

    res.status(200).json({
      success: true,
      data: {
        isFollowing,
        followersCount: user.followers.length,
        followingCount: user.following.length
      }
    });
  } catch (error) {
    console.error('Check follow status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while checking follow status'
    });
  }
});

// @route   GET /api/follows/mutual/:userId
// @desc    Get mutual followers between current user and specified user
// @access  Private
router.get('/mutual/:userId', protect, async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUserId = req.user._id;

    // Validate ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID'
      });
    }

    // Find both users
    const [currentUser, otherUser] = await Promise.all([
      User.findById(currentUserId).populate('following', 'username profileImage'),
      User.findById(userId).populate('followers', 'username profileImage')
    ]);

    if (!currentUser || !otherUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find mutual followers (people who follow both users)
    const currentFollowingIds = currentUser.following.map(u => u._id.toString());
    const otherFollowersIds = otherUser.followers.map(u => u._id.toString());

    const mutualIds = currentFollowingIds.filter(id => otherFollowersIds.includes(id));
    const mutualFollowers = otherUser.followers.filter(u => mutualIds.includes(u._id.toString()));

    res.status(200).json({
      success: true,
      data: {
        mutualFollowers: mutualFollowers.map(u => u.toPublicJSON()),
        count: mutualFollowers.length
      }
    });
  } catch (error) {
    console.error('Get mutual followers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while getting mutual followers'
    });
  }
});

module.exports = router;
