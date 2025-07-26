document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const securityCodeInput = document.getElementById('security-code');
    const resultDiv = document.getElementById('result');

    let stockData = {};

    // JSONデータを読み込む
    async function loadData() {
        try {
            const response = await fetch('data.json');
            stockData = await response.json();
        } catch (error) {
            console.error('データの読み込みに失敗しました:', error);
            resultDiv.textContent = 'データファイルの読み込みに失敗しました。';
        }
    }

    function search() {
        const code = securityCodeInput.value.trim();
        if (stockData[code]) {
            resultDiv.textContent = `会社名: ${stockData[code]}`;
        } else {
            resultDiv.textContent = '該当する会社名が見つかりません。';
        }
    }

    searchButton.addEventListener('click', search);

    securityCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            search();
        }
    });

    loadData();
});