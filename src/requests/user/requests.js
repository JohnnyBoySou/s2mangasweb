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

export { createPreferences, getPreferences, editPreferences, excludePreferences, likeManga, dislikeManga, verifyLiked, dislikeAllManga};



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