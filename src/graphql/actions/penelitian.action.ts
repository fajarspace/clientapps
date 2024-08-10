"use client";

import { gql, DocumentNode } from "@apollo/client";

export const GET_ALL_PENELITIAN: DocumentNode = gql`
  query {
    getAllPenelitian {
      id
      judul_penelitian
      bidang
      tahun_akademik
      semester
      ketua
      nidn
      jafung
      prodi
      email
      fakultas
      wa
      status
      anggota {
        anggota_1
        nidn_anggota_1
        jafung_anggota_1
        prodi_anggota_1
        anggota_2
        nidn_anggota_2
        jafung_anggota_2
        prodi_anggota_2
        anggota_3
        nidn_anggota_3
        jafung_anggota_3
        prodi_anggota_3
        anggota_4
        nidn_anggota_4
        jafung_anggota_4
        prodi_anggota_4
      }
      createdAt
      userId
    }
  }
`;

export const CREATE_PENELITIAN: DocumentNode = gql`
  mutation CreatePenelitian($createPenelitianInput: CreatePenelitian!) {
    createPenelitian(createPenelitianInput: $createPenelitianInput) {
      id
      judul_penelitian
      tahun_akademik
      semester
      bidang
      ketua
      nidn
      jafung
      prodi
      email
      wa
      anggota {
        anggota_1
        nidn_anggota_1
        jafung_anggota_1
        prodi_anggota_1
        anggota_2
        nidn_anggota_2
        jafung_anggota_2
        prodi_anggota_2
        anggota_3
        nidn_anggota_3
        jafung_anggota_3
        prodi_anggota_3
        anggota_4
        nidn_anggota_4
        jafung_anggota_4
        prodi_anggota_4
      }
      userId
    }
  }
`;

export const GET_PENELITIAN_BY_ID: DocumentNode = gql`
  query GetPenelitianById($id: String!) {
    getPenelitianById(id: $id) {
      id
      judul_penelitian
      bidang
      tahun_akademik
      semester
      ketua
      nidn
      jafung
      prodi
      email
      fakultas
      wa
      status
      anggota {
        anggota_1
        nidn_anggota_1
        jafung_anggota_1
        prodi_anggota_1
        anggota_2
        nidn_anggota_2
        jafung_anggota_2
        prodi_anggota_2
        anggota_3
        nidn_anggota_3
        jafung_anggota_3
        prodi_anggota_3
        anggota_4
        nidn_anggota_4
        jafung_anggota_4
        prodi_anggota_4
      }
      createdAt
      updatedAt
    }
  }
`;

export const APPROVE_PENELITIAN = gql`
  mutation ApprovePenelitian($id: String!) {
    updatePenelitianStatus(
      id: $id
      updatePenelitianStatusInput: { status: Approved }
    ) {
      id
      status
    }
  }
`;

export const REJECT_PENELITIAN = gql`
  mutation RejectPenelitianStatus($id: String!) {
    updatePenelitianStatus(
      id: $id
      updatePenelitianStatusInput: { status: Rejected }
    ) {
      id
      status
    }
  }
`;

export const DELETE_PENELITIAN: DocumentNode = gql`
  mutation deletePenelitian($id: String!) {
    deletePenelitian(id: $id) {
      id
      judul_penelitian
    }
  }
`;
