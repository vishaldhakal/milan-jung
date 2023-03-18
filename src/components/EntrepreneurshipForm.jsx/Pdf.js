import "./FileType.css";

export default function Pdf() {
  return (
    <svg viewBox="0 0 32 32" className="cog-icon cog-i-file">
      <g className="cog-i-file__paper">
        <polygon points="4 31.5 4 0.5 22.25 0.5 28 6.06 28 31.5 4 31.5"></polygon>{" "}
        <polygon points="4.01 0.46 4.01 31.5 27.97 31.5 27.97 5.99 22.28 0.51 4.01 0.46"></polygon>{" "}
        <polyline points="27.98 6.34 21.94 6.34 21.94 0.3"></polyline>
      </g>
      <rect fill="#c62128" x="6" y="23.09" className="cog-i-file__color"></rect>{" "}
      <text x="16" y="29.7" className="cog-i-file__extension">
        pdf
      </text>{" "}
      <line
        x1="6.77"
        y1="31.51"
        x2="25.25"
        y2="31.51"
        className="cog-i-file__shadow"
      ></line>{" "}
      <g className="cog-i-file__format-symbol">
        <path d="M12.3,11.45H10.45l-.33.76a1.14,1.14,0,0,0-.12.42.26.26,0,0,0,.11.19,1,1,0,0,0,.45.11v.13H9.05v-.13a1,1,0,0,0,.39-.14,2.29,2.29,0,0,0,.4-.69l1.68-3.94h.13l1.66,4a1.81,1.81,0,0,0,.37.62.77.77,0,0,0,.46.17v.13H12.25v-.13a.7.7,0,0,0,.38-.1.23.23,0,0,0,.1-.2,1.37,1.37,0,0,0-.14-.49Zm-.1-.26-.81-1.93-.83,1.93Z"></path>{" "}
        <line x1="15.1" y1="9.26" x2="22.86" y2="9.26"></line>{" "}
        <line x1="15.1" y1="12.33" x2="22.86" y2="12.33"></line>{" "}
        <line x1="9.13" y1="15.4" x2="22.86" y2="15.4"></line>{" "}
        <line x1="9.13" y1="18.47" x2="22.86" y2="18.47"></line>
      </g>
    </svg>
  );
}
