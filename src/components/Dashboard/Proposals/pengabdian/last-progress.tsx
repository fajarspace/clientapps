"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardBody } from "@nextui-org/card";
import { Spinner } from "@nextui-org/react";
import { Steps } from "antd";
import Link from "next/link";
import { format } from "date-fns";
import { GET_USER } from "../../../../graphql/actions/auth.action";
import { StatusUsulan } from "../Status";

const { Step } = Steps;

interface Pengabdian {
  id: string;
  nama: string;
  email: string;
  bidang: string;
  tahun_akademik: string;
  judul_pengabdian: string;
  status: string;
  createdAt: string;
}

interface User {
  pengabdian: Pengabdian[];
}

interface GetUserQuery {
  getLoggedInUser: {
    user: User;
  };
}

// const getYearsRange = () => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = currentYear - 5; i <= currentYear + 1; i++) {
//     years.push(i.toString());
//   }
//   return years;
// };

const LastProgressPengabdian = () => {
  const { loading, error, data } = useQuery<GetUserQuery>(GET_USER);
  const [selectedYear] = useState<string>("");

  // const years = useMemo(getYearsRange, []);

  if (loading) return <Spinner size="lg" color="primary" />;
  if (error) {
    console.error("Error fetching user data:", error);
    return <div>Error fetching data</div>;
  }

  const { user } = data?.getLoggedInUser || { user: { pengabdian: [] } };

  const filteredPengabdian = selectedYear
    ? user.pengabdian.filter((p) => p.tahun_akademik === selectedYear)
    : user.pengabdian;

  const latestPengabdian =
    filteredPengabdian.length > 0
      ? filteredPengabdian.reduce((latest, current) => {
          return new Date(latest.createdAt) > new Date(current.createdAt)
            ? latest
            : current;
        }, filteredPengabdian[0])
      : null;

  const getStatusStep = (status: string) => {
    switch (status) {
      case StatusUsulan.SUBMIT:
        return 0;
      case StatusUsulan.Submitted:
        return 1;
      case StatusUsulan.Approved:
      case StatusUsulan.Rejected:
        return 2;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {latestPengabdian ? (
        <>
          <Card>
            <CardBody>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between">
                  <span>{latestPengabdian.judul_pengabdian}</span>
                </div>
              </div>
              <div className="mt-6">
                <Steps
                  className="dark:text-white"
                  current={getStatusStep(latestPengabdian.status)}
                >
                  <Step
                    title="Submited"
                    className="custom-steps"
                    description={
                      <div>
                        <div>Pengabdian telah diajukan</div>
                        <p className="text-tiny">
                          {format(
                            new Date(latestPengabdian.createdAt),
                            "dd MMMM yyyy"
                          )}
                        </p>
                      </div>
                    }
                  />
                  <Step
                    title="Tinjau"
                    description="Pengabdian sedang dalam peninjauan"
                  />
                  <Step
                    title="Hasil"
                    description={
                      latestPengabdian.status === StatusUsulan.Approved ||
                      latestPengabdian.status === StatusUsulan.Rejected ? (
                        <Link
                          href={`/dashboard/pengabdian/detail/${latestPengabdian.id}`}
                        >
                          Pengabdian {latestPengabdian.status.toLowerCase()}
                        </Link>
                      ) : null
                    }
                  />
                </Steps>
              </div>
            </CardBody>
          </Card>
        </>
      ) : (
        <div className="text-center">Data tidak tersedia</div>
      )}
    </div>
  );
};

export default LastProgressPengabdian;
