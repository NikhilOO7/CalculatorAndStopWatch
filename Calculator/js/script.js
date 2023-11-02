$(document).ready(function () {
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[northeastern]+\.edu$/;
        return emailRegex.test(email);
    };

    const validateField = (value, fieldName, minLength, maxLength) => {
        const errors = [];
        if (!value) {
            errors.push(`${fieldName} is required.`);
        }
        if (value && value.length < minLength) {
            errors.push(`${fieldName} must be at least ${minLength} characters.`);
        }
        if (value && value.length > maxLength) {
            errors.push(`${fieldName} must be less than ${maxLength} characters.`);
        }
        if (value && fieldName !== "Email" && !/^[a-zA-Z0-9]+$/.test(value)) {
            errors.push(`${fieldName} must not contain special characters.`);
        }
        return errors;
    };

    const enableLoginButton = () => {
        $('#loginButton').prop('disabled', false);
    };

    const disableLoginButton = () => {
        $('#loginButton').prop('disabled', true);
    };

    const redirect = (username) => {
        // Redirect logic to the second page
        window.location.href = `calculator.html?username=${username}`;
    };

    $('#email').on('input', function () {
        const email = $(this).val();
        const { isValid, errorMessage } = validateField(email, 'Email', 5, 50);
        if (isValidEmail(email)) {
            $('#emailError').text('');
        } else {
            $('#emailError').text('Invalid email format.');
        }
        if (errorMessage && errorMessage.length === 0) {
            enableLoginButton();
        } else {
            disableLoginButton();
            $('#emailError').text(errorMessage.join(' '));
        }
    });

    $('#username').on('input', function () {
        const username = $(this).val();
        const { isValid, errorMessage } = validateField(username, 'Username', 5, 20);
        if (errorMessage && errorMessage.length === 0) {
            enableLoginButton();
        } else {
            disableLoginButton();
            $('#usernameError').text(errorMessage.join(' '));
        }
    });

    $('#password').on('input', function () {
        const password = $(this).val();
        const { isValid, errorMessage } = validateField(password, 'Password', 8, 20);
        if (errorMessage && errorMessage.length === 0) {
            enableLoginButton();
        } else {
            disableLoginButton();
            $('#passwordError').text(errorMessage.join(' '));
        }
    });

    $('#confirmPassword').on('input', function () {
        const confirmPassword = $(this).val();
        const password = $('#password').val();
        if (confirmPassword === password) {
            $('#confirmPasswordError').text('');
            enableLoginButton();
        } else {
            disableLoginButton();
            $('#confirmPasswordError').text('Passwords do not match.');
        }
    });

    $('#loginButton').on('click', function () {
        const email = $('#email').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

        const emailErrors = validateField(email, 'Email', 5, 50);
        const usernameErrors = validateField(username, 'Username', 5, 20);
        const passwordErrors = validateField(password, 'Password', 8, 20);
        const confirmPasswordErrors = confirmPassword === password ? [] : ['Passwords do not match.'];

        if (emailErrors.length === 0 && usernameErrors.length === 0 && passwordErrors.length === 0 && confirmPasswordErrors.length === 0) {
            redirect(username);
        } else {
            $('#emailError').text(emailErrors.join(' '));
            $('#usernameError').text(usernameErrors.join(' '));
            $('#passwordError').text(passwordErrors.join(' '));
            $('#confirmPasswordError').text(confirmPasswordErrors.join(' '));
        }
    });
});
