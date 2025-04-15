import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Decode the JWT token and return the payload
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode<JwtPayload>(token); // Decode and return the JWT payload
  }

  // Check if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token); // Token exists and is valid
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<JwtPayload>(token); // Extract expiration timestamp from JWT payload
      if (!exp) {
        return true; // No expiration field means token is invalid
      }
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return exp < currentTime; // Return true if the token is expired
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Invalid token case
    }
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('id_token'); // Token is stored as `id_token`
  }

  // Save the token and redirect to the home page
  login(idToken: string): void {
    localStorage.setItem('id_token', idToken); // Save token to localStorage
    window.location.assign('/'); // Redirect to the home page
  }

  // Remove the token and redirect to the login page
  logout(): void {
    localStorage.removeItem('id_token'); // Remove token from localStorage
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();