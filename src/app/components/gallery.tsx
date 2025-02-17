"use client"

import { useState } from "react"

export default function Gallery() {
  const [flippedStates, setFlippedStates] = useState<boolean[]>([false, false, false])

  const images = [
    {
      src: "/csea.jpeg",
      alt: "Art piece 1",
      title: "CSEA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
    {
      src: "/eye.jpeg",
      alt: "Art piece 2",
      title: "The Eye",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
    {
      src: "/github.jpeg",
      alt: "Art piece 3",
      title: "Github Campus Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
  ]

  const handleFlip = (index: number) => {
    const newFlippedStates = [...flippedStates]
    newFlippedStates[index] = !newFlippedStates[index]
    setFlippedStates(newFlippedStates)
  }

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tighter sm:text-5xl text-gray-800">
          Featured Works
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {images.map((image, index: number) => (
            <div
              key={index}
              className="flip-card w-96 h-96 cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`flip-card-inner ${flippedStates[index] ? "flipped" : ""}`}
              >
                {/* Front Side (Image) */}
                <div className="flip-card-front">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Back Side (Text) */}
                <div className="flip-card-back flex flex-col justify-center items-center p-6">
                  <h3 className="text-2xl font-semibold text-black">{image.title}</h3>
                  <p className="text-sm mt-2 text-center text-gray-800">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .flip-card {
          perspective: 1000px; /* Enables 3D space */
        }

        .flip-card-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d; /* Ensure children are rendered in 3D */
          position: relative;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg); /* Flipped state */
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
          transform: rotateY(180deg); /* Initially hide the back side */
        }
      `}</style>
    </section>
  )
}
