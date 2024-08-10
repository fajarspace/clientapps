"use client";
import { useMutation, useQuery } from "@apollo/client";
import { Card, CardBody } from "@nextui-org/card";
import { Spinner, cn } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { useState, useEffect, ChangeEvent } from "react";
import { GET_USER } from "../../../graphql/actions/auth.action";
import {
  GET_SETTINGS,
  UPDATE_SETTINGS,
} from "../../../graphql/actions/settings.action";
import withDashboardLayout from "../../hoc/withDashboardLayout";
import AccessDenied from "./access-denied";

interface Settings {
  id: string;
  submissionOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  role: string;
}

const SettingsPage: React.FC = () => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<{ getLoggedInUser: { user: User } }>(GET_USER);
  const {
    loading: settingsLoading,
    error: settingsError,
    data: settingsData,
  } = useQuery<{ settings: Settings }>(GET_SETTINGS);
  const [updateSettings, { loading: updating }] = useMutation(UPDATE_SETTINGS);
  const [submissionOpen, setSubmissionOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    if (settingsData && settingsData.settings) {
      setSettings(settingsData.settings);
      setSubmissionOpen(settingsData.settings.submissionOpen);
    }
  }, [settingsData, settings]);

  if (userLoading || settingsLoading)
    return <Spinner size="lg" color="primary" />;
  if (userError) {
    console.error("Error fetching user data:", userError);
    return <div>Error fetching user data</div>;
  }
  if (settingsError) {
    console.error("Error fetching settings:", settingsError);
    return <div>Error fetching settings</div>;
  }

  if (userData?.getLoggedInUser.user.role !== "Prodi") {
    return <AccessDenied />;
  }

  const handleToggle = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    try {
      setSubmissionOpen(checked);
      await updateSettings({
        variables: {
          updateSettingsInput: {
            submissionOpen: checked,
          },
        },
      });
    } catch (e) {
      console.error("Error updating settings:", e);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-2 m-5">Settings</h1>
      <Card className="m-5">
        <CardBody>
          <p className="text-lg font-semibold mb-2">General</p>
          <div className="flex items-center mb-4">
            <Switch
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md hover:bg-content2 items-center",
                  "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  //selected
                  "group-data-[selected=true]:ml-6",
                  // pressed
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4"
                ),
              }}
              isSelected={submissionOpen}
              onChange={handleToggle}
              isDisabled={updating}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Buka akses usulan</p>
                <p className="text-tiny text-default-500">
                  Izinkan dosen untuk membuat usulan penelitian atau pengabdian.
                </p>
              </div>
            </Switch>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default withDashboardLayout(SettingsPage);
