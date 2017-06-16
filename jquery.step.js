(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-jquery-step/jquery.step"] = factory();
  }
})(this, function () {
  function Step(index, element) {
    this.index = index;
    this.element = element;
  }

  return function (selector, target, callback) {
    var prev;
    var step;
    var list = Step.prototype = {};
    var elements = this
      .find(selector)
      .map(function (index, element) {
        var next = new Step(index, element);
        if (prev) {
          next.prev = prev;
          prev.next = next;
        }
        else {
          list.first = next;
        }
        if (element === target) {
          step = next;
        }
        return list.last = prev = next;
      });

    return callback.call(elements, step);
  }
});
