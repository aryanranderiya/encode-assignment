import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { ThemeSwitch } from "./theme-switch.jsx";
import { AddCircleIcon } from "./icons"
import { useNavigate } from "react-router-dom";
import { Chip } from "@nextui-org/react";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NextUINavbar maxWidth="full" className="fixed" isBlurred={false}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit ">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit text-sm">Appointment Management System</p>
          </Link>

          <Link
            isExternal
            href="https://aryanranderiya.com"
          >
            <Chip color="primary" variant="dot" className="font-bold text-foreground-600" size="sm">
              by Aryan Randeriya</Chip>
          </Link>
        </NavbarBrand>


      </NavbarContent>

      <NavbarContent
        justify="end"
      >
        <Button color="primary" variant="shadow" className="font-bold" size="sm" startContent={<AddCircleIcon color="foreground" />} onPress={() => navigate("/add")}>Add appointment</Button>
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>


    </NextUINavbar >
  );
};
