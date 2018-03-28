(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.KeyboardMan = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var KeyboardMan = function () {
    function KeyboardMan() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, KeyboardMan);
        var timeout = config.timeout;

        this.timeout = timeout || 1200;
        this.init();
    }

    createClass(KeyboardMan, [{
        key: 'parser',
        value: function parser(scheme) {
            var reg = /\((.*?)\)/;
            var rule = scheme.split('+').map(function (step) {
                return step.split('&').map(function (item) {
                    var group = item.match(reg);
                    group = group ? group[1] : group;
                    return {
                        key: (group ? group : item).split('|')
                    };
                });
            });
            return rule;
        }
    }, {
        key: 'exec',
        value: function exec(scheme, cb) {
            var steps = this.steps.slice(-scheme.length);
            var match = true;
            for (var groupIndex = 0; groupIndex < scheme.length; groupIndex++) {
                if (!match) break;
                for (var stepIndex = 0; stepIndex < scheme[groupIndex].length; stepIndex++) {
                    if (!steps[groupIndex] || !steps[groupIndex][stepIndex]) {
                        match = false;
                        break;
                    }
                    var key = steps[groupIndex][stepIndex];
                    var keys = scheme[groupIndex][stepIndex].key;
                    if (!scheme[groupIndex][stepIndex].key.includes(key)) {
                        match = false;
                        break;
                    }
                }
            }
            if (match) cb();
        }
    }, {
        key: 'flush',
        value: function flush() {
            var _this = this;

            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(function () {
                _this.init();
            }, this.timeout);
        }
    }, {
        key: 'init',
        value: function init() {
            this.steps = [];
            this.step = [];
            this.count = 0;
            this.last = null;
            this.steps.push(this.step);
        }
    }, {
        key: 'on',
        value: function on(str, cb) {
            var _this2 = this;

            var scheme = this.parser(str);
            document.addEventListener('keydown', function (e) {
                var step = _this2.step,
                    last = _this2.last;

                var keyCode = e.keyCode;
                if (keyCode !== last) {
                    _this2.last = e.keyCode;
                    _this2.count++;
                    step.push(e.key);
                    _this2.exec(scheme, cb);
                }
            });
            document.addEventListener('keyup', function (e) {
                var steps = _this2.steps;

                _this2.count--;
                if (_this2.count < 1) {
                    steps.push(_this2.step = []);
                    _this2.flush();
                }
                _this2.last = null;
            });
            return scheme;
        }
    }]);
    return KeyboardMan;
}();

return KeyboardMan;

})));
//# sourceMappingURL=index.js.map
