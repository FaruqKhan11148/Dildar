export const isAdmin = () => !!localStorage.getItem('adminToken');
export const isUser = () => !!localStorage.getItem('userToken');