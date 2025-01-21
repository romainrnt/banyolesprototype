'use client'

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode as QrCodeIcon, 
  Scan, 
  RefreshCw, 
  Check, 
  Award 
} from 'lucide-react';

export const QRScanner = () => {
  const [qrContent, setQRContent] = useState('');
  const [pointsEarned, setPointsEarned] = useState(0);
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateQRContent = () => {
    try {
      const timestamp = Date.now();
      const randomBytes = new Uint8Array(8);
      crypto.getRandomValues(randomBytes);
      const randomId = Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      return `BW_${timestamp}_${randomId}`;
    } catch (err) {
      setError("Error generating QR code");
      return '';
    }
  };

  const handleScan = () => {
    try {
      const scannedContent = qrContent;
      
      if (scanHistory.includes(scannedContent)) {
        throw new Error('This QR code has already been scanned!');
      }

      const newPoints = Math.floor(Math.random() * 50) + 10;
      setPointsEarned(prev => prev + newPoints);
      setScanHistory(prev => [...prev, scannedContent]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error during scan");
    }
  };

  const regenerateQRCode = () => {
    setQRContent(generateQRContent());
    setError(null);
  };

  useEffect(() => {
    setQRContent(generateQRContent());
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center space-x-6">
        <QrCodeIcon className="w-10 h-10 text-[#4caf50]" />
        <h2 className="text-2xl font-bold text-gray-800">
          Waste Sorting QR Code
        </h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <div className="mb-6 p-4 bg-[#f0f9f0] rounded-xl">
            <QRCodeSVG 
              value={qrContent}
              size={256}
              level="H"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleScan}
              className="flex items-center px-6 py-3 bg-[#4caf50] text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Scan className="w-5 h-5 mr-2" />
              Simulate Scan
            </button>
            <button
              onClick={regenerateQRCode}
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Regenerate
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Your Achievements
            </h3>
            <Award className="w-8 h-8 text-[#ff9800]" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#f0f9f0] p-4 rounded-lg">
              <div className="flex items-center">
                <Check className="w-6 h-6 text-[#4caf50] mr-3" />
                <span className="font-semibold">Points Earned</span>
              </div>
              <span className="text-2xl font-bold text-[#2c5e2e]">
                {pointsEarned}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Scan History
              </h4>
              <div className="max-h-40 overflow-y-auto">
                {scanHistory.length > 0 ? (
                  scanHistory.map((scan, index) => (
                    <div 
                      key={index}
                      className="text-sm text-gray-600 bg-gray-100 p-2 rounded mb-2"
                    >
                      {scan}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No scans performed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};