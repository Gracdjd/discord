"use client";
import { useEffect, useState } from "react";

const ServerPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (isMounted == false) {
    return null;
  }
  return <div>Server Id Page</div>;
};

export default ServerPage;
