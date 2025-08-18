import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function ScrollToTop() {

    const { pathname } = useLocation();
    const userState = useSelector(state => state.user.value);
    
    useEffect(_ => {
        window.scrollTo({behavior: "instant", left: 0, top: 0});
    }, [pathname, userState.hasStarted])
    
    return null;
}