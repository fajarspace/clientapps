import UpdateProfile from "../../../components/Dashboard/Profile/update/update-profile";
import withDashboardLayout from "../../../components/hoc/withDashboardLayout";

const EditProfilePage = () => {
  return <UpdateProfile />;
};

export default withDashboardLayout(EditProfilePage);
