import React from "react";

const HeroImageDecorations = () => {
  return (
    <div className="absolute inset-0 size-full border-x-2 border-t-2 border-white rounded-2xl">
      {/* <div
        className="absolute inset-0 size-full rounded-2xl blur-[20px]"
        style={{
          borderLeft: "10px solid #fff",
          borderTop: "10px solid #fff",
          borderRight: "10px solid #fff",
        }}
      /> */}
      <div
        className="absolute inset-0 size-full rounded-2xl blur-[15px]"
        style={{
          borderLeft: "5px solid #fff",
          borderTop: "5px solid #fff",
          borderRight: "5px solid #fff",
        }}
      />

      {/* <div className="hidden md:block absolute top-10 left-10 size-60 bg-cyan-500 rounded-full blur-3xl" /> */}
      <div className="absolute top-0 left-0 size-40 bg-blue-500 rounded-full blur-3xl" />
      <div className="hidden md:block absolute z-30 -top-10 -left-10 size-20 bg-white rounded-full blur-2xl" />

      {/* <div className="hidden md:block absolute top-10 right-10 size-60 bg-blue-500 rounded-full blur-3xl" /> */}
      <div className="absolute top-0 -right-0 size-40 bg-cyan-500 rounded-full blur-3xl" />
      <div className="hidden md:block absolute -top-10 -right-10 size-20 bg-white rounded-full blur-2xl" />
    </div>
  );
};

export default HeroImageDecorations;
