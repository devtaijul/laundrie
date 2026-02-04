"use client";

import { Icons } from "@/icons";
import React from "react";
import Marquee from "react-fast-marquee";

const ContentComponent = ({ content }: { content: string }) => {
  return (
    <div className="flex items-center">
      <Icons name="MR_STAR_ICON" />
      <span className="text-xl font-medium text-black mx-8 flex items-center">
        {content}
      </span>
    </div>
  );
};

export const HeroMarque = () => {
  const marque_titles = [
    {
      id: 1,
      content: " Exceptional laundry services you trust",
    },
    {
      id: 2,
      content: " Exceptional laundry services you trust",
    },
    {
      id: 3,
      content: " Exceptional laundry services you trust",
    },
    {
      id: 4,
      content: " Exceptional laundry services you trust",
    },
  ];
  return (
    <Marquee className="py-6 bg-[#FEE479] ">
      {marque_titles.map(({ id, content }) => (
        <ContentComponent key={id} content={content} />
      ))}
    </Marquee>
  );
};
