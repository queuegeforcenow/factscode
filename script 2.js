// script.js

document.getElementById('mcid-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const mcid = document.getElementById('mcid').value;
    const recaptchaResponse = grecaptcha.getResponse();

    if (recaptchaResponse.length === 0) {
        alert('reCAPTCHAを完了してください。');
        return;
    }

    const responseDiv = document.getElementById('response');

    // サーバーにMCIDとreCAPTCHAのトークンを送信
    const response = await fetch(`/api/authenticate?mcid=${encodeURIComponent(mcid)}&recaptchaResponse=${recaptchaResponse}`);

    if (response.ok) {
        const data = await response.json();
        responseDiv.innerHTML = data.message;
    } else {
        responseDiv.innerHTML = 'エラーが発生しました。再度お試しください。';
    }
});
