    function addHistory(manga) {
        try {
            const history = JSON.parse(localStorage.getItem('history'));
            history.push(manga);
            localStorage.setItem('history', JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('Error adding manga to history:', error);
            return false;
        }
    }

    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem('history'));
        } catch (error) {
            console.error('Error retrieving history:', error);
            return false;
        }
    }

    function removeHistory(id) {
        try {
            const history = JSON.parse(localStorage.getItem('history'));
            const updatedHistory = history.filter(manga => manga.id !== id);
            localStorage.setItem('history', JSON.stringify(updatedHistory));
            return true;
        } catch (error) {
            console.error('Error removing manga from history:', error);
            return false;
        }
    }

    function removeAllHistory() {
        try {
            localStorage.removeItem('history');
            return true;
        } catch (error) {
            console.error('Error removing all manga from history:', error);
            return false;
        }
    }
   
    export {
        addHistory,
        getHistory,
        removeHistory,
        removeAllHistory,
      }