"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2020-12-17 13:17:42
 * @LastEditors: luolei
 * @LastEditTime: 2020-12-17 13:17:43
 */
/**
 * create 命令的具体任务
 */
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("../utils/create");
// create 命令
async function create(projecrName) {
    // 判断文件是否已经存在
    create_1.isFileExist(projecrName);
    // 选择需要的功能
    const feature = await create_1.selectFeature();
    // 初始化项目目录
    create_1.initProjectDir(projecrName);
    // 改写项目的 package.json 基本信息，比如 name、description
    create_1.changePackageInfo(projecrName);
    // 安装 typescript 并初始化
    create_1.installTSAndInit();
    // 安装 @types/node
    create_1.installTypesNode();
    // 安装开发环境，支持实时编译
    create_1.installDevEnviroment();
    // 安装 feature
    create_1.installFeature(feature);
    // 结束
    create_1.end(projecrName);
}
exports.default = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29yZGVyL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRztBQUNIOztHQUVHOztBQUVILDRDQVV5QjtBQUV6QixZQUFZO0FBQ0csS0FBSyxVQUFVLE1BQU0sQ0FBQyxXQUFtQjtJQUN0RCxhQUFhO0lBQ2Isb0JBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QixVQUFVO0lBQ1YsTUFBTSxPQUFPLEdBQUcsTUFBTSxzQkFBYSxFQUFFLENBQUM7SUFDdEMsVUFBVTtJQUNWLHVCQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUIsOENBQThDO0lBQzlDLDBCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLHFCQUFxQjtJQUNyQix5QkFBZ0IsRUFBRSxDQUFDO0lBQ25CLGlCQUFpQjtJQUNqQix5QkFBZ0IsRUFBRSxDQUFDO0lBQ25CLGdCQUFnQjtJQUNoQiw2QkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLGFBQWE7SUFDYix1QkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLEtBQUs7SUFDTCxZQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQW5CRCx5QkFtQkMifQ==