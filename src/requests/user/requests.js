import axios from 'axios';

export async function createUser(userObject) {
  try {
    const response = await axios.post('/api/user/post', userObject, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      console.log('User created successfully:', response.data);
    } else {
      console.error('Error creating user. Unexpected status:', response.status);
    }
  } catch (error) {
    if (error.response) {
      // O servidor respondeu com um status diferente de 2xx
      console.error('Error creating user:', error.response.data);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta do servidor
      console.error('No response received from server');
    } else {
      // Algo aconteceu durante a configuração da requisição que causou o erro
      console.error('Error setting up request:', error.message);
    }
  }
}


export async function EditUser( userObject ) {
    try {
      const response = await axios.put('/api/user/put', userObject);
      console.log('User edit successfully:', response.data);
    } catch (error) {
      console.error('Error creating user:', error.response.data);
    }
  }

  
export async function DeleteUser( userId ) {
  try {
    const response = await axios.put('/api/user/delete/' + userId,);
    console.log('User delete successfully:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.response.data);
  }
}

