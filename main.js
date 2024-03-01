// Add function
function addNumbers(num1, values) {
    return num1 + values;
}

// Subtract function
function subtractNumbers(num1, values) {
    return num1 - values;
}

// Multiply function
function multiplyNumbers(num1, values) {
    return num1 * values;
}

// Divide function
function divideNumbers(num1, values) {
    return num1 / values;
}

// All operations
function operate(num1, values, operator) {
    if (operator === "+") {
        return addNumbers(num1, values);
    }
    else if (operator === "\u2212") {
        // \u2212 is the unicode for the minus sign
        return subtractNumbers(num1, values);
    }
    else if (operator === "\xD7") {
        // \xD7 is the unicode for the multiplication sign
        return multiplyNumbers(num1, values);
    }
    else {
        return divideNumbers(num1, values);
    }
}

// Displays the numbers when the number buttons are clicked
function displayTop(num, numbers) {
    if (numbers === undefined || numbers === '') {
        value = num;
    }
    else if (typeof Number(numbers) === 'number' && numbers.length < 13) {
        value = numbers + num;
    }
    document.getElementById('display-top').innerText = value;
    return value;
}

// Clears the display and all values
function clearAll(value, values) {
    value = '0';
    document.getElementById('display-top').innerText = value;
    op = '';
    length = values.length;
    for (let i = 0; i < length; i++) {
        values.pop();
    }

}

// Changes sign of number
function sign(values) {
    let value = document.getElementById('display-top').innerText;
    value = Number(value);
    let content;
    if (value > 0) {
        content = `-${value}`;
    }
    else if (value < 0) {
        value = value.toString();
        content = value.slice(1);
    }
    else {
        content = value;
    }
    values.pop();
    document.getElementById('display-top').innerText = content;
    return content;
}

// Converts the number to a percentage
function percentage(values) {
    let value = document.getElementById('display-top').innerText;
    let content = Number(value) / 100;
    content = content.toString();
    if (content.length > 13) {
        content = content.slice(0, 13);
    }
    values.pop()
    document.getElementById('display-top').innerText = content;
    return content;
}

function runCalculator() {
    const values = [];
    let value, op = '';

    // Add event listeners to the number buttons
    document.getElementById('num1').addEventListener('click', () => { value = displayTop('1', value); });
    document.getElementById('num2').addEventListener('click', () => { value = displayTop('2', value); });
    document.getElementById('num3').addEventListener('click', () => { value = displayTop('3', value) });
    document.getElementById('num4').addEventListener('click', () => { value = displayTop('4', value) });
    document.getElementById('num5').addEventListener('click', () => { value = displayTop('5', value) });
    document.getElementById('num6').addEventListener('click', () => { value = displayTop('6', value) });
    document.getElementById('num7').addEventListener('click', () => { value = displayTop('7', value) });
    document.getElementById('num8').addEventListener('click', () => { value = displayTop('8', value) });
    document.getElementById('num9').addEventListener('click', () => { value = displayTop('9', value) });
    document.getElementById('num0').addEventListener('click', () => { value = displayTop('0', value) });
    document.getElementById('num00').addEventListener('click', () => { value = displayTop('00', value) });
    document.getElementById('floating-point').addEventListener('click', () => { value = displayTop('.', value) });

    // Add event listeners to the operator buttons
    document.getElementById('add').addEventListener('click', () => { op = '+'; });
    document.getElementById('subtract').addEventListener('click', () => { op = '\u2212'; });
    document.getElementById('multiply').addEventListener('click', () => { op = '\xD7'; });
    document.getElementById('divide').addEventListener('click', () => { op = '\xF7'; });
    document.getElementById('equal').addEventListener('click', () => { op = '='; });

    // Add event listener to the clear button
    document.getElementById('clear').addEventListener('click', () => { value = clearAll(value, values); });

    // Add event listener to the sign button
    document.getElementById('sign').addEventListener('click', () => { value = sign(values); });

    // Add event listener to the percentage button
    document.getElementById('percentage').addEventListener('click', () => { value = percentage(values); });

    // Calculate the result
    document.querySelectorAll('.button-op').forEach(button => {
        button.addEventListener('click', function () {

            if (value != '') {
                values.push(value);
            }
            value = '';

            if (values.length === 3) {
                result = operate(Number(values[0]), Number(values[2]), values[1]);
                result = result.toString();
                if (result.length > 13) {
                    result = result.slice(0, 13);
                }

                document.getElementById('display-top').innerText = result;
                length = values.length;
                for (let i = 0; i < length; i++) {
                    values.pop();
                }
                values.push(result);
            }

            if (op != '=' && (value != '' || values.length === 1)) {
                values.push(op);
            }
        });
    });

    document.querySelectorAll('.button-num').forEach(button => {
        button.addEventListener('click', function () {

            if (op === '=') {
                length = values.length;
                for (let i = 0; i < length; i++) {
                    values.pop();
                }
            }

        });
    });


}


runCalculator();
