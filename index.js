const through = require('through2');
const template = require('lodash.template');
const fs = require('fs');
const crypto = require('crypto');

/**
 * gulp-docsify-vuep
 * 将组件示例代码，转为 docsify 中 Vuep 支持的 Markdown 格式
 * @param {?object} config 配置
 * @param {?object} config.options Vuep 的配置，会原样输出到 markdown 中
 * @param {?string} config.id Vuep 中 template 的 ID，若不传则取“dir__file-name--filehash”
 */
module.exports = function(config) {
    // 读取 Vuep 支持的 markdown 模板
    const tpl = String(fs.readFileSync('./vuep.tpl'));

    return through.obj(function(file, encode, cb) {
        // 处理 Vuep 配置
        let options = JSON.stringify(config.options || {});
        options = options
            .replace(/'/g, '##SingleQuotes##')
            .replace(/"/g, "'")
            .replace(/##SingleQuotes##/g, '"');

        // 设置或生成 Vuep 中 template 的 ID
        let id = config.id;
        if (!id) {
            const fileHash = crypto
                .createHash('sha256')
                .update(file.contents)
                .digest('hex');
            id = (
                file.relative
                    .split('.')[0]
                    .replace(/([A-Z])/g, '-$1')
                    .replace(/^\-/, '')
                    .replace(/\/\-?/g, '__') +
                '--' +
                fileHash.substring(0, 7)
            ).toLowerCase();
        }

        // 合成 Vuep 支持的 markdown 文件
        const result = template(tpl)({
            options: options,
            id: id,
            code: String(file.contents),
        });
        file.contents = Buffer.from(result, encode);

        this.push(file);
        cb();
    });
};
