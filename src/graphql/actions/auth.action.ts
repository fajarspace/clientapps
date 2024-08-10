"use client";
import { gql, DocumentNode } from "@apollo/client";

export const ACTIVATE_USER: DocumentNode = gql`
  mutation ActivateUser($activationToken: String!, $activationCode: String!) {
    activateUser(
      activationDto: {
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
      user {
        username
        email
        phone_number
        createdAt
      }
    }
  }
`;

export const FORGOT_PASSWORD: DocumentNode = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(forgotPasswordDto: { email: $email }) {
      message
    }
  }
`;

export const GET_ALL_USERS: DocumentNode = gql`
  query {
    getUsers {
      id
      username
      email
      role
      phone_number
      profile {
        nidn
        prodi
        jafung
      }
      createdAt
    }
  }
`;

export const GET_USER: DocumentNode = gql`
  query {
    getLoggedInUser {
      user {
        id
        username
        email
        phone_number
        role
        profile {
          id
          nidn
          nama
          jafung
          prodi
          userId
        }
        penelitian {
          id
          ketua
          nidn
          jafung
          prodi
          email
          tahun_akademik
          judul_penelitian
          bidang
          status
          createdAt
          userId
        }
        pengabdian {
          id
          ketua
          nidn
          jafung
          prodi
          email
          tahun_akademik
          judul_pengabdian
          bidang
          status
          createdAt
          userId
        }
      }
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN_USER: DocumentNode = gql`
  mutation LoginUser($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      user {
        id
        username
        email
        password
        phone_number
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;

export const REGISTER_USER: DocumentNode = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $phone_number: Float!
  ) {
    register(
      registerDto: {
        username: $username
        email: $email
        password: $password
        phone_number: $phone_number
      }
    ) {
      activation_token
    }
  }
`;

export const UPDATE_USER: DocumentNode = gql`
  mutation UpdateUser($id: String!, $updateUserInput: UpdateUserDto!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      id
      username
      role
      phone_number
    }
  }
`;

export const UPDATE_PASSWORD: DocumentNode = gql`
  mutation UpdatePassword(
    $id: String!
    $updatePasswordInput: UpdatePasswordDto!
  ) {
    updatePassword(id: $id, updatePasswordInput: $updatePasswordInput) {
      id
    }
  }
`;

export const RESET_PASSWORD: DocumentNode = gql`
  mutation resetPassword($password: String!, $activationToken: String!) {
    resetPassword(
      resetPasswordDto: {
        password: $password
        activationToken: $activationToken
      }
    ) {
      user {
        id
        username
        email
        role
        password
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      username
      email
      role
    }
  }
`;
