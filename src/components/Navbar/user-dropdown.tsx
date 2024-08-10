import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  // User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Make sure to import Cookies
import { useUser } from "../hooks/useUser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const [signedIn, setsignedIn] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      setsignedIn(!!user);
    }
  }, [loading, user]);

  const logoutHandler = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    toast.success("Log out successful!");
    window.location.reload();
  };

  return (
    <>
      {signedIn && (
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              {/* <User
                as="button"
                name={user.name}
                description={user.role}
                avatarProps={{
                  src: `${user?.Avatar?.url}`,
                }}
              /> */}
              <Avatar
                as="button"
                className="transition-transform"
                src={user ? user.image : user.image}
              />
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <DropdownItem
              key="profile"
              className="flex flex-col justify-start w-full items-start"
            >
              <p>{user.username}</p>
              <p>{user.email}</p>
            </DropdownItem>
            {user && user.role === "Prodi" && (
              <DropdownItem key="settings">
                <Link to={"/dashboard/settings"}>Settings</Link>
              </DropdownItem>
            )}
            <DropdownItem key="account">
              <Link to={`/dashboard/account/${user.id}`}>Account</Link>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              className="text-danger"
              onClick={logoutHandler}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

export default UserDropdown;
