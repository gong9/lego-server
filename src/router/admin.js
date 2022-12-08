const express = require('express')
const router = express.Router()

/**
 * 登陆
 */
router.post('/login', (req, res) => {
  res.json({
    success: true,
    code: 200,
    data: {
      token: 'ab8dceca-0a9a-4ff0-86e1-e5c9e69aade7',
    },
    message: '登录成功',
  })
})

/**
 * 获取用户信息
 */
router.post('/user', (req, res) => {
  const token = req.headers.Authorization

  if (
    token !== 'ab8dceca-0a9a-4ff0-86e1-e5c9e69aade7'
  ) {
    res.json({
      success: false,
      code: 401,
      data: null,
      message: 'token 验证失败',
    })
  }
  res.json({
    success: true,
    code: 200,
    data: {
      avatar: '',
      userId: '123',
      userName: 'gong',
      permissions: [],
      role: [
        {
          id: 1,
          title: '超级管理员',
        },
      ],
    },
    message: '登录成功',
  })
})
