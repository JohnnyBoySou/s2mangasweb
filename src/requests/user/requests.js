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

export { createPreferences, getPreferences, editPreferences, excludePreferences  };






