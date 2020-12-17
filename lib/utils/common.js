"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearConsole = exports.printMsg = exports.getProjectPath = exports.writeJsonFile = exports.readJsonFile = void 0;
/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2020-12-17 13:19:43
 * @LastEditors: luolei
 * @LastEditTime: 2020-12-17 13:19:44
 */
/**
 * 放一些通用的工具方法
 */
const fs_1 = require("fs");
const path_1 = require("path");
const clear = require("clear-console");
/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
function readJsonFile(filename) {
    return JSON.parse(fs_1.readFileSync(filename, { encoding: 'utf-8', flag: 'r' }));
}
exports.readJsonFile = readJsonFile;
/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
function writeJsonFile(filename, content) {
    fs_1.writeFileSync(filename, JSON.stringify(content, null, 2));
}
exports.writeJsonFile = writeJsonFile;
/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
function getProjectPath(projectName) {
    return path_1.resolve(process.cwd(), projectName);
}
exports.getProjectPath = getProjectPath;
/**
 * 打印信息
 * @param msg 信息
 */
function printMsg(msg) {
    console.log(msg);
}
exports.printMsg = printMsg;
/**
 * 清空命令行
 */
function clearConsole() {
    clear();
}
exports.clearConsole = clearConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7OztHQU9HO0FBQ0g7O0dBRUc7QUFDSCwyQkFBaUQ7QUFDakQsK0JBQStCO0FBQy9CLHVDQUF1QztBQWV2Qzs7O0dBR0c7QUFDSCxTQUFnQixZQUFZLENBQUksUUFBZ0I7SUFDOUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFGRCxvQ0FFQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixhQUFhLENBQUksUUFBZ0IsRUFBRSxPQUFVO0lBQzNELGtCQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFGRCxzQ0FFQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxXQUFtQjtJQUNoRCxPQUFPLGNBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUZELHdDQUVDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLEdBQVc7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRkQsNEJBRUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLFlBQVk7SUFDMUIsS0FBSyxFQUFFLENBQUM7QUFDVixDQUFDO0FBRkQsb0NBRUMifQ==