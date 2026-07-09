"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiCloud, FiX, FiDatabase } from "react-icons/fi";

const SVG = (p: string) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style={{ display: "block" }}>
    <path d={p} />
  </svg>
);

const SI = {
  React:      (<svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" width="1em" height="1em" style={{ display: "block" }}><circle r="2.05"/><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>),
  TypeScript: SVG("M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"),
  JavaScript: SVG("M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"),
  NodeJS:     SVG("M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"),
  Express:    SVG("M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c-.022-.271-.059-.54-.059-.826zm1.148-.227c1.72.04 3.44.016 5.159.013 1.73 0 3.46.025 5.188-.006-.29-3.04-2.11-4.92-4.742-4.92-2.765 0-4.908 1.919-5.605 4.913z"),
  MongoDB:    SVG("M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.596-5.504-.197-2.218z"),
  PostgreSQL: SVG("M17.128 0a10.134 10.134 0 0 0-2.755.403A7.034 7.034 0 0 0 12.6.258C11.422.258 9.919.88 8.94 1.63c-.773.123-1.5.4-2.16.82-.585.37-1.082.847-1.478 1.424a5.58 5.58 0 0 0-.878 3.03c0 .607.095 1.215.285 1.814l.01.028.018.068c.374 1.408 1.168 2.608 2.26 3.48.94.736 2.128 1.15 3.368 1.162a5.29 5.29 0 0 0 .982-.096l-.018.133c-.033.254-.05.51-.05.767v.66l-.257.065a3.9 3.9 0 0 0-1.252.532c-.837.574-1.47 1.517-1.47 2.788 0 1.25.593 2.28 1.428 2.968C9.57 21.649 10.678 22 11.952 22c1.273 0 2.4-.39 3.2-1.11.79-.71 1.285-1.741 1.285-3.013 0-.65-.128-1.217-.36-1.686a2.706 2.706 0 0 0-.33-.502c.28-.146.528-.327.737-.53.412-.4.64-.891.64-1.495v-.04l.02-.02c.507-.417.945-.918 1.31-1.49.08-.127.156-.26.224-.395.056.02.112.038.168.053a3.85 3.85 0 0 0 .958.127c.998 0 1.927-.4 2.635-1.053.69-.637 1.133-1.52 1.15-2.573v-.013c0-.437-.126-.878-.325-1.298a4.398 4.398 0 0 0-.926-1.223c-.384-.351-.78-.6-1.218-.797a3.85 3.85 0 0 0-1.482-.31zm.068.88c.44 0 .866.088 1.258.262.35.157.67.374 1.008.685.329.3.571.642.741 1.01.166.363.25.726.25 1.074 0 .857-.338 1.55-.863 2.03-.524.48-1.246.767-2.004.767a2.95 2.95 0 0 1-.78-.105c.044-.178.082-.36.107-.546.207-1.542-.105-3.083-.986-4.3.353-.562.83-.877 1.27-.877zM12.6 1.14c.493 0 1.005.105 1.502.318 1.094 1.095 1.57 2.725 1.33 4.426a5.023 5.023 0 0 1-.194.836c-.293.876-.78 1.58-1.41 2.018-.626.435-1.37.636-2.18.545a4.43 4.43 0 0 1-2.145-.868 5.026 5.026 0 0 1-1.8-2.87 5.16 5.16 0 0 1-.244-1.606c0-.943.258-1.73.7-2.361C8.6 1.8 9.4 1.36 10.29 1.2a5.49 5.49 0 0 1 2.31-.06zm4.9 9.66a7.24 7.24 0 0 1-1.097 1.252c-.037-.24-.087-.48-.154-.718a9.09 9.09 0 0 0-.41-1.098c.5-.24.963-.542 1.378-.893.1-.084.194-.172.286-.263.07.2.124.402.16.607a3.67 3.67 0 0 1-.163 1.113zM8.675 11.45a5.27 5.27 0 0 0 2.275.705v1.557a5.638 5.638 0 0 0-.91-.055h-.044a7.372 7.372 0 0 0-1.17.093l-.013.002a2.33 2.33 0 0 1-.247-1.058c0-.432.106-.83.11-1.244zm3.154.748a4.482 4.482 0 0 0 1.87-.555c.19.434.326.89.4 1.357.065.41.086.83.046 1.224a3.85 3.85 0 0 1-.59.05h-.05a3.727 3.727 0 0 1-1.676-.42v-1.656zm-4.24.98a3.404 3.404 0 0 0 .165 1.048c-.256.12-.49.266-.7.43-.5.387-.862.9-1.09 1.5a5.063 5.063 0 0 1-.408-1.96c0-.123.005-.246.015-.366.576-.29 1.22-.51 2.018-.653zm8.046.61c.025.054.05.108.072.163.17.415.264.862.264 1.368 0 1.02-.37 1.82-.97 2.357-.602.537-1.46.856-2.49.856-1.03 0-1.86-.27-2.49-.744-.633-.474-1.06-1.15-1.06-2.06 0-.927.435-1.65 1.078-2.098a3.07 3.07 0 0 1 1.026-.47 6.702 6.702 0 0 1 1.535-.155c.363 0 .716.028 1.052.083a2.92 2.92 0 0 1 2.154 1.04l-.17-.34zm1.64-2.19c.007.096.013.193.013.29 0 .42-.09.787-.267 1.1a1.882 1.882 0 0 1-.443.545c-.065-.376-.17-.747-.315-1.107a7.54 7.54 0 0 0-.326-.706 4.51 4.51 0 0 0 1.338-.122z"),
  Git:        SVG("M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.604-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"),
  Docker:     SVG("M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"),
  Tailwind:   SVG("M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,14.382,8.976,13,6.001,13z"),
  Python:     SVG("M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04z"),
  Vue:        SVG("M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"),
  FastAPI:    SVG("M12 0C5.376 0 0 5.376 0 12c0 6.627 5.376 12 12 12 6.627 0 12-5.373 12-12 0-6.624-5.373-12-12-12zm-.624 21.624v-7.248H7.5L13.5 2.376v7.248h3.876z"),
  Django:     SVG("M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.364 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v11.653c0 4.027-.3 5.967-1.171 7.632-.816 1.61-1.988 2.64-4.334 3.745l-3.644-1.729c2.346-1.1 3.518-2.03 4.232-3.49.739-1.484.968-3.26.968-7.888V6.06h3.95zM17.39.005h3.924v4.029H17.39z"),
  Stripe:     SVG("M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"),
  GHActions:  SVG("M10.984 13.836a.5.5 0 0 1-.353-.146l-3.5-3.5a.502.502 0 0 1 0-.707l3.5-3.5a.5.5 0 0 1 .707.707L8.14 9.69l3.197 3.2a.5.5 0 0 1-.354.854zm2.033 0a.5.5 0 0 1-.354-.854l3.197-3.2-3.197-3.2a.5.5 0 0 1 .707-.707l3.5 3.5a.502.502 0 0 1 0 .707l-3.5 3.5a.5.5 0 0 1-.353.146zM12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.074 0 11-4.926 11-11S18.074 1 12 1 1 5.926 1 12s4.926 11 11 11z"),
  MySQL:      SVG("M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 0 0-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.347-.046-.58-.138v-.64c.11.017.24.026.37.026.276 0 .496-.174.625-.523.13-.348.195-.968.195-1.858-.145-2.25-.61-4.088-1.395-5.51h.98c.51.768.905 1.895 1.185 3.38.037-.176.094-.432.17-.768.075-.336.16-.605.253-.81.24-.53.622-.793 1.15-.793.326 0 .594.043.806.13v.63c-.168-.045-.334-.067-.5-.067-.36 0-.63.224-.812.67zm10.3 4.08h-2.968v-5.53h.927v4.81h2.04v.72zm-7.73 0c-.016-.186-.024-.348-.024-.483v-4.41h.91v3.72c0 .34.087.633.26.88.173.247.4.37.68.37.28 0 .5-.126.657-.377.157-.25.235-.6.235-1.047v-3.546h.906v3.7c0 .558-.133 1.01-.4 1.36-.266.35-.618.524-1.053.524-.48 0-.853-.23-1.115-.694h-.01l-.046.603zM5.77 5.07H4.844V3.012H3.97v-.764h2.587v.764H5.77V5.07zm3.15-1.764c0 .576-.158 1.044-.475 1.403-.317.36-.739.54-1.267.54-.513 0-.926-.168-1.24-.5-.314-.334-.47-.77-.47-1.312 0-.57.165-1.036.495-1.394.33-.36.77-.54 1.326-.54.52 0 .926.164 1.22.49.29.326.436.757.41 1.313zm-2.526-.012c0 .37.072.65.215.84.143.19.346.284.61.284.252 0 .447-.09.584-.27.138-.18.207-.46.207-.84 0-.365-.072-.64-.215-.82-.143-.18-.347-.27-.61-.27-.25 0-.447.088-.59.266-.144.177-.21.456-.2.81zm6.67-1.8c0 .217-.055.4-.163.547-.108.15-.257.224-.45.224-.143 0-.27-.043-.382-.127-.113-.085-.185-.196-.215-.335h-.014c-.027.145-.085.274-.177.388-.09.112-.2.18-.33.2-.082.017-.175.025-.28.025h-.49v-2.47h.92c.238 0 .425.06.565.18.14.12.21.29.21.52 0 .16-.04.3-.117.42-.077.12-.19.203-.337.25.18.04.32.12.42.23.1.11.15.26.15.43zm-1.586-.63h.365c.13 0 .228-.03.295-.09.066-.06.1-.14.1-.24 0-.1-.035-.175-.103-.226-.067-.05-.166-.076-.295-.076h-.362v.63zm0 .824h.417c.137 0 .24-.035.31-.104.067-.07.1-.165.1-.284 0-.12-.037-.21-.11-.28-.073-.07-.178-.105-.313-.105H11.5v.77zm3.77-.456c-.012-.213-.055-.376-.127-.487-.073-.11-.178-.165-.315-.165-.13 0-.237.055-.32.165-.085.11-.135.27-.152.487h.914z"),
  Gemini:     SVG("M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 2.571l2.852 6.752L22.285 12l-7.433 2.677L12 21.429l-2.852-6.752L1.715 12l7.433-2.677z"),
};

interface Skill {
  name: string; icon: React.ReactNode; color: string;
  tier: "production" | "familiar";
  experience: string; description: string; tools: string[];
}

const columns: { title: string; accent: string; number: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    number: "01",
    accent: "var(--accent)",
    skills: [
      { name: "React 18",     icon: SI.React,      color: "#61dafb", tier: "production", experience: "1+ yr",  description: "Production SaaS with 70+ custom hooks, TanStack Query v5, Zustand + Zundo, React Hook Form, i18next, PWA.",  tools: ["TanStack Query","Zustand","React Hook Form","i18next"] },
      { name: "TypeScript",   icon: SI.TypeScript, color: "#3178c6", tier: "production", experience: "1+ yr",  description: "Type-safe production code with generics, utility types, Pydantic-style validation, strict config.",           tools: ["Generics","Type Guards","Utility Types","Zod"] },
      { name: "JavaScript",   icon: SI.JavaScript, color: "#f7df1e", tier: "production", experience: "2+ yrs", description: "ES6+, async patterns, closures, DOM APIs. Used daily across every project.",                                tools: ["ES6+","Promises","Web APIs","Async/Await"] },
      { name: "Vue 3",        icon: SI.Vue,        color: "#42b883", tier: "production", experience: "6 mo",   description: "Rebuilt Job Wallet frontend at Visnext with Vue 3 Composition API, Quasar Framework, Pinia state management, and Tailwind CSS across 10+ feature screens.", tools: ["Composition API","Quasar Framework","Pinia","Tailwind CSS"] },
      { name: "Tailwind CSS", icon: SI.Tailwind,   color: "#06b6d4", tier: "production", experience: "1+ yr",  description: "Utility-first styling with Tailwind CSS 4, custom design systems, animations, responsive layouts.",          tools: ["CSS 4","Custom Themes","Animations","Dark Mode"] },
    ],
  },
  {
    title: "Backend",
    number: "02",
    accent: "var(--accent)",
    skills: [
      { name: "FastAPI",     icon: SI.FastAPI,    color: "#009688", tier: "production", experience: "1 yr",   description: "Primary backend at KCube: Pydantic v2, SQLModel, Alembic migrations, async endpoints, JWT + OAuth.",                                                      tools: ["Pydantic v2","SQLModel","Alembic","Async Routes"] },
      { name: "Python",      icon: SI.Python,     color: "#3776ab", tier: "production", experience: "2+ yrs", description: "Primary backend language. FastAPI at KCube for MixClip and Django REST at Visnext for Job Wallet. OpenCV + Matplotlib for image processing projects.", tools: ["FastAPI","Django REST","OpenCV","Pydantic"] },
      { name: "Node.js",     icon: SI.NodeJS,     color: "#68a063", tier: "production", experience: "1+ yr",  description: "Express REST APIs at KCube and Remotion 4 video rendering engine for MixClip.",                                                                         tools: ["Remotion 4","Express","REST APIs","Video Rendering"] },
      { name: "Express.js",  icon: SI.Express,    color: "#c0c0c0", tier: "production", experience: "1+ yr",  description: "Middleware patterns, routing, JWT auth, structured API contracts, validation.",                                                                          tools: ["Middleware","JWT Auth","Rate Limiting","Validation"] },
      { name: "Django REST", icon: SI.Django,     color: "#44b78b", tier: "production", experience: "6 mo",   description: "Built 10+ resource APIs at Visnext: DRF serializers, viewsets, JWT + RBAC, Django ORM N+1 optimisation, Celery + Redis async tasks.",                tools: ["Serializers","Viewsets","RBAC","Celery + Redis"] },
    ],
  },
  {
    title: "Databases",
    number: "03",
    accent: "var(--accent)",
    skills: [
      { name: "PostgreSQL", icon: SI.PostgreSQL,      color: "#4169e1", tier: "production", experience: "1+ yr", description: "Relational data modelling, complex queries, Alembic migrations, SQLAlchemy 2, query optimisation at KCube.",                                              tools: ["SQLAlchemy 2","Alembic","Migrations","Transactions"] },
      { name: "MySQL",      icon: SI.MySQL,           color: "#4479a1", tier: "production", experience: "6 mo",  description: "Production database at Visnext for Job Wallet: schema design, N+1 query elimination via Django ORM select_related / prefetch_related, index-level optimisation.", tools: ["Django ORM","select_related","Indexes","Migrations"] },
      { name: "MongoDB",    icon: SI.MongoDB,         color: "#47a248", tier: "familiar",   experience: "1 yr",  description: "Schema design, aggregation pipelines, Mongoose ODM. Used in MERN-stack projects including Screen Sizzle.",                                                         tools: ["Mongoose","Aggregation","Atlas","Indexing"] },
      { name: "Redis",      icon: <FiDatabase />,     color: "#DC382D", tier: "production", experience: "6 mo",  description: "Async task queue backing with Celery at Visnext: scheduled interview reminders, subscription lifecycle events, and webhook processing.",                          tools: ["Celery","Task Queues","Pub/Sub","Caching"] },
    ],
  },
  {
    title: "DevOps & Tools",
    number: "04",
    accent: "var(--accent)",
    skills: [
      { name: "Docker",     icon: SI.Docker,     color: "#2496ed", tier: "production", experience: "1+ yr",  description: "Multi-stage builds, Docker Compose, containerised micro-services. Used in production Azure deployments.",          tools: ["Multi-stage","Compose","Azure ACR","Networks"] },
      { name: "GH Actions", icon: SI.GHActions, color: "#2088ff", tier: "production", experience: "1 yr",   description: "Automated CI/CD: build, test, push to Azure Container Registry, deploy to Azure Container Apps.",                  tools: ["CI Pipelines","Docker Build","Release Gates","Env Secrets"] },
      { name: "Azure",      icon: <FiCloud />,  color: "#0078d4", tier: "production", experience: "1 yr",   description: "Azure Container Apps, Container Registry, Blob & Queue Storage, Cognitive Services Speech SDK.",                   tools: ["Container Apps","Blob Storage","ACR","Speech SDK"] },
      { name: "Stripe API", icon: SI.Stripe,    color: "#635bff", tier: "production", experience: "1 yr",   description: "Production billing at both KCube and Visnext: subscriptions, 17+ currencies, webhooks, trial lifecycle.",          tools: ["Subscriptions","Webhooks","Multi-currency","Trials"] },
      { name: "Git",        icon: SI.Git,       color: "#f05032", tier: "production", experience: "3+ yrs", description: "Branching strategies, rebasing, conflict resolution, CI workflow hooks.",                                          tools: ["GitHub Actions","Git Flow","Rebasing","Hooks"] },
      { name: "Gemini AI",  icon: SI.Gemini,   color: "#4285f4", tier: "familiar",   experience: "< 1 yr", description: "Google Gemini AI API integrated into MixClip at KCube: content assistance for script writing and AI-generated video metadata.", tools: ["Gemini API","Prompt Engineering","Content Gen","REST"] },
    ],
  },
];

