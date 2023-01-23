import React, { useEffect, useRef, useState } from "react";

export default function PreviewQR() {
  const [url, setUrl] = useState("https://qr-code-styling.com");
  const [qrCode, setQrCode] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    import("qr-code-styling").then(qrCodeStyling => {
      setQrCode(
        new qrCodeStyling.default({
          width: 300,
          height: 300,
          image:
            "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
          dotsOptions: {
            color: "#4267b2",
            type: "rounded"
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
          }
        })
      );
    });
  }, []);

  useEffect(() => {
    if (qrCode) {
      qrCode.update({
        data: url
      });
    }
  }, [url, qrCode]);

  useEffect(() => {
    if (qrCode) {
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  const onSubmit = (event) => {
    event.preventDefault();
    setUrl(inputUrl);
  };

  return (
    <div className="PreviewQR p-9">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={inputUrl}
          onChange={(event) => setInputUrl(event.target.value)}
        />
        <button type="submit">Generate QR Code</button>
      </form>
      <div ref={ref} />
    </div>
  );
}
