"use client";

import { gql, DocumentNode } from "@apollo/client";

export const GET_ALL_PENGABDIAN: DocumentNode = gql`
  query {
    getAllPengabdian {
      id
      judul_pengabdian
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

export const CREATE_PENGABDIAN: DocumentNode = gql`
  mutation CreatePengabdian($createPengabdianInput: CreatePengabdian!) {
    createPengabdian(createPengabdianInput: $createPengabdianInput) {
      id
      judul_pengabdian
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

export const GET_PENGABDIAN_BY_ID: DocumentNode = gql`
  query GetPengabdianById($id: String!) {
    getPengabdianById(id: $id) {
      id
      judul_pengabdian
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

export const APPROVE_PENGABDIAN = gql`
  mutation ApprovePengabdian($id: String!) {
    updatePengabdianStatus(
      id: $id
      updatePengabdianStatusInput: { status: Approved }
    ) {
      id
      status
    }
  }
`;

export const REJECT_PENGABDIAN = gql`
  mutation RejectPengabdianStatus($id: String!) {
    updatePengabdianStatus(
      id: $id
      updatePengabdianStatusInput: { status: Rejected }
    ) {
      id
      status
    }
  }
`;

export const DELETE_PENGABDIAN: DocumentNode = gql`
  mutation deletePengabdian($id: String!) {
    deletePengabdian(id: $id) {
      id
      judul_pengabdian
    }
  }
`;
