# Table of Contents

1. [Call Stack](#call-stack)
2. [Value Type vs Reference Type](#value-type-vs-reference-type)
3. [Differences between `var`, `let`, and `const`](#differences-between-var-let-and-const)
4. [Scopes](#scopes)
5. [Objects and `this` Keyword](#objects-and-this-keyword)
6. [Closure](#closure)

# Call Stack

It’s a data structure which records the function calls, basically where in the program we are. If we call a function to execute , we push something on to the stack, and when we return from a function, we pop off the top of the stack.
<br><br>
### Key Points

1. **Call Stack Purpose**: 
   - The call stack helps the interpreter track its position in a script, particularly when multiple functions are involved.

2. **Adding Functions**: 
   - When a function is invoked, it's added to the call stack, and the interpreter starts executing it.

3. **Nested Functions**: 
   - If the current function calls another function, that new function is added to the stack as well.

4. **Removing Functions**: 
   - Once a function completes, it's removed from the call stack, and the interpreter returns to the previous function.

5. **Stack Overflow**: 
   - If the call stack exceeds its capacity, a "stack overflow" error is thrown.
   - Maximum stack size in chrome is 16000 frames.

---

### Example Code Snippet

```javascript
function greeting() {
  // [1] Some code here
  sayHi();
  // [2] Some code here
}

function sayHi() {
  return "Hi!";
}

// Invoke the `greeting` function
greeting();

// [3] Some code here
```
### Explanation:

- When `greeting()` is invoked, it is added to the call stack.
- Inside `greeting()`, the `sayHi()` function is called, so `sayHi()` is added to the stack.
- Once `sayHi()` returns "Hi!", it is removed from the stack, and the interpreter continues executing `greeting()`.
- Finally, `greeting()` is removed from the stack after it completes.

<br><br><br>
# Value Type vs Reference Type


In JavaScript, variables can hold data of two types: **Value Types** (also known as **Primitive Types**) and **Reference Types**.

### 1. **Value Types (Primitive Types)**
- **Stored Directly**: The actual value is stored in the variable.
- **Types**: `Number`, `String`, `Boolean`, `undefined`, `null`, `Symbol`, and `BigInt`.
- **Example**:
  ```javascript
  let x = 10;
  let y = x; // y is a copy of x, so changing y doesn't affect x
  y = 20;

  console.log(x); // Output: 10
  console.log(y); // Output: 20

### 2. **Reference Types

- **Stored Indirectly**: The variable stores a reference (or address) to the actual data.
- **Types**: `Object`, `Array`, `Function`.
- **Example**:
  ```javascript
  let obj1 = { name: "Alice" };
  let obj2 = obj1; // obj2 references the same object as obj1

  obj2.name = "Bob"; // Modifying obj2 affects obj1

  console.log(obj1.name); // Output: Bob
  console.log(obj2.name); // Output: Bob

 ### Key Difference

| Aspect              | Value Types                              | Reference Types                           |
|---------------------|------------------------------------------|-------------------------------------------|
| **Storage**         | Stores the actual value directly.        | Stores a reference (address) to the data.|
| **Example Types**   | `Number`, `String`, `Boolean`, `undefined`, `null`, `Symbol`, `BigInt` | `Object`, `Array`, `Function`             |
| **Copying**         | Copies of the value are created.         | Copies of the reference are created.      |
| **Mutability**      | Changing one variable does not affect others. | Changing the data affects all references to that data. |
| **Memory**          | Each variable occupies separate memory space. | Multiple variables can point to the same memory location. |



<br><br><br>
# Differences between `var`, `let`, and `const`

| Aspect           | `var`                                  | `let`                                  | `const`                                |
|------------------|---------------------------------------|---------------------------------------|----------------------------------------|
| **Scope**        | Function scope or globally scoped if declared outside a function. | Block scope (within curly braces `{}`) | Block scope (within curly braces `{}`) |
| **Hoisting**     | Hoisted to the top of its scope and initialized with `undefined`. | Hoisted but not initialized; `ReferenceError` if accessed before declaration. | Hoisted but not initialized; `ReferenceError` if accessed before declaration. |
| **Reassignable** | Can be reassigned within its scope. | Can be reassigned within the same scope. | Cannot be reassigned or redeclared once initialized. |
| **Redeclaration**| Allowed within the same scope.         | Not allowed within the same scope.     | Not allowed within the same scope.     |
| **Use Case**     | Used for function-wide or global variables. | Preferred for block-scoped variables where reassignment is needed. | Used for constants that should not be reassigned. |

<br>
## Examples of `var`, `let`, and `const`

### `var`

```javascript
function exampleVar() {
    if (true) {
        var x = 10; // `var` is function-scoped
    }
    console.log(x); // Output: 10
}

exampleVar();
```
### `let`

```javascript
function exampleLet() {
    if (true) {
        let y = 20; // `let` is block-scoped
        console.log(y); // Output: 20
    }
    console.log(y); // Error: y is not defined
}

exampleLet();
```
### `const`
```javascript
function exampleConst() {
    if (true) {
        const z = 30; // `const` is block-scoped
        console.log(z); // Output: 30
    }
    console.log(z); // Error: z is not defined
}

exampleConst();
```
<br><br>

# Scopes

### Global Scope

**Description**: The global scope is the outermost level of scope in JavaScript. Any variables or functions declared outside of any function or block are in the global scope. They are accessible from anywhere in the code, including within functions and blocks.

**Characteristics**:
- Variables and functions declared globally are available throughout the entire script.
- They can be accessed and modified from any part of the code.

**Example**:

```javascript
var globalVar = 'I am global';

function globalFunc() {
  return 'I am global';
}

console.log(globalVar); // Output: 'I am global'
console.log(globalFunc()); // Output: 'I am global'
```

### Function Scope

**Description**: Function scope is the scope created by functions. Variables declared within a function using `var` are only accessible within that function. They are not visible outside the function.

**Characteristics**:
- Variables are created and destroyed each time the function is called.
- Once the function execution is complete, the variables are no longer accessible.

**Example**:

```javascript
function myFunc() {
  var funcVar = 'I am local';
  return funcVar;
}

console.log(myFunc()); // Output: 'I am local'
console.log(funcVar); // Error: funcVar is not defined
```

### Block Scope

**Description**: Block scope refers to the scope created by curly braces `{}`, such as those used in `if`, `for`, or `while` statements. Variables declared with `let` and `const` inside a block are only accessible within that block.

**Characteristics**:
- Variables declared with `let` and `const` are confined to the block in which they are declared.
- They are not accessible outside of that block, even if the block is inside a function.

**Example**:

```javascript
if (true) {
  let blockVar = 'I am block-scoped';
  console.log(blockVar); // Output: 'I am block-scoped'
}

console.log(blockVar); // Error: blockVar is not defined
```
### Lexical Scope

**Description**: Lexical scope (also known as static scope) is a scoping mechanism in JavaScript where the scope of variables is determined by their position in the source code. This means that the accessibility of variables is determined by their location within nested functions and blocks. The scope is fixed at the time of function creation and does not change at runtime.

**Characteristics**:
- Nested Functions: Inner functions have access to variables in their outer functions due to lexical scoping.
- Closure: Functions retain access to their lexical scope even when they are executed outside their original context.

**Example**:


```javascript
function grandparent() {
  var grandparentVar = 'I am grandparent';

  function parent() {
    var parentVar = 'I am parent';

    function child() {
      var childVar = 'I am child';
      console.log(grandparentVar); // Output: 'I am grandparent'
      console.log(parentVar);     // Output: 'I am parent'
      console.log(childVar);      // Output: 'I am child'
    }

    child();
  }

  parent();
}

grandparent();
```
**Example(var,let,cont)**:

```javascript
function testScope() {
  if (true) {
    var blockVar = 'I am function-scoped';
    let blockLet = 'I am block-scoped';
    const blockConst = 'I am also block-scoped';
    console.log(blockVar);  // Output: 'I am function-scoped'
    console.log(blockConst); // Output: 'I am also block-scoped'
  }

  console.log(blockLet);  // Error: blockLet is not defined
  console.log(blockConst); // Error: blockConst is not defined
  console.log(blockVar);  // Output: 'I am function-scoped'
}

testScope();
```

# Objects and `this` Keyword

## Objects

**Definition**: Objects are a fundamental data type in JavaScript that allow you to store collections of data in the form of key-value pairs. Each key (also known as a property) is a string, and each value can be any data type, including other objects or functions.

**Creating Objects**:

  1. **Object Literals**:
   ```javascript
   const person = {
     name: 'John',
     age: 30,
     greet: function() {
       console.log('Hello, my name is ' + this.name);
     }
   };
   person.greet(); // Output: Hello, my name is John
```


 2. **Using the `new Object()` Syntax**:

```javascript
const car = new Object();
car.make = 'Toyota';
car.model = 'Camry';
car.year = 2020;
console.log(car.make); // Output: Toyota
```

3. **Using Constructor Functions:**:

```javascript
function Animal(name, species) {
  this.name = name;
  this.species = species;
}

const lion = new Animal('Leo', 'Lion');
console.log(lion.name); // Output: Leo
```

4. **Using `Object.create()`:**:

```javascript
const animal = {
  species: 'Unknown',
  speak: function() {
    console.log('I am a ' + this.species);
  }
};

const dog = Object.create(animal);
dog.species = 'Dog';
dog.speak(); // Output: I am a Dog
//Inheritance: JavaScript objects can inherit properties from other objects. This can be done using prototype inheritance or the Object.create() method.
```
## `this` Keyword

**Definition**: The `this` keyword refers to the context in which a function is called. Its value is determined by how a function is invoked, and it provides access to the properties and methods of the object that owns the function.

**Common Uses**:

  1. **Global Context**:
   In the global context, `this` refers to the global object (`window` in browsers or `global` in Node.js).

   ```javascript
   console.log(this); // In a browser, `this` will log the `window` object
   ```
  2. **Object Methods:**
   Within a method of an object, `this` refers to the object itself.

   ```javascript
   const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};
person.greet(); // Output: Hello, John

   ```
3. **Constructor Functions:**
In a constructor function, `this` refers to the newly created instance of the object.
```javascript
   function Animal(name) {
  this.name = name;
}

const dog = new Animal('Rover');
console.log(dog.name); // Output: Rover
```
4. **Arrow Functions:**
Arrow functions do not have their own this context. They inherit `this` from the surrounding non-arrow function or global context.
```javascript
const person = {
  name: 'John',
  greet: function() {
    const innerFunc = () => {
      console.log('Hello, ' + this.name);
    };
    innerFunc(); // Output: Hello, John
  }
};
person.greet();
```
5. **Event Handlers:**
In event handlers, this refers to the element that triggered the event.
```javascript
document.getElementById('myButton').addEventListener('click', function() {
  console.log(this); // Output: <button id="myButton">Click me</button>
});
```
6. **Explicit Binding:**
Methods like call(), apply(), and bind() can explicitly set the value of `this` when calling a function.
```javascript
function greet() {
  console.log('Hello, ' + this.name);
}

const person = { name: 'Alice' };
greet.call(person); // Output: Hello, Alice
```

| Context                      | `this` Refers To                      |
|------------------------------|---------------------------------------|
| In an object method          | The object itself                     |
| Alone                        | The global object (window in browsers or global in Node.js) |
| In a function (non-strict mode) | The global object                    |
| In a function (strict mode)  | `undefined`                           |
| In an event                   | The element that received the event   |
| Using `call()`, `apply()`, or `bind()` | Any object explicitly set by these methods |

# Closure

Closure is when a function keeps access to the variables it was originally created with, even after the outer function(creator function of that variable) has finished running/destroyed.
**Example(Closure)**:
```javascript
function outerFunction() {
    let number = 10;

    function innerFunction() {
        number++;
        console.log(number);
    }

    return innerFunction;
}

const myClosure = outerFunction();
myClosure(); // Output: 11
myClosure(); // Output: 12
myClosure(); // Output: 13

```
###Explanation of How Closure Behaves Like This:

1. **Function and Scope Creation:**
<br>
-When outerFunction is called, it creates a local scope where the variable number is set to 10.<br>
-Inside outerFunction, another function, innerFunction, is defined. This inner function has access to everything in its own scope and the scope of outerFunction.

2. **Returning a Function:**<br>
-outerFunction returns innerFunction without executing it immediately. Instead, it returns the function definition along with the scope where it was created. This returned function is stored in the variable myClosure.

3. **Closure is Formed:**<br>
-When outerFunction returns innerFunction, the scope of outerFunction doesn't disappear. Instead, it stays "alive" because innerFunction still has references to the variables within that scope (in this case, number).<br>
-This combination of the function and its scope is what we call a "closure."

4. **Persistent State:**<br>
-When you call myClosure() for the first time, it executes innerFunction, which increments number from 10 to 11 and then logs it.<br>
-Even though outerFunction has finished running, the number variable is still accessible and modifiable by innerFunction because of the closure.<br>
-The closure ensures that number retains its updated value between function calls. So, the next time you call myClosure(), it starts with number at 11, increments it to 12, and logs it.

5. **Why This Works:**<br>
-The closure keeps a reference to the number variable. Instead of being reset or discarded after outerFunction completes, number continues to exist within the closure. Each call to myClosure() accesses and modifies this same number variable.<br>
-This allows the function to have a "persistent state," meaning it remembers the changes made to its environment from previous executions.<br>
