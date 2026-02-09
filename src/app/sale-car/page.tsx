"use client";

import React, { Suspense, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import SaleCarClient from './SaleCarClient'

const SaleCarPage = () => {
    const router = useRouter();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Suspense fallback={<div className="w-full mt-16 flex items-center justify-center min-h-screen">Loading...</div>}>
            <SaleCarClient />
        </Suspense>
    )
}

export default SaleCarPage