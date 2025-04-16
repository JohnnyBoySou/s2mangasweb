
import { fetchWithAuth, fetchWithNoAuth } from "../../hooks/api";
import { createToken, excludeToken } from "../../hooks/token";


export const listUser = async() => {
  try {
    const res = await fetchWithAuth("/users", { method: "GET" });
    return res.user;
  } catch (error) {
    throw new Error(error.message);
  }
};   

export const registerUser = async(data) => {
  try {
    const res = await fetchWithNoAuth("/register", { method: "POST", data: data });
    await createToken(res.token);
    return res;
  } catch (error) {
    console.log(error.response.data);
    throw new Error(error.response.data.message);
  }
};   

export const loginUser = async(data) => {
  try {
    const res = await fetchWithNoAuth("/login", { method: "POST", data: data });
    await createToken(res.token);
    return res;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateUser = async(data) => {
  try {
    const res = await fetchWithAuth("/users/edit", { method: "PUT", data: data });
    return res;
  } catch (error) { 
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async() => {
  try {
    const res = await fetchWithAuth("/users/exclude", { method: "DELETE", data: {} });
    console.log(res);
    await excludeToken();
    return res; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const forgetpassword = async(email) => {
  try {
    const res = await fetchWithAuth("/forget-password-code", { method: "POST", data: { email: email } });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const forgetpasswordvalidate = async(email, codigo) => {
  try {
    const res = await fetchWithAuth("/forget-password-validate", { method: "POST", data: { email: email, code: codigo } });
    return res;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const resetpassword = async(email, codigo, senha) => { 
  try {
    const res = await fetchWithAuth("/reset-password", { method: "POST", data: { email: email, code: codigo, password: senha } });
    return res;
  } catch (error) {
    console.log(error.response.data);
    throw new Error(error.response.data.message);
  }
};
export const listGenres = async() => {
  try {
    const res = await fetchWithAuth("/user/genres", { method: "GET" });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
