const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("saveblood_token");
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("saveblood_token", token);
}

export function removeToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("saveblood_token");
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  // Auth
  register: (body) =>
    apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: (body) =>
    apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getMe: () => apiFetch("/api/auth/me"),

  // Users
  updateProfile: (body) =>
    apiFetch("/api/users/profile", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  getUsers: (params = "") =>
    apiFetch(`/api/users?${params}`),

  updateUserRole: (id, role) =>
    apiFetch(`/api/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),

  updateUserStatus: (id, status) =>
    apiFetch(`/api/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  searchDonors: (params) =>
    apiFetch(`/api/users/search?${params}`),

  // Donation Requests
  getPublicRequests: (params = "") =>
    apiFetch(`/api/donation-requests/public?${params}`),

  getRequests: (params = "") =>
    apiFetch(`/api/donation-requests?${params}`),

  getRequest: (id) =>
    apiFetch(`/api/donation-requests/${id}`),

  createRequest: (body) =>
    apiFetch("/api/donation-requests", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateRequest: (id, body) =>
    apiFetch(`/api/donation-requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  updateRequestStatus: (id, status) =>
    apiFetch(`/api/donation-requests/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  donateToRequest: (id, body) =>
    apiFetch(`/api/donation-requests/${id}/donate`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  deleteRequest: (id) =>
    apiFetch(`/api/donation-requests/${id}`, {
      method: "DELETE",
    }),

  // Funding
  getFundings: (params = "") =>
    apiFetch(`/api/funding?${params}`),

  getTotalFunds: () =>
    apiFetch("/api/funding/total"),

  // NEW STRIPE CHECKOUT SESSION
  createCheckoutSession: (body) =>
    apiFetch("/api/funding/create-checkout-session", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  confirmFunding: (body) =>
    apiFetch("/api/funding/confirm", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // Stats
  getAdminStats: () =>
    apiFetch("/api/stats/admin"),

  getVolunteerStats: () =>
    apiFetch("/api/stats/volunteer"),

  getDonorStats: () =>
    apiFetch("/api/stats/donor"),
};