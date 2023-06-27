import User from "./User";

type State = {
  authChecked: boolean;
  user?: User;
  loginFormError?: string;
  registerFormError?: string;
};

export default State;
