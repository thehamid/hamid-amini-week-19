import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id, // Only run the query if id is truthy
  });
};