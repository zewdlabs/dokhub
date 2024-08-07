"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

import { useMediaQuery } from "@/hooks/use-media-query";

const SIZE = 350;

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Detect_WebGL
function isWebGLContext() {
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  return gl instanceof WebGLRenderingContext;
}

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );
  const [disabledWebGL, setDisabledWebGL] = useState(false);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;
    if (!document) return;
    if (!isWebGLContext()) {
      setDisabledWebGL(true);
      return;
    }

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: SIZE * 2,
      height: SIZE * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      markers: [
        // Addis Ababa
        { location: [9.0249, 38.7469], size: 0.05 },

        // add more location
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        if (!prefersReducedMotion) {
          state.phi = phi;
          phi += 0.003;
        }
      },
    });

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.style.opacity = "1";
    });

    return () => {
      globe.destroy();
    };
  }, [prefersReducedMotion]);

  if (disabledWebGL) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold">Hint</span>: enable{" "}
          <span className="font-semibold">WebGL</span> to render the globe.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        style={{
          width: SIZE,
          height: SIZE,
          maxWidth: "100%",
          aspectRatio: 1,
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
