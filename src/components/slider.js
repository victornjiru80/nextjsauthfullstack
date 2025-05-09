"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Slider = () => {
  const { data: session, status } = useSession();
  const sliderData = [
    {
      id: 1,
      title: session?.user?.name
        ? `Welcome back, ${session?.user?.name}, `
        : "Welcome, Explorer!",
      imgSrc: session?.user?.name ? "/login1.png" : "/logout1.png",
      offer: session?.user?.name
        ? "We've been waiting to show you around"
        : "You've just stepped into something different — and we're glad you're here.",
    },
    {
      id: 2,
      title: session?.user?.name
        ? "Here's the Big Reveal!"
        : "Curious yet?",
      imgSrc: session?.user?.name ? "/login2.png" : "/logout2.png",
      offer: session?.user?.name
        ? "Hope I caught you off guard — in a good way!"
        : "This isn't your average experience — but don't just take my word for it.",
    },
    {
      id: 3,
      title: session?.user?.name
        ? "You're In — What's Next?"
        : "Ready to Step Inside?",
      imgSrc: session?.user?.name ? "/login3.png" : "/logout3.png",
      offer: session?.user?.name
        ? "We've got something exciting on the way — stay tuned!"
        : "Create an account or log in to unlock your personalized experience.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length, session]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

 return (
  <div className="overflow-hidden relative w-full">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
      }}
    >
      {sliderData.map((slide) => (
        <div
          key={slide.id}
          className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 md:p-8 mt-6 min-w-full"
        >
          {/* Left Side: Title and Offer */}
          <div className="flex-1 pr-4">
            <h1 className="text-[20px] md:text-[28px] font-bold text-[#333] mb-2">
              {slide.title}
            </h1>
            <p className="text-md md:text-lg text-black">{slide.offer}</p>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1">
            <Image
              src={slide.imgSrc}
              alt={`Slide ${slide.id}`}
              width={300} // Reduced width
              height={200} // Reduced height
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-center gap-2 mt-8 invisible">
      {sliderData.map((_, index) => (
        <div
          key={index}
          onClick={() => handleSlideChange(index)}
          className={`h-2 w-2 rounded-full cursor-pointer ${
            currentSlide === index ? "bg-[#3b3b37]" : "bg-gray-500/30"
          }`}
        ></div>
      ))}
    </div>
  </div>
);
};

export default Slider;