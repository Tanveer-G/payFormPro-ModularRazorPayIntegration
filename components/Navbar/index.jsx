import Link from "next/link";
import { useRouter } from "next/router";

const navbar = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Dev-Tools",
    link: "/test",
  },
  {
    name: "APIs",
    link: "https://github.com/Tanveer-G/payFormPro-ModularRazorPayIntegration/blob/main/documentation/payForm%20Pro%20APIs%20DOC.pdf",
  },
  {
    name: "Hooks",
    link: "https://github.com/Tanveer-G/payFormPro-ModularRazorPayIntegration/blob/main/documentation/payForm%20Pro%20Flow%20%26%20hooks%20DOC.pdf"
  },
];

export default function Navbar() {
  const { pathname } = useRouter();

  return (
    <nav className="flex justify-end w-full gap-x-4 bg-[#374151] p-3">
      {navbar.map(({ name, link }) => (
        <Link key={name} href={link} className={`gap-y-2 hover:underline active:blue-600 ${pathname == link ? "font-bold text-[#3b82f6]":""}`}>
          {name}
        </Link>
      ))}
    </nav>
  );
}
