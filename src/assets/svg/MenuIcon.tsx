"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const MenuIcon = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const strokeColor = mounted && theme === "dark" ? "white" : "black";

    return (
        <div>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke={strokeColor} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default MenuIcon
