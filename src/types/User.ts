interface UserCred {
    name?: string,
    email: string,
    password: string
}
interface User {
    token: string,
    _id: string,
    username: string,
    email: string,
    name?: string,
    profilePic: string
}

interface UserFormProps {
    loginPage: boolean;
    toggleForm: () => void;
}
interface UserFormState {
    email: string;
    password: string;
    name?: string;
}

export type { UserCred, User, UserFormState, UserFormProps }