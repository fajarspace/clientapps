import { DocumentNode, gql } from "@apollo/client";

export const GET_SETTINGS: DocumentNode = gql`
  query GetSettings {
    settings {
      id
      submissionOpen
      createdAt
      updatedAt
    }
  }
`;

export const IS_SUBMISSION_OPEN: DocumentNode = gql`
  query IsSubmissionOpen {
    isSubmissionOpen
  }
`;

export const UPDATE_SETTINGS: DocumentNode = gql`
  mutation UpdateSettings($updateSettingsInput: UpdateSettingsInput!) {
    updateSettings(updateSettingsInput: $updateSettingsInput) {
      id
      submissionOpen
      createdAt
      updatedAt
    }
  }
`;
