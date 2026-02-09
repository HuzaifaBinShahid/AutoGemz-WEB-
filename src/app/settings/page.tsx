"use client";

import React from "react";
import Settings from "@/features/settings";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  );
}

