import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebaseConfig";
import { logout, setUser } from "../redux/authSlice";

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) {
                const token = await user.getIdToken();
                const userData = { email: user.email!, token }
                dispatch(setUser(userData));
            } else {
                dispatch(logout())
            }
        });

        return () => unsubscribe();
    }, [dispatch])
}

export default useAuthListener;