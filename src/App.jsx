import { useState } from "preact/hooks";
import QRCode from "qrcode";

export default function App() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(text);
      setQrCode(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter text or URL"
      />
      <button
        onClick={generateQRCode}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2"
      >
        Generate QR Code
      </button>
      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="QR Code" className="mx-auto mb-2" />
          <button
            onClick={downloadQRCode}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}
