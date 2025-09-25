import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function pageInicio() {
  return (
    <div>
      page
      <Link
        href="/login"
        className="cursor-pointer"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        <Button
          size="sm"
          className="cursor-pointer  bg-[#337ab7] hover:bg-[#285e8e]"
        >
          Login
        </Button>
      </Link>
    </div>
  );
}
