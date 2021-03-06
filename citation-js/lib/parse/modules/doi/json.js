"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.parse = void 0;

var _type = _interopRequireDefault(require("./type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseDoiJson = function parseDoiJson(data) {
  var res = {
    type: (0, _type.default)(data.type)
  };
  var dateFields = ['submitted', 'issued', 'event-date', 'original-date', 'container', 'accessed'];
  dateFields.forEach(function (field) {
    var value = data[field];

    if (value && value['date-parts'] && typeof value['date-parts'][0] === 'number') {
      value['date-parts'] = [value['date-parts']];
    }
  });
  return Object.assign({}, data, res);
};

exports.default = exports.parse = parseDoiJson;