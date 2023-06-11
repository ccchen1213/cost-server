'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.get('/', controller.home.index);
  router.get('/user', controller.home.user);
  router.post('/add_user', controller.home.addUser);
  router.post('/edit_user', controller.home.editUser);
  router.post('/delete_user', controller.home.deleteUser);
  /** --记账本相关-- */
  // 注册
  router.post('/api/user/register', controller.user.register);
  // 登录
  router.post('/api/user/login', controller.user.login);
  // 验证token
  router.get('/api/user/test', _jwt, controller.user.testToken);
  // 获取用户信息
  router.get('/api/user/getUserInfo', _jwt, controller.user.getUserInfo);
  // 修改用户个性签名
  router.post('/api/user/editUserInfo', _jwt, controller.user.editUserInfo);
  // 上传图片
  router.post('/api/upload', controller.upload.upload);
  // 添加账单
  router.post('/api/bill/add', _jwt, controller.bill.add);
  // 获取账单列表
  router.get('/api/bill/list', _jwt, controller.bill.list);


};
