$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const loggedInUser = urlParams.get('username');

    $('#loggedInUser').text(loggedInUser);

    const isValidNumber = (number) => {
        return !isNaN(number) && isFinite(number);
    };

    $('#number1').on('input', function () {
        const number1 = $(this).val();
        const isValid = isValidNumber(number1);
        if (!isValid || number1 === '') {
            $('#number1Error').text('Please enter a valid number');
        } else {
            $('#number1Error').text('');
        }
    });

    $('#number2').on('input', function () {
        const number2 = $(this).val();
        const isValid = isValidNumber(number2);
        if (!isValid || number2 === '') {
            $('#number2Error').text('Please enter a valid number');
        } else {
            $('#number2Error').text('');
        }
    });

    const performOperation = (operator) => {
        const number1 = parseFloat($('#number1').val());
        const number2 = parseFloat($('#number2').val());
        let result;
        switch (operator) {
            case 'add':
                result = number1 + number2;
                break;
            case 'subtract':
                result = number1 - number2;
                break;
            case 'multiply':
                result = number1 * number2;
                break;
            case 'divide':
                if (number2 === 0) {
                    $('#number2Error').text('Cannot divide by 0');
                    $('#result').val('');
                    return;
                } else {
                    result = number1 / number2;
                }
                break;
            default:
                return;
        }
        $('#result').val(result);
    };

    $('#addButton').on('click', function () {
        performOperation('add');
    });

    $('#subtractButton').on('click', function () {
        performOperation('subtract');
    });

    $('#multiplyButton').on('click', function () {
        performOperation('multiply');
    });

    $('#divideButton').on('click', function () {
        performOperation('divide');
    });
});
