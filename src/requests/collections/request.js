function getCollections() {
  try {
    const collections = JSON.parse(localStorage.getItem('collections')) || [];
    return collections;
  } catch (error) {
    console.error('Error getting collections:', error);
    return [];
  }
}

function editCollectionByID(id, updatedCollection) {
  try {
    const collections = getCollections();
    const index = collections.findIndex(collection => collection.id === id);
    if (index !== -1) {
      const { id: existingId } = collections[index];
      collections[index] = { ...updatedCollection, id: existingId };
      localStorage.setItem('collections', JSON.stringify(collections));
      return true
    }
    return true;
  } catch (error) {
    console.error('Error editing collection by ID:', error);
    return false;
  }
}

function getCollectionByID(id) {
  try {
    const collections = getCollections();
    return collections.find(collection => collection.id === id);
  } catch (error) {
    console.error('Error getting collection by ID:', error);
    return null;
  }
}

function createCollection(collection) {
  try {
    const collections = getCollections();
    if (!collection.id) {
      collection.id = generateRandomId();
    }
    const idExists = collections.some(c => c.id === collection.id);
    if (idExists) {
      console.log('idExists')
    }
    collections.push(collection);
    localStorage.setItem('collections', JSON.stringify(collections));
    return true;
  } catch (error) {
    console.error('Error creating collection:', error);
  }
}

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

function excludeCollectionByID(id) {
  try {
    const collections = getCollections();
    const index = collections.findIndex(collection => collection.id === id);
    if (index !== -1) {
      collections.splice(index, 1);
      localStorage.setItem('collections', JSON.stringify(collections));
      return true;
    }
  } catch (error) {
    console.error('Error excluding collection by ID:', error);
  }
}

function addMangaInCollectionByID(id, mangaID) {
  try {
    const collections = getCollections();
    const index = collections.findIndex(collection => collection.id === id);
    if (index !== -1) {
      collections[index].mangas_ids.push(mangaID);
      localStorage.setItem('collections', JSON.stringify(collections));
      return true;
    }
  } catch (error) {
    console.error('Error adding manga to collection by ID:', error);
  }
}




function excludeAllCollections() {
  try {
    localStorage.removeItem('collections');
    return true;
  } catch (error) {
    console.error('Error excluding all collections:', error);
    return false;
  }
}

export { createCollection, getCollections, editCollectionByID, getCollectionByID, excludeCollectionByID, addMangaInCollectionByID , excludeAllCollections};


