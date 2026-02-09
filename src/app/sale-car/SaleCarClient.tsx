"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SaleYourCar from '@/features/sale-your-car'
import { useSearchParams } from 'next/navigation'
import { fetchVehicleById } from '@/store/thunks/vehicleSaleThunks';
import type { AppDispatch, RootState } from '@/store';

export default function SaleCarClient() {
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams()
    const { editingVehicle } = useSelector((state: RootState) => state.vehicleSale);
    
    // Get variant from query params, default to "instant"
    // Usage: /sale-car?variant=3step or /sale-car?variant=instant
    const variantParam = searchParams.get('variant')
    const editId = searchParams.get('edit')
    
    // Fetch vehicle data if in edit mode
    useEffect(() => {
        if (editId) {
            dispatch(fetchVehicleById(editId));
        }
    }, [editId, dispatch]);
    
    // Determine variant - if editing, use vehicle type from API, otherwise use query param
    let variant: "instant" | "3step" = (variantParam === "3step" ? "3step" : "instant");
    
    // If editing and vehicle is loaded, use the type from vehicle data
    if (editId && editingVehicle) {
        variant = editingVehicle.type === "3step" ? "3step" : "instant";
    }
    
    return (
        <SaleYourCar variant={variant} editVehicleId={editId || undefined} />
    )
}



