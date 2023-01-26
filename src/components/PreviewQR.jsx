import React, { useEffect, useRef, useState } from "react";

export default function PreviewQR() {
  const [url, setUrl] = useState("https://www.masterubah.com");
  const [qrCode, setQrCode] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const ref = useRef(null);
  const [fileExt, setFileExt] = useState("png");

  useEffect(() => {
    import("qr-code-styling").then(qrCodeStyling => {
      setQrCode(
        new qrCodeStyling.default({
          width: 300,
          height: 300,
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
  
  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  return (
    <div className="PreviewQR p-20 flex flex-col">
      <form onSubmit={onSubmit} className="flex flex-col">
        <input
          type="text"
          value={inputUrl}
          onChange={(event) => setInputUrl(event.target.value)}
          className="p-5 text-[2.5rem] h-80 bg-orange-100 rounded-xl drop-shadow-lg text-center"
          placeholder="Masukan Text"/>
        <button 
          type="submit" 
          className="mt-9 text-[2.5rem] font-bold tracking-wide text-slate-100 bg-orange-500 p-6 rounded-full w-1/3 self-center drop-shadow-md">
        Bikin QR
        </button>
      </form>
      <div
        ref={ref}
        className="self-center mt-16 p-5 bg-slate-200 rounded-xl drop-shadow-lg"
        />
        {/* DOWNLOAD BUTTON  */}
        <div className="flex justify-center mt-6">
          <button onClick={onDownloadClick} className="text-[2.5rem] py-4 px-9 bg-lime-300 font-bold rounded-full">
            Download
          </button>
        </div>
      </div>



  );
}
