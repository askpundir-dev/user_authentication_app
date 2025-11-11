export interface User {
  email: string;
  password: string;
  username?: string;
}

// Register new user
export function registerUser(user: User): void {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Login user
export function loginUser(email: string, password: string): boolean {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    return true;
  }
  return false;
}

// Get logged user
export function getLoggedUser(): User | null {
  const data = localStorage.getItem("loggedUser");
  return data ? JSON.parse(data) : null;
}

// Update logged user
export function updateLoggedUser(updatedUser: User): void {
  localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const index = users.findIndex((u) => u.email === getLoggedUser()?.email);

  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Logout
export function logoutUser(): void {
  localStorage.removeItem("loggedUser");
}
