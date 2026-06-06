const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function getToken() {
  return localStorage.getItem("royalStudioToken");
}

export function setSession(payload) {
  localStorage.setItem("royalStudioToken", payload.token);
  localStorage.setItem("royalStudioUser", JSON.stringify(payload.user));
}

export function clearSession() {
  localStorage.removeItem("royalStudioToken");
  localStorage.removeItem("royalStudioUser");
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("royalStudioUser")) || null;
  } catch {
    return null;
  }
}

export async function api(path, options = {}) {
  const headers = { ...options.headers };
  const token = getToken();

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const getBookings = () => api("/bookings");
export const createBooking = (booking) =>
  api("/bookings", { method: "POST", body: JSON.stringify(booking) });
export const updateBooking = (id, update) =>
  api(`/bookings/${id}`, { method: "PATCH", body: JSON.stringify(update) });
export const deleteBooking = (id) =>
  api(`/bookings/${id}`, { method: "DELETE" });

