import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[112px] flex h-[calc(100vh-224px)] items-center justify-center">
      {children}
    </div>
  );
}
