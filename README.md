# diffback
Fire callbacks whenever properties of an object change.

No observers etc. As performant as changing the value and manually executing the callbacks.

### Example

```javascript
var diffback = require('diffback');

function print(newValue, oldValue) {
  console.log(newValue, oldValue);
}
var object = {
  a: 10,
  b: "hello"
};

diffback(object, 'z', print);

object.z = 100; // Prints: 100 (new value) undefined (old value)

object.z = 200; // Prints: 200 (new value) 100 (old value)

diffback.remove(object, 'z', print); // removes print callback

```