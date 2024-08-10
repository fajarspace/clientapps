import { DocumentNode, gql } from "@apollo/client";

export const GET_PROFILE: DocumentNode = gql`
  query GetProfile($id: String!) {
    getProfileById(id: $id) {
      id
      nidn
      jafung
      prodi
      userId
    }
  }
`;

export const GET_PROFILE_BY_ID: DocumentNode = gql`
  query GetProfileById($id: String!) {
    getProfileById(id: $id) {
      id
      nidn
      jafung
      prodi
      userId
    }
  }
`;

export const UPDATE_PROFILE: DocumentNode = gql`
  mutation UpdateProfile($id: String!, $updateProfileInput: UpdateProfileDto!) {
    updateProfile(id: $id, updateProfileInput: $updateProfileInput) {
      id
      nidn
      jafung
      prodi
    }
  }
`;
