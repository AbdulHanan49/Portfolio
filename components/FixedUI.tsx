"use client";

import { FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function FixedUI() {
  const [show, setShow] = useState(false);

  useEffect(() => { setShow(true); }, []);

  if (!show) return null;

  return (
    <a
      href="/resume.pdf"
      download
      className="fixed-resume hidden lg:flex"
      aria-label="Download resume"
    >
      <span>RESUME</span>
      <FiDownload size={11} />
    </a>
  );
}
