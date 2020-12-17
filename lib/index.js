"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2020-12-17 12:35:00
 * @LastEditors: luolei
 * @LastEditTime: 2020-12-17 13:20:28
 */
const commander_1 = require("commander");
const create_1 = require("./order/create");
// ts-cli -v、ts-cli --version
// 临时禁用规则，保证这里可以通过 require 方法获取 package.json 中的版本号
/* eslint-disable @typescript-eslint/no-var-requires */
commander_1.program
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');
// ts-cli create newPro
commander_1.program
    .command('create <app-name>')
    .description('Create new project from => ts-cli create yourProjectName')
    .action(async (name) => {
    // 创建命令具体做的事情都在这里，name 是你指定的 newPro
    await create_1.default(name);
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gseUNBQW9DO0FBQ3BDLDJDQUFvQztBQUVwQyw2QkFBNkI7QUFDN0Isa0RBQWtEO0FBQ2xELHVEQUF1RDtBQUN2RCxtQkFBTztLQUNKLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLGNBQWMsQ0FBQztLQUNoRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUVoQyx1QkFBdUI7QUFDdkIsbUJBQU87S0FDSixPQUFPLENBQUMsbUJBQW1CLENBQUM7S0FDNUIsV0FBVyxDQUFDLDBEQUEwRCxDQUFDO0tBQ3ZFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7SUFDN0IsbUNBQW1DO0lBQ25DLE1BQU0sZ0JBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQztBQUVMLG1CQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9