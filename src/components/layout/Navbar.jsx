import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../../features/products/components/SearchBar";
import Container from "../ui/Container";
import NavIcons from "./NavIcons";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white shadow-md navbar py-2 min-h-[85px]">

      <Container className="px-[5px] sm:px-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center justify-between w-full sm:w-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              className="text-2xl font-semibold border-none text-pink hover:bg-transparent"
              to="/"
            >
              Lumea
            </NavLink>
          </div>
          {/* Icons on small screens only */}
          <div className="flex-none sm:hidden">
            <NavIcons />
          </div>
        </div>
        {/* Search Bar */}
        <div className="w-full sm:w-[50%] self-center sm:flex sm:items-center sm:ml-auto sm:mr-4">
          <SearchBar />
        </div>
        {/* Icons on large screens only */}
        <div className="hidden sm:flex sm:flex-none">
          <NavIcons />
        </div>
        
      </Container>
    </nav>
  );
}
