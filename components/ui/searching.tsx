import Image from "next/image";
import React from "react";

const SearchLoading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        src={"/magnify.svg"}
        alt="magnify search loading"
        width={100}
        height={100}
      />
    </div>
  );
};

export default SearchLoading;
