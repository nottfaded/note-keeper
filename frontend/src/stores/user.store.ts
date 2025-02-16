import { atom, useSetAtom } from "jotai";
import { STRING_EMPTY } from "../config/constants";

interface User {
    email: string;
    avatar: string;
}

const INIT_DATA = {
    email: 'error@err.err',
    avatar: STRING_EMPTY
};

export const userAtom = atom<User>(INIT_DATA);

export function useUserStore() {
    const setUser = useSetAtom(userAtom);

    const setData = (data: Partial<User>) => {
        setUser((prev) => ({ ...prev, ...data }));
    }

    const resetData = () => {
        setUser(INIT_DATA);
    }

    return { setData, resetData }
}