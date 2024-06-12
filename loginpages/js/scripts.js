import ApiConnection from '../../js/api.js';

document.addEventListener('DOMContentLoaded', function () {
    const api = new ApiConnection();

    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    const forgotPasswordBox = document.getElementById('forgotPasswordBox');
    const enterCodeBox = document.getElementById('enterCodeBox');
    const resetPasswordBox = document.getElementById('resetPasswordBox');

    const showRegisterButton = document.getElementById('showRegisterButton');
    const showForgotPasswordButton = document.getElementById('showForgotPasswordButton');
    const backToLoginButton = document.getElementById('backToLoginButton');
    const backToLoginFromForgotButton = document.getElementById('backToLoginFromForgotButton');
    const backToLoginFromEnterCodeButton = document.getElementById('backToLoginFromEnterCodeButton');
    const backToLoginFromResetButton = document.getElementById('backToLoginFromResetButton');

    const getCodeButton = document.getElementById('getCodeButton');
    const submitCodeButton = document.getElementById('submitCodeButton');
    const changePasswordButton = document.getElementById('changePasswordButton');

    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    showRegisterButton.addEventListener('click', function () {
        transitionBoxes(loginBox, registerBox);
    });

    showForgotPasswordButton.addEventListener('click', function () {
        transitionBoxes(loginBox, forgotPasswordBox);
    });

    backToLoginButton.addEventListener('click', function () {
        transitionBoxes(registerBox, loginBox);
    });

    backToLoginFromForgotButton.addEventListener('click', function () {
        transitionBoxes(forgotPasswordBox, loginBox);
    });

    backToLoginFromEnterCodeButton.addEventListener('click', function () {
        transitionBoxes(enterCodeBox, loginBox);
    });

    backToLoginFromResetButton.addEventListener('click', function () {
        transitionBoxes(resetPasswordBox, loginBox);
    });

    getCodeButton.addEventListener('click', function () {
        transitionBoxes(forgotPasswordBox, enterCodeBox);
    });

    submitCodeButton.addEventListener('click', function () {
        transitionBoxes(enterCodeBox, resetPasswordBox);
    });

    changePasswordButton.addEventListener('click', function () {
        transitionBoxes(resetPasswordBox, loginBox);
    });

    loginButton.addEventListener('click', async function () {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const allowedChars = /^[a-zA-Z0-9_]+$/;
        const allowedEmailChars = /^[a-zA-Z0-9_.@]+$/;

        if (!loginUsername) {
            showSnackbar('loginSnackbar', 'Имя пользователя или почта не может быть пустым');
            return;
        }
        if (!allowedChars.test(loginUsername) && !allowedEmailChars.test(loginUsername)) {
            showSnackbar('loginSnackbar', 'Допустимы латинские буквы и символы _ . @');
            return;
        }
        if (!loginPassword) {
            showSnackbar('loginSnackbar', 'Пароль не может быть пустым');
            return;
        }

        const result = await api.authenticateUser(loginUsername, loginPassword);

        if (result.startsWith('User authenticated successfully')) {
            window.location.href = '../Kanban/index.html';
        } else {
            showSnackbar('loginSnackbar', 'Неверные данные для входа');
        }
    });

    registerButton.addEventListener('click', async function () {
        const registerUsername = document.getElementById('registerUsername').value;
        const registerEmail = document.getElementById('registerEmail').value;
        const registerPassword1 = document.getElementById('registerPassword1').value;
        const registerPassword2 = document.getElementById('registerPassword2').value;

        const allowedChars = /^[a-zA-Z0-9_]+$/;
        const allowedEmailChars = /^[a-zA-Z0-9_.@]+$/;
        const allowedPasswordChars = /^[a-zA-Z0-9!@$%^&*()_\-+абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]+$/;

        if (!registerUsername) {
            showSnackbar('registerSnackbar', 'Имя пользователя не может быть пустым');
            return;
        }
        if (!allowedChars.test(registerUsername)) {
            showSnackbar('registerSnackbar', 'Допустимы латинские буквы и символ _');
            return;
        }
        if (!registerEmail) {
            showSnackbar('registerSnackbar', 'Адрес электронной почты не может быть пустым');
            return;
        }
        if (!allowedEmailChars.test(registerEmail)) {
            showSnackbar('registerSnackbar', 'Допустимы латинские буквы и символы _ . @');
            return;
        }
        if (!registerPassword1 || !registerPassword2) {
            showSnackbar('registerSnackbar', 'Пароль не может быть пустым');
            return;
        }
        if (!allowedPasswordChars.test(registerPassword1)) {
            showSnackbar('registerSnackbar', 'Допустимы русские и латинские буквы, символы !@$%^&*()_-+"');
            return;
        }
        if (registerPassword1 !== registerPassword2) {
            showSnackbar('registerSnackbar', 'Пароли не совпадают');
            return;
        }

        const result = await api.registerUser(registerUsername, registerEmail, registerPassword1);

        if (result.status === 204) {
            showSnackbar('registerSnackbar', 'Успешная регистрация', 'success');
            transitionBoxes(registerBox, loginBox);
        } else {
            showSnackbar('registerSnackbar', 'Ошибка регистрации', 'error');
        }
    });


    function transitionBoxes(hideBox, showBox) {
        hideBox.style.display = 'none';
        showBox.style.display = 'block';
    }

    function showSnackbar(snackbarId, message, type = 'error') {
        const snackbar = document.getElementById(snackbarId);
        snackbar.innerText = message;
        snackbar.style.backgroundColor = type === 'success' ? '#4CAF50' : '#FF5722';
        snackbar.style.display = 'block';
        setTimeout(() => {
            snackbar.style.display = 'none';
        }, 3000);
    }
});

export default ApiConnection;