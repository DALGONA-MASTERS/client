interface UserCred {
  name?: string;
  email: string;
  password: string;
}
interface User {
<<<<<<< Updated upstream
    id: string,
    username: string,
    email: string,
    name?: string
=======
  token: string;
  _id: string;
  username: string;
  email: string;
  name?: string;
  profilePic: string;
>>>>>>> Stashed changes
}

interface UserFormProps {
  loginPage: boolean;
  toggleForm: () => void;
}
interface UserFormState {
  email: string;
  password: string;
  username: string;
}

export type { UserCred, User, UserFormState, UserFormProps };
