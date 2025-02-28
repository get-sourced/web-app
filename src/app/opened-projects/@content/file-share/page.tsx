'use client'
import SocketWrapper from "@/features/file-share/components/SocketWrapper";
import { StateProvider } from "@/features/file-share/context/useStateContext";
import React from "react";
function ShareAFile() {
  return (
    <StateProvider>
      <SocketWrapper />
    </StateProvider>
  );
}

export default ShareAFile;
