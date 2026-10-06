import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function handleRegisterUser(event) {
    event.preventDefault();
    try {
      const data = await registerService(signUpFormData);
      
      if (data.success) {
        toast({ title: "Success", description: data.message || "User registered successfully!" });
        // Auto-login the user after successful signup
        const loginData = await loginService({
          userEmail: signUpFormData.userEmail,
          password: signUpFormData.password
        });
        
        if (loginData.success) {
          sessionStorage.setItem(
            "accessToken",
            JSON.stringify(loginData.data.accessToken)
          );
          setAuth({
            authenticate: true,
            user: loginData.data.user,
          });
        }
      } else {
        toast({ title: "Error", description: data.message || "Registration failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: error?.response?.data?.message || "Registration failed", variant: "destructive" });
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const data = await loginService(signInFormData);
      console.log(data, "datadatadatadatadata");

      if (data.success) {
        toast({ title: "Success", description: data.message || "Logged in successfully" });
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        toast({ title: "Error", description: data.message || "Login failed", variant: "destructive" });
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      toast({ title: "Error", description: error?.response?.data?.message || "Login failed", variant: "destructive" });
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  //check auth user

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  console.log(auth, "gf");

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
