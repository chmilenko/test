import LoginData from "./loginData";

type RegisterData = {
  login: string;
  passwordRepeat: string;
} & LoginData;
export default RegisterData;
