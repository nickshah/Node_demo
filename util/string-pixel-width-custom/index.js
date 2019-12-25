'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _widthsMap = require('./widthsMap');

var _widthsMap2 = _interopRequireDefault(_widthsMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsDefaults = { font: 'Arial', size: 100 };

const toAscii = string => _lodash2.default.deburr(string);

const allowedFonts = ['love_you_like_a_sister', 'arial', 'cabin_sketch_bold', 'cabin_sketch_regular'];

const getWidth = (string, settings) => {
    const sett = _extends({}, settingsDefaults, settings);
    const font = sett.font.toLowerCase();
    const size = sett.size;
    if (!allowedFonts.includes(font)) {
        throw new Error('The only supported string is Arial only at this time.');
    }
    let totalWidth = 0;
    toAscii(string).split('').forEach(char => {
        if (/[\x00-\x1F]/.test(char)) {
            // non-printable character
            return true;
        }
        const width = _widthsMap2.default[font][char];
        const tempWidth = (width * size) / 100;
        totalWidth += tempWidth;
        return true;
    });
    console.log('Width of ' + string + ': ' + totalWidth);
    return totalWidth;
};

exports.default = getWidth;
module.exports = exports['default'];