import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/actions/auth.action";

export const useUser = () => {
  const { loading, data, error, refetch } = useQuery(GET_USER);

  return {
    loading,
    user: data?.getLoggedInUser.user,
    profile: data?.getLoggedInUser.user.profile,
    penelitian: data?.getLoggedInUser.user.penelitian,
    pengabdian: data?.getLoggedInUser.user.pengabdian,
    error,
    refetch,
  };
};
