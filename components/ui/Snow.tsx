"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSnowPreset } from "@tsparticles/preset-snow";

import type { Container, Engine } from "@tsparticles/engine";

export default function Snow() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      // load snow preset
      await loadSnowPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  return (
    <>
      {init && (
         <Particles
         id="tsparticles"
         particlesLoaded={particlesLoaded}
         options={{
           preset: "snow",
           background: {
             opacity: 0,
           },
           particles: {
            number: {
                value: 50, // Reduce the number of particles (default is usually higher)
              },
             color: {
               value: "#b8daff", // Light blue color
             },
           },
         }}
       />
     )}
    </>
  );
}