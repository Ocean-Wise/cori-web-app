"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAsync = exports.default = exports.parse = void 0;

var _wikidataSdk = _interopRequireDefault(require("wikidata-sdk"));

var _fetchFile = _interopRequireDefault(require("../../../util/fetchFile"));

var _fetchFileAsync = _interopRequireDefault(require("../../../util/fetchFileAsync"));

var _type = _interopRequireDefault(require("./type"));

var _date = _interopRequireDefault(require("../../date"));

var _name = _interopRequireDefault(require("../../name"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var fetchWikidataLabel = function fetchWikidataLabel(q, lang) {
  var ids = Array.isArray(q) ? q : typeof q === 'string' ? q.split('|') : '';

  var url = _wikidataSdk.default.getEntities(ids, [lang], 'labels');

  var entities = JSON.parse((0, _fetchFile.default)(url)).entities || {};
  return Object.keys(entities).map(function (entityKey) {
    return (entities[entityKey].labels[lang] || {}).value;
  });
};

var parseWikidataP1545 = function parseWikidataP1545(qualifiers) {
  return qualifiers.P1545 ? parseInt(qualifiers.P1545[0]) : -1;
};

var propMap = {
  P31: 'type',
  P50: 'author',
  P57: 'director',
  P86: 'composer',
  P98: 'editor',
  P110: 'illustrator',
  P123: 'publisher',
  P136: 'genre',
  P212: 'ISBN',
  P236: 'ISSN',
  P291: 'publisher-place',
  P304: 'page',
  P348: 'version',
  P356: 'DOI',
  P393: 'edition',
  P433: 'issue',
  P478: 'volume',
  P577: 'issued',
  P655: 'translator',
  P698: 'PMID',
  P932: 'PMCID',
  P953: 'URL',
  P957: 'ISBN',
  P1104: 'number-of-pages',
  P1433: 'container-title',
  P1476: 'title',
  P2093: 'author',
  P2860: false,
  P921: false,
  P3181: false,
  P364: false
};

var parseWikidataProp = function parseWikidataProp(name, value, lang) {
  if (!propMap.hasOwnProperty(name)) {
    return undefined;
  } else if (propMap[name] === false) {
    return undefined;
  }

  var cslProp = propMap[name];

  if (!value) {
    return cslProp;
  }

  var cslValue = function (prop, valueList) {
    var value = valueList[0].value;

    switch (prop) {
      case 'P31':
        var type = (0, _type.default)(value);

        if (!type) {
          logger.warn('[set]', "Wikidata entry type not recognized: ".concat(value, ". Defaulting to \"book\"."));
          return 'book';
        }

        return type;

      case 'P50':
      case 'P57':
      case 'P86':
      case 'P98':
      case 'P110':
      case 'P655':
        return valueList.map(function (_ref) {
          var value = _ref.value,
              qualifiers = _ref.qualifiers;
          var name = (0, _name.default)(fetchWikidataLabel(value, lang)[0]);
          name._ordinal = parseWikidataP1545(qualifiers);
          return name;
        });

      case 'P577':
        return (0, _date.default)(value);

      case 'P123':
      case 'P136':
      case 'P291':
      case 'P1433':
        return fetchWikidataLabel(value, lang)[0];

      case 'P2093':
        return valueList.map(function (_ref2) {
          var value = _ref2.value,
              qualifiers = _ref2.qualifiers;
          var name = (0, _name.default)(value);
          name._ordinal = parseWikidataP1545(qualifiers);
          return name;
        });

      default:
        return value;
    }
  }(name, value);

  return [cslProp, cslValue];
};

exports.default = exports.parse = parseWikidataProp;

var fetchWikidataLabelAsync = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(q, lang) {
    var ids, url, entities;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ids = Array.isArray(q) ? q : typeof q === 'string' ? q.split('|') : '';
            url = _wikidataSdk.default.getEntities(ids, [lang], 'labels');
            _context.t1 = JSON;
            _context.next = 5;
            return (0, _fetchFileAsync.default)(url);

          case 5:
            _context.t2 = _context.sent;
            _context.t0 = _context.t1.parse.call(_context.t1, _context.t2).entities;

            if (_context.t0) {
              _context.next = 9;
              break;
            }

            _context.t0 = {};

          case 9:
            entities = _context.t0;
            return _context.abrupt("return", Object.keys(entities).map(function (entityKey) {
              return (entities[entityKey].labels[lang] || {}).value;
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchWikidataLabelAsync(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var parseWikidataPropAsync = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(prop, value, lang) {
    var cslValue;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return function () {
              var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(prop, valueList) {
                var value;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        value = valueList[0].value;
                        _context3.t0 = prop;
                        _context3.next = _context3.t0 === 'P50' ? 4 : _context3.t0 === 'P57' ? 4 : _context3.t0 === 'P86' ? 4 : _context3.t0 === 'P98' ? 4 : _context3.t0 === 'P110' ? 4 : _context3.t0 === 'P655' ? 4 : _context3.t0 === 'P123' ? 5 : _context3.t0 === 'P136' ? 5 : _context3.t0 === 'P291' ? 5 : _context3.t0 === 'P1433' ? 5 : 8;
                        break;

                      case 4:
                        return _context3.abrupt("return", Promise.all(valueList.map(function () {
                          var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref6) {
                            var value, qualifiers, name;
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    value = _ref6.value, qualifiers = _ref6.qualifiers;
                                    _context2.t0 = _name.default;
                                    _context2.next = 4;
                                    return fetchWikidataLabelAsync(value, lang);

                                  case 4:
                                    _context2.t1 = _context2.sent[0];
                                    name = (0, _context2.t0)(_context2.t1);
                                    name._ordinal = parseWikidataP1545(qualifiers);
                                    return _context2.abrupt("return", name);

                                  case 8:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, this);
                          }));

                          return function (_x8) {
                            return _ref7.apply(this, arguments);
                          };
                        }())));

                      case 5:
                        _context3.next = 7;
                        return fetchWikidataLabelAsync(value, lang);

                      case 7:
                        return _context3.abrupt("return", _context3.sent[0]);

                      case 8:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              return function (_x6, _x7) {
                return _ref5.apply(this, arguments);
              };
            }()(prop, value);

          case 2:
            cslValue = _context4.sent;

            if (!cslValue) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", [parseWikidataProp(prop), cslValue]);

          case 7:
            return _context4.abrupt("return", parseWikidataProp(prop, value, lang));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function parseWikidataPropAsync(_x3, _x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.parseAsync = parseWikidataPropAsync;