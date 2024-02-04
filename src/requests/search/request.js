const saveWord = (word) => {
    if(word.length == 0) return;
    if (typeof localStorage !== 'undefined') {
        const searchHistory = localStorage.getItem('searchHistory');
        if (searchHistory) {
            const historyArray = JSON.parse(searchHistory);
            if (!historyArray.includes(word)) {
                historyArray.push(word);
                localStorage.setItem('searchHistory', JSON.stringify(historyArray));
            }
        } else {
            localStorage.setItem('searchHistory', JSON.stringify([word]));
        }
    }
};

const excludeWord = (word) => {
    if (typeof localStorage !== 'undefined') {
        const searchHistory = localStorage.getItem('searchHistory');
        if (searchHistory) {
            const historyArray = JSON.parse(searchHistory);
            const updatedHistory = historyArray.filter((item) => item !== word);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        }
    }
};

const excludeWords = () => {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('searchHistory');
    }
};

const listWords = () => {
    if (typeof localStorage !== 'undefined') {
        const searchHistory = localStorage.getItem('searchHistory');
        if (searchHistory) {
            const historyArray = JSON.parse(searchHistory);
            return historyArray;
        }
    }
    return [];
};



export { saveWord, excludeWord, listWords, excludeWords}