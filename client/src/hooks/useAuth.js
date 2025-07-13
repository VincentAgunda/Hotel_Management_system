import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook for authentication
 * @returns {object} Authentication context
 */
export default function useAuth() {
  return useContext(AuthContext);
}