import React from "react";

const CTA = () => {
  return (
    <div className="relative h-[110vh] flex-center">
      <div className="absolute size-[100vh] bg-white blur-xl rounded-[43%] flex-center slow-spin-left" />
      <div className="absolute size-[100vh] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex-center slow-spin-right">
        <div className="absolute size-[80vh] bg-[#00032b] rounded-full"></div>
      </div>
      <div
        className="absolute size-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #00032b 30%, #00032b 50%, #00032b 70%, transparent)",
        }}
      ></div>

      <div className="relative flex-center">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
            Ready to Transform Your Health?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl">
            Join SanAI today and take the first step towards a healthier, more
            informed you.
          </p>
          <a
            href="/meet-doctor"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;
