import LoginData from "./types/loginData";
import RegisterData from "./types/registerData";
import User from "./types/User";

export async function user(): Promise<
  { isLoggedIn: true; user: User } | { isLoggedIn: false }
> {
  return (await fetch("/api/auth/user")).json();
}

export async function login(data: LoginData): Promise<User> {
  const res = await fetch("/api/auth/authenication", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }
  return res.json();
}

export async function register(data: RegisterData): Promise<User> {
  const res = await fetch("/api/auth/registration", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
}
