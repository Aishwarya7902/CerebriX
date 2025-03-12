import { useState } from "react";
import { Copy, Check } from "lucide-react"; // Using lucide-react icons for copy feedback

interface ShareURLProps {
  url: string;
}

export function ShareURL({ url }: ShareURLProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg max-w-sm">
      <input
        type="text"
        value={url}
        readOnly
        className="flex-grow px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none"
      />
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );
}
