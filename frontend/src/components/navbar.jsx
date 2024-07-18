import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { ThemeSwitch } from "./theme-switch.jsx";
import { AddCircleIcon } from "./icons";
import { useNavigate } from "react-router-dom";
import { Chip } from "@nextui-org/react";
import Sidebar from "../layouts/Sidebar.jsx";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/navbar";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NextUINavbar maxWidth="full" isBlurred={false} position="fixed" className="z-1 dark:bg-white dark:bg-opacity-10 bg-black bg-opacity-10">
      <NavbarContent justify="start">
        <NavbarBrand className="gap-3 max-w-fit h-full flex items-center ">
          <Link
            className="flex justify-start items-center gap-1 hover:underline"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit text-sm">
              Appointment System
            </p>
          </Link>

          <Link isExternal href="https://aryanranderiya.com" className="sm:flex hidden">
            <Chip
              color="primary"
              variant="dot"
              className="font-bold text-foreground-600"
              size="sm"
            >
              by Aryan Randeriya
            </Chip>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        <Button
          color="primary"
          variant="shadow"
          className="font-bold"
          size="sm"
          startContent={<AddCircleIcon color="foreground" />}
          onPress={() => navigate("/add")}
        >
          Add appointment
        </Button>
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="p-0">
        <Sidebar />
      </NavbarMenu>
    </NextUINavbar>
  );
};
