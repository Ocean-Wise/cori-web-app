"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.parse = void 0;

var _prop2 = _interopRequireDefault(require("./prop"));

var _type = _interopRequireDefault(require("./type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var parseBibTeXJSON = function parseBibTeXJSON(data) {
  return [].concat(data).map(function (entry) {
    var newEntry = {};
    var toMerge = [];

    for (var prop in entry.properties) {
      var oldValue = entry.properties[prop];

      var _ref = (0, _prop2.default)(prop, oldValue) || [],
          _ref2 = _slicedToArray(_ref, 2),
          cslField = _ref2[0],
          cslValue = _ref2[1];

      if (cslField) {
        if (/^[^:\s]+?:[^.\s]+(\.[^.\s]+)*$/.test(cslField)) {
          toMerge.push([cslField, cslValue]);
        } else {
          newEntry[cslField] = cslValue;
        }
      }
    }

    newEntry.type = (0, _type.default)(entry.type);
    newEntry.id = newEntry['citation-label'] = entry.label;

    if (/\d(\D+)$/.test(entry.label)) {
      newEntry['year-suffix'] = entry.label.match(/\d(\D+)$/)[1];
    }

    toMerge.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          cslField = _ref4[0],
          value = _ref4[1];

      var props = cslField.split(/:|\./g);
      var cursor = newEntry;

      while (props.length > 0) {
        var _prop = props.shift();

        cursor = cursor[_prop] || (cursor[_prop] = !props.length ? value : isNaN(+props[0]) ? {} : []);
      }
    });
    return newEntry;
  });
};

exports.default = exports.parse = parseBibTeXJSON;