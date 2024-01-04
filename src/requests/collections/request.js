
export async function CreateCollection( newCollection, id ) {
    try {
        const response = await axios.post('/api/collections/edit', { collection: newCollection, id: id }, { headers: { 'Content-Type': 'application/json' } });
        console.log('User edit successfully: ', response?.data);
    } catch (error) {
      console.error('Error creating collection: ', error?.response);
    }
  }
