const TOKEN_KEY = "@token";

const getToken = async () => {
  try {
    const tokenString = localStorage.getItem(TOKEN_KEY);
    const token = tokenString ? JSON.parse(tokenString) : null;
    return token;
  } catch (error) {
    console.error("Erro ao obter o token:", error);
    return null;
  }
};

const createToken = async (token: any) => {
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    return true;
  } catch (error) {
    console.error("Erro ao criar o token:", error);
    return false;
  }
};

const excludeToken = async () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error("Erro ao excluir o token:", error);
    return false;
  }
};

/*
// Exemplo de refreshToken usando axios
import axios from 'axios';
import { BaseURL } from './config';

const refreshToken = async () => {
  const token = await getToken();
  if (token) {
    try {
      const response = await axios.post(`${BaseURL()}/refresh_token`, { token });
      if (response.status === 200) {
        await createToken(response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.error("Erro ao renovar o token:", error);
    }
  }
  return null;
};
*/

export { getToken, createToken, excludeToken };