/* ── Skill Row ── */
function SkillRow({ skill, delay, catAccent, isOpen, onOpen, onClose }: {
  skill: Skill; delay: number; catAccent: string;
  isOpen: boolean; onOpen: () => void; onClose: () => void;
}) {
  const isProd = skill.tier === "production";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ x: 3 }}
        onClick={onOpen}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
        style={{
          display: "flex", alignItems: "center", gap: "0.65rem",
          padding: "0.6rem 0.75rem",
          borderRadius: 10,
          background: "var(--bg-tertiary)",
          border: "1px solid var(--border)",
          cursor: "pointer", outline: "none",
          transition: "border-color .2s, background .2s",
        }}
      >
        {/* Icon */}
        <div style={{
          width: 34, height: 34, borderRadius: 8, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", color: skill.color,
          background: `${skill.color}14`, border: `1px solid ${skill.color}25`,
        }}>
          {skill.icon}
        </div>

        {/* Name + tier badge */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-space)", fontSize: "0.8rem", fontWeight: 700,
              color: "var(--text-primary)", lineHeight: 1,
              minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {skill.name}
            </span>
            <span style={{
              fontFamily: "var(--font-fira)", fontSize: "0.52rem", fontWeight: 700,
              color: isProd ? "var(--accent)" : "var(--text-muted)",
              background: isProd ? "var(--accent-mix-10)" : "var(--bg-primary)",
              padding: "0.1rem 0.42rem", borderRadius: 999,
              border: `1px solid ${isProd ? "var(--accent-mix-25)" : "var(--border)"}`,
              flexShrink: 0,
            }}>
              {isProd ? "Professional" : "Familiar"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
            style={{ background: "rgba(6,5,20,0.85)", backdropFilter: "blur(12px)" }}
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", maxWidth: 460, width: "100%",
                maxHeight: "90dvh", overflowY: "auto",
                padding: "2rem", borderRadius: 22,
                background: "var(--card-bg)",
                border: `1.5px solid ${skill.color}40`,
                boxShadow: `0 28px 72px rgba(0,0,0,0.6), 0 0 0 1px ${skill.color}18`,
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                borderRadius: "22px 22px 0 0",
                background: `linear-gradient(to right, ${skill.color}, ${catAccent}80, transparent)`,
              }} />
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: "1rem", right: "1rem",
                  width: 30, height: 30, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--bg-tertiary)", color: "var(--text-muted)",
                  border: "1px solid var(--border)", cursor: "pointer",
                }}
                aria-label="Close"
              >
                <FiX size={14} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", color: skill.color,
                  background: `${skill.color}18`, border: `1px solid ${skill.color}35`,
                }}>
                  {skill.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-space)", fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                    {skill.name}
                  </h3>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <span style={{
                      fontFamily: "var(--font-fira)", fontSize: "0.6rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      color: isProd ? "var(--accent)" : "var(--text-muted)",
                      background: isProd ? "var(--accent-mix-10)" : "var(--bg-tertiary)",
                      padding: "0.18rem 0.6rem", borderRadius: 999,
                      border: `1px solid ${isProd ? "var(--accent-mix-25)" : "var(--border)"}`,
                    }}>
                      {isProd ? "Professional" : "Working knowledge"}
                    </span>
                    <span style={{ fontFamily: "var(--font-fira)", fontSize: "0.68rem", color: "var(--text-muted)" }}>
                      {skill.experience}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                {skill.description}
              </p>
              <p style={{ fontFamily: "var(--font-fira)", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "0.65rem" }}>
                Tools &amp; Concepts
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {skill.tools.map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-fira)", fontSize: "0.7rem", fontWeight: 600,
                    padding: "0.32rem 0.8rem", borderRadius: 10,
                    background: `${skill.color}12`, color: skill.color,
                    border: `1px solid ${skill.color}30`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Column ── */
