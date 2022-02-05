interface Admin {
  id: string;
  role: string;
}

interface User {
  id: string;
  email: string;
}

function redirect(user: Admin | User) {
  if ("role" in user) {
    console.log(user.role); // Admin
    return;
  }
  console.log(user.email); // User
  return;
}

function redirect2(user: Admin | User) {
  if (isAdmin(user)) {
    console.log(user.role);
    return;
  }
  console.log(user.email);
  return;
}

function isAdmin(user: Admin | User): user is Admin {
  return (user as Admin).role !== undefined;
}
