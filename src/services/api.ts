import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("entnttoken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  verify: async () => {
    const response = await api.get("/auth/verify");
    return response;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response;
  },
};

export const companies = {
  getAll: async () => {
    const response = await api.get("/companies");
    return response.data;
  },
  create: async (companyData: object) => {
    const response = await api.post("/companies", companyData);
    return response.data;
  },
  update: async (id: string, companyData: object) => {
    const response = await api.put(`/companies/${id}`, companyData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  },
};
export const communications = {
  getAll: async (id: string) => {
    const response = await api.get(`/communications`, {
      params: {
        companyID: id,
      },
    });
    return response.data;
  },
  getAlll: async () => {
    const response = await api.get(`/communications/all`);
    return response.data;
  },
  create: async (companyData: object) => {
    const response = await api.post("/communications", companyData);
    return response.data;
  },
  update: async (email: string, companyData: object) => {
    const response = await api.put(`/communications/${email}`, companyData);
    return response.data;
  },
  delete: async (email: string) => {
    const response = await api.delete(`/communications/${email}`);
    return response.data;
  },
};

export default api;
