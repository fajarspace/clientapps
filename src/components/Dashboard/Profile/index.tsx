"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../hooks/useUser";

const ProfilePage: React.FC = () => {
  const { loading, user, profile, error, refetch } = useUser();

  if (loading) return <Spinner size="lg" color="primary" />;
  if (error) {
    console.error("Error fetching user data:", error);
    return <div>Error fetching data</div>;
  }

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="w-full flex justify-center py-10">
      <Card className="w-full shadow-md rounded-lg">
        <CardBody>
          <div className="flex items-center bg-blue-800 dark:bg-default-100 justify-between p-6">
            <div>
              <h2 className="py-3 text-2xl font-bold text-white">
                {profile?.nama}
              </h2>
              <p className="text-sm text-white">
                Program Studi {profile?.prodi}
              </p>
            </div>
            <div>
              <Avatar
                as="button"
                className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 transition-transform"
                src={user ? user.image : user.image}
              />
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-default-800">NIDN/NIDK</span>
              <span className="text-default-600">{profile?.nidn}</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-default-800">Email</span>
              <span className="text-default-600">{user?.email}</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-default-800">
                Phone Number
              </span>
              <span className="text-default-600">{user?.phone_number}</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-default-800">
                Jabatan Fungsional
              </span>
              <span className="text-default-600">{profile?.jafung}</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-default-800">Prodi</span>
              <span className="text-default-600">{profile?.prodi}</span>
            </div>
          </div>
          <div className="flex justify-end p-6 space-x-2">
            <Button
              size="sm"
              color="warning"
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Spinner size="sm" color="white" />
              ) : (
                <FontAwesomeIcon icon={faSyncAlt} />
              )}
              {!loading && "Sync"}
            </Button>
            <Link href={`/dashboard/profile/${profile.id}`} passHref>
              <Button as="a" size="sm" color="primary">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePage;
