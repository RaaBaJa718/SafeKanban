import { jwtDecode, JwtPayload } from 'jwt-decode';

const token = 'your.jwt.token.here';

// Decode the token
const decoded = jwtDecode<JwtPayload>(token);

// Access payload properties (if they exist)
if (decoded && typeof decoded === 'object') {
  console.log(decoded.sub); // Example: Access the "sub" claim
}

class AuthService {
  getProfile() {
    // TODO: return the decoded token
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
  }
  
 

isTokenExpired(token: string): boolean {
    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return decoded.exp < currentTime; // True if token has expired
    } catch (error) {
        console.error('Invalid token', error);
        return true; // Treat invalid tokens as expired
    }
}

getToken(): string | null {
  return localStorage.getItem('token'); // Return the token or null if it doesn't exist
}

login(idToken: string): void {
  localStorage.setItem('token', idToken); // Store the token in localStorage
  window.location.href = '/home'; // Redirect to the home page
}

logout(): void {
  localStorage.removeItem('token'); // Remove the token
  window.location.href = '/login'; // Redirect to the login page
}
}

export default new AuthService();
