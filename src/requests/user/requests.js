function getPreferences() {
  try {
    const preferences = JSON.parse(localStorage.getItem('preferences')) || [];
    return preferences;
  } catch (error) {
    console.error('Error getting preferences:', error);
    return [];
  }
}

function editPreferences(updatedPreferences) {
  try {
    const preferences = { ...updatedPreferences };
    localStorage.setItem('preferences', JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error editing preferences:', error);
    return false;
  }
}

function createPreferences(preferences) {
  try {
    localStorage.setItem('preferences', JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error creating preference:', error);
  }
}

function excludePreferences() {
  try {
    localStorage.removeItem('preferences');
    return true;
  } catch (error) {
    console.error('Error excluding preference ', error);
  }
}

export { 
  createPreferences, getPreferences, editPreferences, excludePreferences, //pronto 
  likeManga, dislikeManga, verifyLiked, dislikeAllManga, //pronto 
  addMark, removeMark, getMarks, 
  addFollow, removeFollow, verifyFollow, //pronto
  addComplete, removeComplete, verifyComplete, //pronto
};


function likeManga(manga) {
  try {
    const preferences = getPreferences();
    if (!preferences.likes.some(item => item.id === manga.id)) {
      preferences.likes.push(manga);
      editPreferences(preferences);
    }
    return true;
  } catch (error) {
    console.error('Error liking manga:', error);
    return false;
  }
}

function verifyLiked(id) {
  try {
    const preferences = getPreferences();
    return preferences.likes.some(manga => manga.id === id);
  } catch (error) {
    console.error('Error verifying liked manga:', error);
    return false;
  }
}

function dislikeManga(id) {
  try {
    const preferences = getPreferences();
    preferences.likes = preferences.likes.filter(manga => manga.id !== id);
    editPreferences(preferences);
    return true;
  } catch (error) {
    console.error('Error disliking manga:', error);
    return false;
  }
}

function dislikeAllManga() {
  try {
    const preferences = getPreferences();
    preferences.likes = [];
    editPreferences(preferences);
    return true;
  } catch (error) {
    console.error('Error disliking all manga:', error);
    return false;
  }
}

function addMark(manga, chapter) {
  try {
    const preferences = getPreferences();
    console.log(preferences.marks)
    if (!preferences.marks) {
      preferences.marks = [];
    }
    const existingMark = preferences.marks.find(mark => mark.manga.id === manga.id);
    if (existingMark) {
      if (!existingMark.chapters.includes(chapter)) {
        existingMark.chapters.push(chapter);
      }
    } else {
     // preferences.marks.push({ manga});
    }
    
    editPreferences(preferences);
    return true;
  } catch (error) {
    console.error('Error adding follow:', error);
    return false;
  }
}

function removeMark(manga, chapterToRemove) {
  try {
    const preferences = getPreferences();
    preferences.marks = preferences.marks.map(mark => {
      if (mark.manga.id === manga.id) {
        mark.chapter = mark.chapter.filter(chapter => chapter !== chapterToRemove);
      }
      return mark;
    });
    editPreferences(preferences);
    return true;
  } catch (error) {
    console.error('Error removing follow:', error);
    return false;
  }
}

function getMarks(manga) {
  try {
    const preferences = getPreferences();
    const marks = preferences.marks.filter(mark => mark.manga === manga);
    return marks.map(mark => mark.chapter);
  } catch (error) {
    console.error('Error getting marks:', error);
    return [];
  }
}


function addFollow(manga) {
  try {
    const preferences = getPreferences();
    if (!preferences.follow.some(item => item.id === manga.id)) {
      preferences.follow.push(manga);
      editPreferences(preferences);
    }
    return true;
  } catch (error) {
    console.error('Error liking manga:', error);
    return false;
  }
}

function removeFollow(id) {
  try {
    const preferences = getPreferences();
    preferences.follow = preferences.follow.filter(manga => manga.id !== id);
    editPreferences(preferences);
    return true;
  } catch (error) {
    console.error('Error disliking manga:', error);
    return false;
  }
}


function verifyFollow(id) {
  try {
    const preferences = getPreferences();
    return preferences.follow.some(manga => manga.id === id);
  } catch (error) {
    console.error('Error verifying liked manga:', error);
    return false;
  }
}



function editFollow(manga, chapter) {
  try {
    const preferences = getPreferences();
    const follow = preferences.follows.find(follow => follow.manga === manga);
    if (follow) {
      follow.chapter = chapter;
      editPreferences(preferences);
      return true;
    } else {
      console.error('Follow not found');
      return false;
    }
  } catch (error) {
    console.error('Error editing follow:', error);
    return false;
  }
}


function addComplete(manga) {
  try {
    const preferences = getPreferences();
    preferences.complete.push(manga);
    editPreferences(preferences);
    return true;
  } catch (error) {
    console.error('Error setting complete:', error);
    return false;
  }
}

function removeComplete(id) {
  try {
    const preferences = getPreferences();
    preferences.complete = preferences.complete.filter(item => item.id !== id);
    editPreferences(preferences);
    return true;
  } catch (error) {
    console.error('Error removing complete:', error);
    return false;
  }
}
function verifyComplete(id) {
  try {
    const preferences = getPreferences();
    return preferences.complete.some(manga => manga.id === id);
  } catch (error) {
    console.error('Error verifying complete manga:', error);
    return false;
  }
}