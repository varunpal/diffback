var attach = function (object, property, callback) {
  if (!object) {
    console.error('Invalid object');
    return;
  }
  if (!property || typeof property === 'function') {
    console.error('Invalid object property');
    return;
  }
  if (typeof callback !== 'function') {
    console.error('Callback should be a function');
    return;
  }
  if (!object.mappings) {
    Object.defineProperty(object, 'mappings', {
      enumerable: false,
      value: {}
    });
  }
  if (object.mappings[property]) {
    object.mappings[property].push(callback);
  } else {
    object.mappings[property] = [callback];
    Object.defineProperty(object, property, {
      set: function (value) {
        var oldValue = this.value;
        this.value = value;
        if (object.mappings[property] && object.mappings[property].length) {
          object.mappings[property].forEach(function (callback) {
            callback(value, oldValue);
          });
        }
        return value;
      }
    });
  }
};

module.exports = attach;

