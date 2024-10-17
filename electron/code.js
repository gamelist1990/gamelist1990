async function extractGenshinCodes() {
    const codeBlocks = document.querySelectorAll('.ql-divider');
    const codes = [];

    codeBlocks.forEach(codeBlock => {
        const nextElements = [];
        let nextSibling = codeBlock.nextElementSibling;

        while (nextSibling && !nextSibling.classList.contains('ql-divider')) {
            nextElements.push(nextSibling);
            nextSibling = nextSibling.nextElementSibling;
        }

        const code = nextElements.find(el => el.tagName === 'H2')?.textContent.trim();
        const rewards = nextElements
            .filter(el =>
                el.tagName === 'P' &&
                !el.querySelector('strong') &&
                el.textContent.trim() !== ''
            )
            .map(el => el.textContent.trim().replace('自動入力リンク', '')) 
            ;
        const addedDate = nextElements
            .find(el => el.tagName === 'P' && el.querySelector('strong'))
            ?.textContent.replace(/追加日：(.*)\)/, '（追加日: $1）'); 
        if (code) {
            codes.push({
                code: code,
                addedDate: addedDate,
                rewards: rewards,
            });
        }
    });

    const jsonData = JSON.stringify(codes);

    alert('コード情報をクリップボードにコピーしますか？\nOKを押した後、少しお待ちください。');

    await new Promise(resolve => setTimeout(resolve, 100)); 

    try {
        await navigator.clipboard.writeText(jsonData);
        alert('コード情報がJSON形式でクリップボードにコピーされました！');
    } catch (err) {
        console.error('クリップボードへのコピーに失敗しました:', err);
    }
}

extractGenshinCodes();