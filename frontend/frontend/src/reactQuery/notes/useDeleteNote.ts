
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../axiosInstance/axiosInstance";




export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => API.delete(`/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'] as any);
    },
  });
};
