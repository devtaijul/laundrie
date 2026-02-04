import { Sparkles } from "lucide-react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
export const GallerySection = () => {
  const images = [
    "/assets/BreezeWash image.png",
    "/assets/FreshFold image again.png",
    "/assets/Spin & Shine image again.png",
    "/assets/BreezeWash image.png",
    "/assets/FreshFold image again.png",
    "/assets/Spin & Shine image again.png",
    "/assets/BreezeWash image.png",
    "/assets/FreshFold image again.png",
    "/assets/Spin & Shine image again.png",
    "/assets/BreezeWash image.png",
    "/assets/FreshFold image again.png",
    "/assets/Spin & Shine image again.png",
  ];
  return (
    <section className="py-16 ">
      <div className=" px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Marquee direction="right" pauseOnHover>
            {images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-4"
              >
                <Image
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-auto object-contain"
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </Marquee>
        </div>
        <div>
          <Marquee direction="left" pauseOnHover>
            {images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-4"
              >
                <Image
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-auto object-contain"
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
