import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { cn } from "utils/utils";

const HardWareWalletCard = () => {
  const infos = [
    {
      name: "bluetooth",
      striped: false,
    },
    {
      name: "Wireless charging",
      striped: false,
    },
    {
      name: "Touchscreen",
      striped: false,
    },
    {
      name: "Windows",
      striped: false,
    },
    {
      name: "macOS",
      striped: true,
    },
  ];

  const shippigInfo = {};

  const variantsAvariables = [
    {
      color: "#4e4b48",
      name: "graphite",
    },
    {
      color: "#f54021",
      name: "orange",
    },
    {
      color: "#2271b3",
      name: "blue",
    },
  ];

  const [selectedVariant, setSelectedVariant] = useState(variantsAvariables[0]);

  return (
    <div className="width-[380px] flex flex-col gap-2">
      <div
        className="h-[400px]"
        style={{ backgroundColor: selectedVariant.color }}
      ></div>
      <div className="capitalize text-2xl">ledger Stax</div>
      <div className="flex items-baseline gap-4">
        <span className="font-bold text-xl">US$300</span>
        <span className="font-light text-gray-500 text-xs">
          Tax and duty not included
        </span>
      </div>
      <div className="py-1 px-2 bg-black text-white w-fit rounded-md">
        Shipping by May 2023
      </div>
      <div className="">
        {infos.map((info, index) => (
          <div
            key={index}
            className={cn(
              `bg-gray-300 mr-2 mb-2 rounded-sm w-fit float-left py-1 px-2`,
              info.striped ? "bg-gray-50 text-gray-200 line-through" : ""
            )}
          >
            {info.name}
          </div>
        ))}
      </div>
      <div className="">
        <span>Color</span>
        <div className="flex flex-row gap-2">
          {variantsAvariables.map((variant) => (
            <div
              key={variant.color}
              style={{ backgroundColor: variant.color }}
              onClick={() => setSelectedVariant(variant)}
              className={cn(
                `rounded-full w-6 h-6 hover:ring-2 cursor-pointer ring-black border border-white`,
                variant.color === selectedVariant.color ? "ring-2" : ""
              )}
            >
              <span className="sr-only">{variant.name}</span>
            </div>
          ))}
        </div>
        <div className="">{selectedVariant.name}</div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <button className="bg-[#f54021] py-4 px-8 text-xl rounded-full text-white hover:bg-orange-500 font-semibold">
          Add to cart
        </button>
        <a className="flex flex-row  items-center justify-center gap-2 cursor-pointer font-semibold">
          <span>Add to cart</span> <ArrowRightIcon className="h-4" />
        </a>
      </div>
    </div>
  );
};

export default HardWareWalletCard;
