// Ustaw adres API (np. http://localhost:4000) jeśli frontend działa lokalnie.
// Jeśli serwer hostujesz razem z frontend na tym samym origin, można zostawić ''
const API_URL = ''; // <-- ustaw, np. 'http://localhost:4000'

async function request(path, opts = {}) {
  const url = (API_URL || '') + path;
  const headers = opts.headers || {};
  headers['Content-Type'] = 'application/json';
  if (!opts.skipAuth) {
    const token = localStorage.getItem('jwt');
    if (token) headers['Authorization'] = 'Bearer ' + token;
  }
  const res = await fetch(url, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok && data && data.error) return { error: data.error };
  return data;
}

async function register(payload) {
  const res = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true
  });
  if (res.token) localStorage.setItem('jwt', res.token);
  return res;
}

async function login(payload) {
  const res = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true
  });
  if (res.token) localStorage.setItem('jwt', res.token);
  return res;
}

async function getProfile() {
  return request('/api/profile');
}

function logout() {
  localStorage.removeItem('jwt');
}