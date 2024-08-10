import AccountUser from "../../../components/Dashboard/Account";
import withDashboardLayout from "../../../components/hoc/withDashboardLayout";

const AccountPage = () => {
  return <AccountUser />;
};

export default withDashboardLayout(AccountPage);
