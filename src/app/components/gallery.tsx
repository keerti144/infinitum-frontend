"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery() {
  const images = [
    {
      src: "/csea.jpeg",
      alt: "Art piece 1",
      title: "CSEA",
      description:
        "CSEA is a student-led tech community aimed at building a strong community of tech enthusiasts. We serve as a platform for students to explore various domains and enhance their skills",
    },
    {
      src: "/eye.jpeg",
      alt: "Art piece 2",
      title: "The Eye",
      description:
        "The eye is a Cybersecurity-Focus Society under the CSEA. We aim in raising awareness about digital security, protect information systems, and foster a community of ethical hackers and cybersecurity enthusiasts!",
    },
    {
      src: "/github.jpeg",
      alt: "Art piece 3",
      title: "Github Campus Club",
      description:
        "At Github we elevate student innovation one commit at a time through coding workshops, hackathons, and networking. It serves as a platform for beginners to learn, contribute, and collaborate on projects while building a tech community",
    },
  ];

  const [flippedStates, setFlippedStates] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  const handleFlip = (index: number) => {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tighter sm:text-5xl text-gray-800">
          Featured Works
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="flip-card w-full sm:w-80 h-96 cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`flip-card-inner ${
                  flippedStates[index] ? "flipped" : ""
                }`}
              >
                {/* Front Side (Image) */}
                <div className="flip-card-front">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Back Side (Text) */}
                <div className="flip-card-back flex flex-col justify-center items-center p-6">
                  <h3 className="text-2xl font-semibold text-black">
                    {image.title}
                  </h3>
                  <p className="text-sm mt-2 text-center text-gray-800">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .flip-card {
          perspective: 1000px;
        }

        .flip-card-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          position: relative;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .flip-card-front {
          background-color: #fff;
        }

        .flip-card-back {
          background-color: #fff;
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
