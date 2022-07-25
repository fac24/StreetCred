import { useState, useEffect } from "react";

function useViewport() {
  const [width, setWidth] = useState(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => setWidth(window.innerWidth);
    }

    const handleWindowResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
}

export default useViewport;
