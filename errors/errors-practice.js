//Створіть клас FormatError, який успадковується від вбудованого класу SyntaxError.
//Він повинен підтримувати властивості message, name та stack.

class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

let err = new FormatError("formatting error");

console.log( err.message ); // formatting error
console.log( err.name ); // FormatError
 console.log( err.stack ); // stack

console.log( err instanceof FormatError ); // true
console.log( err instanceof SyntaxError );

//Write a function called validateEmail that takes an email as a parameter and
// throws a ValidationError if the email does not contain the '@' symbol.

class ValidationError extends Error {
    constructor(message = "Validation Error occur") {
        super(message);
        this.name = this.constructor.name;
    }
}

function validateEmail (email) {
 if (!email.includes('@')) {
    throw new ValidationError("Invalid email");
 }
}

function processInput(input) {
    try {
        validateEmail(input);
        console.log("Email is valid:", input);
    } catch (err) {
        if (err instanceof ValidationError) {
            console.error(`Invalid data: ${err.message}`);
        }
        else {
            console.error(`Unexpected Error: ${err.message}`);
            throw err;
        }
    }
    //finally {
    //    input.value = '';
   // }
}

processInput("test@");
processInput();

//Exercise 1: Custom Error Class
//Create a custom error class called RangeError that represents an error when a given number is outside a specified range.
// This error should take three parameters: value (the actual value), min (the minimum allowed value), and max (the maximum allowed value). The error message should indicate the value and the allowed range.

class RangeError extends Error {
    constructor(val, min, max, message = `The value of ${val} is out of range from ${min} to ${max}`) {
        super(message);
        this.name = this.constructor.name;
    }
}
//Exercise 2: Using Custom Error
//Write a function called checkNumberInRange that takes a number as a parameter and throws a RangeError if the number is outside the range of 1 to 100 (inclusive).
function checkNumberInRange (value) {
    const min = 1;
    const max = 100;
    if (value < min || value > max) {
        throw new RangeError(value, min, max);
    }
    else if (typeof value !== 'number') {
        throw new TypeError('Value is not a number');
    }
}
//Exercise 3: Handling Custom Errors
//Write a function called processNumber that takes a number as a parameter. Inside this function, call the checkNumberInRange function from Exercise 2 with the input number. Handle any thrown RangeError and log the error message to the console.

function processNumber (num) {
    try{ 
        checkNumberInRange(num);
        console.log("Number is valid");
    } catch (err) {
        if (err instanceof RangeError) {
            console.error(`Range Error occur: ${err.message}`);
        }
        else if (err instanceof TypeError) {
            console.error(`Type Error occur: ${err.message}`)
        }
        else {
            console.error(`Unexpected Error: ${err.message}`);
        }
    }
}

processNumber(0);
processNumber(5);
processNumber('5');

//TimeoutError

class TimeoutError extends Error {
    constructor(message = "Operation timed out.") {
      super(message);
      this.name = "TimeoutError";
    }
  }
  
  function fetchDataFromAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new TimeoutError("API call timed out."));
      }, 5000);
    });
  }

//CustomAPIError

class CustomAPIError extends Error {
constructor(code, message) {
    super(message);
    this.name = "CustomAPIError";
    this.code = code;
}
}

function handleAPIResponse(response) {
if (response.status === "error") {
    throw new CustomAPIError(response.errorCode, response.errorMessage);
}
}


