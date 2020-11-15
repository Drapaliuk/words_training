export const localStorageManipulator = {
    saveAuthToken: token => localStorage.setItem('auth_token', token),
    saveRefreshToken: refreshToken => localStorage.setItem('refresh_token', refreshToken),
    deleteAuthToken: () => localStorage.removeItem('auth_token'),
    deleteRefreshToken: () => localStorage.removeItem('refresh_token'),
    getAuthToken: () => localStorage.getItem('auth_token'),
    getRefreshToken: () => localStorage.getItem('refresh_token')
}