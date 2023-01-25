// components/layout.js

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { cn } from "utils/utils";

const nav = {
  header: {
    navlinks: [
      {
        name: "Products",
        links: [
          {
            name: "Ledger Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "Ledger Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "Ledger Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "Compare our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "App and services",
        links: [
          {
            name: "App and services Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "App and services Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "App and services Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "App and services our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "Learn",
        links: [
          {
            name: "Learn Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "Learn Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "Learn Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "Learn our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "For Business",
        links: [
          {
            name: "Business Stax",
            href: "pages/ledger-stax",
          },
          {
            name: "Business Nano X",
            href: "pages/ledger-nano-x",
          },
          {
            name: "Business Nano S Plus",
            href: "pages/ledger-nano-s-plus",
          },
          {
            name: "Business our devices",
            href: "pages/compare-hardware-wallet",
          },
        ],
      },
      {
        name: "For devlopers",
        href: "developpers.ledger.com",
      },
      {
        name: "Support",
        href: "support.ledger.com",
      },
    ],
  },
};

const LedgerLogo = () => {
  return (
    <a
      href="https://www.ledger.com"
      title="Ledger"
      className="w-[80px] md:w-[120px]"
    >
      <img
        className="w-auto"
        src="//cdn.shopify.com/s/files/1/2974/4858/t/278/assets/ledger-logo-long.svg?v=117129835753677951051671453135"
        alt="Ledger"
      ></img>
    </a>
  );
};

const MenuPopOver = ({
  name,
  links,
  black,
}: {
  name: string;
  links: {
    name: string;
    href: string;
  }[];
  href?: undefined;
  black: boolean;
}) => {
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative">
      <Popover.Button
        ref={setReferenceElement}
        className="flex h-fit flex-row items-center"
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <span>{name}</span>
        <ChevronDownIcon className="h-5 w-5 open:rotate-180 open:transform" />
      </Popover.Button>
      <Transition
        show={isShowing}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <Popover.Panel
          ref={setPopperElement}
          className="absolute left-full z-10 w-fit -translate-x-1/2 translate-y-0 transform whitespace-nowrap bg-white px-4 text-black opacity-100 sm:px-0"
        >
          <div className="overflow-hidden rounded-sm shadow-lg ring-1 ring-black/5  mt-2 py-2  before:content-[''] before:border-l-[1px] before:border-t-[1px] before:bg-white before:-mt-[14px] before:h-2 before:ml-6 before:rotate-45 before:w-2 before:absolute">
            {links.map((link, index) => {
              return (
                <li key={index} className="py-3 px-8">
                  <a href="#" className="" aria-current="page">
                    {link.name}
                  </a>
                </li>
              );
            })}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

interface NavProps {
  black: boolean;
}

const Navbar = ({ black }: NavProps) => {
  return (
    <nav
      className={cn(
        "max-h-[80px] w-full bg-transparent",
        black ? "bg-black" : ""
      )}
    >
      <div className="flex flex-wrap items-center justify-between p-2 md:p-4">
        <LedgerLogo />
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full lg:block lg:w-auto" id="navbar-default">
          <Popover.Group
            as="ul"
            className={cn(
              "flex flex-col lg:flex-row lg:space-x-8",
              black ? "text-white" : "text-black"
            )}
          >
            {nav.header.navlinks.map((link, index) => {
              if (link.links) {
                return (
                  <MenuPopOver
                    black={black}
                    name={link.name}
                    links={link.links}
                    key={index}
                  />
                );
              }
              return (
                <li key={index}>
                  <a
                    href="#"
                    className="block cursor-pointer rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </Popover.Group>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
