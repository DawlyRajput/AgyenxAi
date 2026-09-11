import api from '../../utils/axios';
const getCurrentUser = async () => {
  try {
    const {data} = await api.get('/api/me');
    
    return data;
  }
    catch (error) {
        console.error(error);   
        return null;
    }}

export { getCurrentUser };