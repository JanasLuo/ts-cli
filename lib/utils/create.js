"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.installFeature = exports.installDevEnviroment = exports.installTypesNode = exports.installTSAndInit = exports.changePackageInfo = exports.initProjectDir = exports.selectFeature = exports.isFileExist = void 0;
/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2020-12-17 13:18:23
 * @LastEditors: luolei
 * @LastEditTime: 2020-12-17 13:18:25
 */
/**
 * create 命令需要用到的所有方法
 */
const common_1 = require("../utils/common");
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const chalk_1 = require("chalk");
const shell = require("shelljs");
const installFeatureMethod = require("./installFeature");
/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
function isFileExist(filename) {
    // 文件路径
    const file = common_1.getProjectPath(filename);
    // 验证文件是否已经存在，存在则推出进程
    if (fs_1.existsSync(file)) {
        common_1.printMsg(chalk_1.red(`${file} 已经存在`));
        process.exit(1);
    }
}
exports.isFileExist = isFileExist;
/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
async function selectFeature() {
    // 清空命令行
    common_1.clearConsole();
    // 输出信息
    /* eslint-disable @typescript-eslint/no-var-requires */
    common_1.printMsg(chalk_1.blue(`TS CLI v${require('../../package.json').version}`));
    common_1.printMsg('Start initializing the project:');
    common_1.printMsg('');
    // 选择功能，这里配合 下面的 installFeature 方法 和 ./installFeature.ts 文件为脚手架提供了良好的扩展机制
    // 将来扩展其它功能只需要在 choices 数组中增加配置项，然后在 ./installFeature.ts 文件中增加相应的安装方法即可
    const { feature } = await inquirer_1.prompt([
        {
            name: 'feature',
            type: 'checkbox',
            message: 'Check the features needed for your project',
            choices: [
                { name: 'ESLint', value: 'ESLint' },
                { name: 'Prettier', value: 'Prettier' },
                { name: 'CZ', value: 'CZ' },
            ],
        },
    ]);
    return feature;
}
exports.selectFeature = selectFeature;
/**
 * 初始化项目目录
 */
function initProjectDir(projectName) {
    shell.exec(`mkdir ${projectName}`);
    shell.cd(projectName);
    shell.exec('npm init -y');
}
exports.initProjectDir = initProjectDir;
/**
 * 改写项目中 package.json 的 name、description
 */
function changePackageInfo(projectName) {
    const packageJSON = common_1.readJsonFile('./package.json');
    packageJSON.name = packageJSON.description = projectName;
    common_1.writeJsonFile('./package.json', packageJSON);
}
exports.changePackageInfo = changePackageInfo;
/**
 * 安装 typescript 并初始化
 */
function installTSAndInit() {
    // 安装 typescript 并执行命令 tsc --init 生成 tsconfig.json
    shell.exec('npm i typescript -D && npx tsc --init');
    // 覆写 tsconfig.json
    const tsconfigJson = {
        compileOnSave: true,
        compilerOptions: {
            target: 'ES2018',
            module: 'commonjs',
            moduleResolution: 'node',
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            inlineSourceMap: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            stripInternal: true,
            pretty: true,
            declaration: true,
            outDir: 'lib',
            baseUrl: './',
            paths: {
                '*': ['src/*'],
            },
        },
        exclude: ['lib', 'node_modules'],
    };
    common_1.writeJsonFile('./tsconfig.json', tsconfigJson);
    // 创建 src 目录和 /src/index.ts
    shell.exec('mkdir src && touch src/index.ts');
}
exports.installTSAndInit = installTSAndInit;
/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
function installTypesNode() {
    shell.exec('npm i @types/node -D');
}
exports.installTypesNode = installTypesNode;
/**
 * 安装开发环境，支持实时编译
 */
function installDevEnviroment() {
    shell.exec('npm i ts-node-dev -D');
    /**
     * 在 package.json 的 scripts 中增加如下内容
     * "dev:comment": "启动开发环境",
     * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
     */
    const packageJson = common_1.readJsonFile('./package.json');
    packageJson.scripts['dev:comment'] = '启动开发环境';
    packageJson.scripts['dev'] =
        'ts-node-dev --respawn --transpile-only src/index.ts';
    common_1.writeJsonFile('./package.json', packageJson);
}
exports.installDevEnviroment = installDevEnviroment;
/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
function installFeature(feature) {
    feature.forEach((item) => {
        const func = installFeatureMethod[`install${item}`];
        func();
    });
    // 安装 husky 和 lint-staged
    installHusky(feature);
    // 安装构建工具
    installFeatureMethod.installBuild(feature);
}
exports.installFeature = installFeature;
/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param feature 用户选择的功能列表
 */
function installHusky(feature) {
    // feature 副本
    const featureBak = JSON.parse(JSON.stringify(feature));
    // 设置 hook
    const hooks = {};
    // 判断用户是否选择了 CZ，有则设置 hooks
    if (featureBak.includes('CZ')) {
        hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }
    // 设置 lintStaged
    const lintStaged = [];
    if (featureBak.includes('ESLint')) {
        lintStaged.push('eslint');
    }
    if (featureBak.includes('Prettier')) {
        lintStaged.push('prettier');
    }
    installFeatureMethod.installHusky(hooks, lintStaged);
}
/**
 * 整个项目安装结束，给用户提示信息
 */
function end(projectName) {
    common_1.printMsg(`Successfully created project ${chalk_1.yellow(projectName)}`);
    common_1.printMsg('Get started with the following commands:');
    common_1.printMsg('');
    common_1.printMsg(`${chalk_1.gray('$')} ${chalk_1.cyan('cd ' + projectName)}`);
    common_1.printMsg(`${chalk_1.gray('$')} ${chalk_1.cyan('npm run dev')}`);
    common_1.printMsg('');
}
exports.end = end;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7OztHQU9HO0FBQ0g7O0dBRUc7QUFDSCw0Q0FReUI7QUFDekIsMkJBQWdDO0FBQ2hDLHVDQUFrQztBQUNsQyxpQ0FBc0Q7QUFDdEQsaUNBQWlDO0FBQ2pDLHlEQUF5RDtBQUV6RDs7O0dBR0c7QUFDSCxTQUFnQixXQUFXLENBQUMsUUFBZ0I7SUFDMUMsT0FBTztJQUNQLE1BQU0sSUFBSSxHQUFHLHVCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMscUJBQXFCO0lBQ3JCLElBQUksZUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BCLGlCQUFRLENBQUMsV0FBRyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDO0FBUkQsa0NBUUM7QUFFRDs7O0dBR0c7QUFDSSxLQUFLLFVBQVUsYUFBYTtJQUNqQyxRQUFRO0lBQ1IscUJBQVksRUFBRSxDQUFDO0lBQ2YsT0FBTztJQUNQLHVEQUF1RDtJQUN2RCxpQkFBUSxDQUFDLFlBQUksQ0FBQyxXQUFXLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRSxpQkFBUSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDNUMsaUJBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNiLHlFQUF5RTtJQUN6RSx1RUFBdUU7SUFDdkUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0saUJBQU0sQ0FBQztRQUMvQjtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFVBQVU7WUFDaEIsT0FBTyxFQUFFLDRDQUE0QztZQUNyRCxPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxJQUFJLEVB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