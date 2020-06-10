let submitBtn = document.querySelector("#main-button");
let inputText = document.querySelector("#main-input");
let resultOut = document.querySelector(".final-result");

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

submitBtn.addEventListener('click', () => {
    const data = { "inputStr": inputText.value };
    postData('/api/analyse/', data)
        .then(data => {
            if (data.positive > data.negative) {
                resultOut.innerHTML = "Positive"
            } else {
                resultOut.innerHTML = "Negative"
            }
        });
});