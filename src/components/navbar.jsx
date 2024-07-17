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
export const Navbar = () => {

  const navigate = useNavigate();

  return (
    <NextUINavbar maxWidth="full" className="fixed" isBlurred={false}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit">Appointment Management System</p>
          </Link>
        </NavbarBrand>

        <Button color="primary" variant="shadow" className="font-bold" size="sm" startContent={<AddCircleIcon color="foreground" />} onPress={() => navigate("/add")}>Add appointment</Button>
      </NavbarContent>

      <NavbarContent
        justify="end"
      >
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>


    </NextUINavbar >
  );
};
