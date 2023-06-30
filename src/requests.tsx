import {
  useQuery,
  useMutation,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";

const apiUrl = "https://reqres.in/api";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  data: User[];
}

export const useUserList = (
  page = 1,
  per_page = 6
): UseQueryResult<UserListResponse, AxiosError> =>
  useQuery<
    UserListResponse,
    AxiosError,
    UserListResponse,
    [string, { page: number; per_page: number }]
  >(["users", { page, per_page }], (parameters) => {
    const { page: pageParam, per_page: perPageParam } = parameters.queryKey[1];
    const params = new URLSearchParams({
      page: pageParam.toString(),
      per_page: perPageParam.toString(),
    });
    return axios
      .get(`${apiUrl}/users`, { params })
      .then((response) => response.data);
  });

interface AddUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

interface AddUserVariables {
  name: string;
  job: string;
}

export const useAddUser = (): UseMutationResult<
  AddUserResponse,
  AxiosError,
  AddUserVariables
> =>
  useMutation<AddUserResponse, AxiosError, AddUserVariables>(
    ({ name, job }) => {
      return axios
        .post(`${apiUrl}/users`, { name, job })
        .then((response) => response.data);
    },
    {}
  );
