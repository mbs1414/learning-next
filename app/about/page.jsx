"use client";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <div>About</div>
      <button
        style={{
          all: "unset",
          backgroundColor: "red",
          color: "white",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
        onClick={() => {
          router.back();
        }}
      >
        back{" "}
      </button>
    </div>
  );
};

export default Page;