function SkillColumn({ col, colIndex, activeSkill, onOpen, onClose }: {
  col: typeof columns[number]; colIndex: number;
  activeSkill: string | null; onOpen: (name: string) => void; onClose: () => void;
}) {
  return (
    <ScrollReveal delay={colIndex * 0.1}>
      <div style={{
        position: "relative",
        borderRadius: 18,
        padding: "clamp(1rem, 3vw, 1.5rem)",
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}>
        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "18px 18px 0 0",
          background: `linear-gradient(to right, ${col.accent}, transparent)`,
        }} />

        {/* Left accent bar */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: "18px 0 0 18px",
          background: `linear-gradient(to bottom, ${col.accent}, transparent)`,
        }} />

        {/* Column header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
          <span style={{
            fontFamily: "var(--font-fira)", fontSize: "0.58rem", fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: col.accent,
            background: `${col.accent}14`,
            border: `1px solid ${col.accent}28`,
            padding: "0.2rem 0.55rem", borderRadius: 7,
          }}>
            {col.number}
          </span>
          <h3 style={{
            fontFamily: "var(--font-space)", fontWeight: 700,
            fontSize: "1rem", color: "var(--text-primary)", margin: 0,
          }}>
            {col.title}
          </h3>
          <span style={{
            fontFamily: "var(--font-fira)", fontSize: "0.58rem",
            color: "var(--text-muted)", marginLeft: "auto",
          }}>
            {col.skills.length} skills
          </span>
        </div>

        {/* Skill rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          {col.skills.map((skill, si) => (
            <SkillRow
              key={skill.name}
              skill={skill}
              delay={colIndex * 0.06 + si * 0.05}
              catAccent={col.accent}
              isOpen={activeSkill === skill.name}
              onOpen={() => onOpen(skill.name)}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Section ── */
export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const close = useCallback(() => setActiveSkill(null), []);

  useEffect(() => {
    if (!activeSkill) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onHash = () => close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [activeSkill, close]);

  return (
    <section
      id="skills"
      style={{
        padding: "1.25rem 0 1.5rem",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background dot-grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(100,255,218,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <ScrollReveal>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{
              fontFamily: "var(--font-fira)", fontSize: "0.65rem", fontWeight: 700,
              color: "var(--accent)", textTransform: "uppercase",
              letterSpacing: "0.28em", marginBottom: "0.6rem",
            }}>
              04. Skills
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)", fontWeight: 800,
              fontSize: "clamp(1.75rem, 3vw, 2.6rem)", lineHeight: 1.05,
              color: "var(--text-primary)", letterSpacing: "-0.02em",
            }}>
              Tech stack &amp;<br />
              <span style={{ color: "var(--accent-secondary)" }}>expertise</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Three-column grid */}
        <div className="skills-grid-responsive" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          gap: "clamp(0.75rem, 2vw, 1.25rem)",
          alignItems: "start",
        }}>
          {columns.map((col, ci) => (
            <SkillColumn
              key={col.title}
              col={col}
              colIndex={ci}
              activeSkill={activeSkill}
              onOpen={setActiveSkill}
              onClose={close}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

