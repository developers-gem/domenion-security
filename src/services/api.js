import axios from "axios";

// Standard API client using VITE_API_URL environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token from localStorage if logged in
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message || "An unexpected network error occurred";
    return Promise.reject(new Error(message));
  }
);

// --- AUTHENTICATION API ---
export const authAPI = {
  login: async (credentials) => {
    const response = await API.post("/api/users/login", credentials);
    if (response.data?.data?.token) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await API.post("/api/users/register", userData);
    if (response.data?.data?.token) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response.data;
  },
  getProfile: async () => {
    const response = await API.get("/api/users/profile");
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
};

// --- USERS API ---
export const usersAPI = {
  getUsers: async () => {
    const response = await API.get("/api/users");
    return response.data;
  },
};

// --- CAREERS API ---
export const careersAPI = {
  getCareers: async (params = {}) => {
    const response = await API.get("/api/careers", { params });
    return response.data;
  },
  getCareerById: async (id) => {
    const response = await API.get(`/api/careers/${id}`);
    return response.data;
  },
  createCareer: async (data) => {
    const response = await API.post("/api/careers", data);
    return response.data;
  },
  updateCareer: async (id, data) => {
    const response = await API.put(`/api/careers/${id}`, data);
    return response.data;
  },
  deleteCareer: async (id) => {
    const response = await API.delete(`/api/careers/${id}`);
    return response.data;
  },
};

// --- APPLICATIONS API ---
export const applicationsAPI = {
  submitApplication: async (formData) => {
    const response = await API.post("/api/career-forms/careerform", formData);
    return response.data;
  },
  getApplications: async (params = {}) => {
    const response = await API.get("/api/career-forms", { params });
    return response.data;
  },
  getApplicationById: async (id) => {
    const response = await API.get(`/api/career-forms/${id}`);
    return response.data;
  },
  updateApplicationStatus: async (id, status) => {
    const response = await API.put(`/api/career-forms/${id}/status`, { status });
    return response.data;
  },
  deleteApplication: async (id) => {
    const response = await API.delete(`/api/career-forms/deletecareerform/${id}`);
    return response.data;
  },
};

// --- CONTACT API ---
export const contactAPI = {
  submitContact: async (formData) => {
    const response = await API.post("/api/contact", formData);
    return response.data;
  },
  getContacts: async (params = {}) => {
    const response = await API.get("/api/contact", { params });
    return response.data;
  },
  getContactById: async (id) => {
    const response = await API.get(`/api/contact/${id}`);
    return response.data;
  },
  updateContact: async (id, data) => {
    const response = await API.put(`/api/contact/${id}`, data);
    return response.data;
  },
  deleteContact: async (id) => {
    const response = await API.delete(`/api/contact/${id}`);
    return response.data;
  },
};

// --- QUOTES API ---
export const quotesAPI = {
  submitQuote: async (formData) => {
    const response = await API.post("/api/quotes", formData);
    return response.data;
  },
  getQuotes: async (params = {}) => {
    const response = await API.get("/api/quotes", { params });
    return response.data;
  },
  getQuoteById: async (id) => {
    const response = await API.get(`/api/quotes/${id}`);
    return response.data;
  },
  updateQuote: async (id, data) => {
    const response = await API.put(`/api/quotes/${id}`, data);
    return response.data;
  },
  deleteQuote: async (id) => {
    const response = await API.delete(`/api/quotes/${id}`);
    return response.data;
  },
};

// --- LEADS API ---
export const leadsAPI = {
  createLead: async (data) => {
    const response = await API.post("/api/leads", data);
    return response.data;
  },
  getLeads: async (params = {}) => {
    const response = await API.get("/api/leads", { params });
    return response.data;
  },
  getLeadById: async (id) => {
    const response = await API.get(`/api/leads/${id}`);
    return response.data;
  },
  updateLead: async (id, data) => {
    const response = await API.put(`/api/leads/${id}`, data);
    return response.data;
  },
  deleteLead: async (id) => {
    const response = await API.delete(`/api/leads/${id}`);
    return response.data;
  },
};

// --- BLOGS API ---
export const blogsAPI = {
  getBlogs: async (params = {}) => {
    const response = await API.get("/api/blogs", { params });
    return response.data;
  },
  getBlogBySlug: async (slug) => {
    const response = await API.get(`/api/blogs/${slug}`);
    return response.data;
  },
  createBlog: async (data) => {
    const response = await API.post("/api/blogs", data);
    return response.data;
  },
  updateBlog: async (id, data) => {
    const response = await API.put(`/api/blogs/${id}`, data);
    return response.data;
  },
  deleteBlog: async (id) => {
    const response = await API.delete(`/api/blogs/${id}`);
    return response.data;
  },
};

// --- FAQS API ---
export const faqsAPI = {
  getFAQs: async (params = {}) => {
    const response = await API.get("/api/faqs", { params });
    return response.data;
  },
  createFAQ: async (data) => {
    const response = await API.post("/api/faqs", data);
    return response.data;
  },
  updateFAQ: async (id, data) => {
    const response = await API.put(`/api/faqs/${id}`, data);
    return response.data;
  },
  deleteFAQ: async (id) => {
    const response = await API.delete(`/api/faqs/${id}`);
    return response.data;
  },
};

// --- CMS API ---
export const cmsAPI = {
  getPageContents: async (params = {}) => {
    const response = await API.get("/api/cms/pages", { params });
    return response.data;
  },
  getPageBySlug: async (slug) => {
    const response = await API.get(`/api/cms/pages/${slug}`);
    return response.data;
  },
  createPageContent: async (data) => {
    const response = await API.post("/api/cms/pages", data);
    return response.data;
  },
  updatePageContent: async (id, data) => {
    const response = await API.put(`/api/cms/pages/${id}`, data);
    return response.data;
  },
  deletePageContent: async (id) => {
    const response = await API.delete(`/api/cms/pages/${id}`);
    return response.data;
  },
};

// --- MEDIA API ---
export const mediaAPI = {
  getMedia: async (params = {}) => {
    const response = await API.get("/api/media", { params });
    return response.data;
  },
  createMediaRecord: async (data) => {
    const response = await API.post("/api/media", data);
    return response.data;
  },
  deleteMediaRecord: async (id) => {
    const response = await API.delete(`/api/media/${id}`);
    return response.data;
  },
};

export default API;
