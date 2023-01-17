// components/layout.js

import { trpc } from "utils/trpc";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { cn } from "utils/utils";

const LedgerLogo = () => {
  return (
    <a
      href="https://www.ledger.com"
      title="Ledger"
      className="md:w-[120px] w-[80px]"
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
}: {
  name: string;
  links: {
    name: string;
    href: string;
  }[];
  href?: undefined;
}) => {
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative">
      <Popover.Button
        ref={setReferenceElement}
        className="h-fit flex flex-row items-center"
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <span>{name}</span>
        <ChevronDownIcon className="ui-open:rotate-180 ui-open:transform w-5 h-5" />
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
          className={cn(
            "absolute left-full z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 w-fit whitespace-nowrap  bg-white opacity-100 translate-y-0"
          )}
        >
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            {links.map((link, index) => {
              return (
                <li key={index} className="px-4 py-2">
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 rounded md:bg-transparent cursor-pointer md:p-0 "
                    aria-current="page"
                  >
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

const Navbar = () => {
  const { data } = trpc.navRouter.navigation.useQuery();

  {
    !data && <></>;
  }
  return (
    <nav className="bg-transparent w-full max-h-[80px]">
      <div className="flex flex-wrap items-center justify-between p-2 md:p-4">
        <LedgerLogo />
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
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
            className="flex flex-col lg:flex-row lg:space-x-8 "
          >
            {data?.nav.header.navlinks.map((link, index) => {
              if (link.links) {
                return (
                  <MenuPopOver
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
                    className="block py-2 pl-3 pr-4 rounded md:bg-transparent cursor-pointer md:p-0 "
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