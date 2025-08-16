import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function ScrollToTop() {

    const { pathname } = useLocation();
    const userState = useSelector(state => state.user.value);
    
    useEffect(_ => {
        window.scrollTo(0, 0);
    }, [pathname, userState])
    
    return null;
}