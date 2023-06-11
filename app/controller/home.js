/* eslint-disable no-unused-vars */
'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.render 默认会去 view 文件夹寻找 index.html，这是 Egg 约定好的。
    await ctx.render('index.html', {
      title: 'cc web', // 将 title 传入 index.html
    });
  }

  // 获取用户信息
  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
  }

  // 新增用户
  async addUser() {
    const { ctx, app } = this;
    const { name } = ctx.request.body;
    console.log(name, ctx.request.body);
    if (!name) {
      ctx.body = {
        code: 500,
        msg: '添加失败, 姓名不能为空！',
        data: null,
      };
      return;
    }
    try {
      const result = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null,
      };
      return result;
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null,
      };
    }
  }

  // 编辑用户
  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    try {
      const result = await ctx.service.home.editUser(id, name);
      ctx.body = {
        code: 200,
        msg: '操作成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '操作失败',
        data: null,
      };
    }
  }

  // 删除用户
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '删除失败',
        data: null,
      };
    }
  }

}

module.exports = HomeController;
