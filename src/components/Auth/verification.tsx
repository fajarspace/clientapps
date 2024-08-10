"use client";
import { useMutation } from "@apollo/client";
import { useRef, useState, useEffect } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Image } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { ACTIVATE_USER } from "../../graphql/actions/auth.action";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react"; // Assuming you are using a spinner component from @nextui-org

const Verification = () => {
  const [ActivateUser, { loading }] = useMutation(ACTIVATE_USER);
  const [invalidError, setInvalidError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<any>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("activationToken");
    if (token) {
      localStorage.setItem("activation_token", token);
    }
  }, [location.search]);

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    const activationToken = localStorage.getItem("activation_token");

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    } else {
      const data = {
        activationToken,
        activationCode: verificationNumber,
      };
      try {
        await ActivateUser({
          variables: data,
        });
        localStorage.removeItem("activation_token");
        toast.success("Account activated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ToastContainer />

      <div className="fixed left-0 right-0 bottom-0 top-0 z-0">
        <Image
          className="w-full h-full"
          src="https://nextui.org/gradients/docs-right.png"
          alt="gradient"
        />
      </div>
      <div className="text-center text-2xl font-bold mb-6 z-10">
        Verify Your Account
      </div>
      <div className="py-10 flex items-center justify-center mt-2 z-10">
        <div className="w-20 h-20 rounded-full bg-blue-800 flex items-center justify-center">
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>
      <div className="z-10 flex items-center justify-center mt-5 space-x-4">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            key={key}
            ref={inputRefs[index]}
            className={`w-16 h-16 bg-transparent border-2 rounded-lg text-center text-lg font-semibold text-black dark:text-white ${
              invalidError ? "border-red-500" : "border-black dark:border-white"
            }`}
            maxLength={1}
            value={verifyNumber[key as keyof typeof verifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && index > 0 && !verifyNumber[index]) {
                inputRefs[index - 1].current?.focus();
              }
            }}
          />
        ))}
      </div>
      {invalidError && (
        <span className="text-red-500 mt-2 text-center block z-10">
          Invalid code!
        </span>
      )}
      <Button
        onClick={verificationHandler}
        disabled={loading}
        className="bg-blue-800 text-white mt-6 z-10"
      >
        {loading ? <Spinner size="sm" color="white" /> : "Verify OTP"}
      </Button>
      <div className="z-10 font-medium text-gray-500 mt-4 text-sm">
        Bukan email saya?{" "}
        <Link to={"/login"} className="font-bold text-blue-800">
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default Verification;
