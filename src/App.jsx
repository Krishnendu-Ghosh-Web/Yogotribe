import React, { useState } from "react";
import { FiRefreshCw, FiAlertTriangle } from "react-icons/fi";

function FactFetcher() {
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const fetchRandomFact = async () => {
    setIsLoading(true);
    setError(null);
    setClickCount((prev) => prev + 1);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const response = await fetch("https://catfact.ninja/fact");

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError(err.message || "Failed to fetch fact. Try again?");
      setFact("");
    } finally {
      setIsLoading(false);
    }
  };

  const themes = [
    {
      bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
      btn: "bg-amber-400 hover:bg-amber-500",
    },
    {
      bg: "bg-gradient-to-r from-purple-500 to-pink-500",
      btn: "bg-emerald-400 hover:bg-emerald-500",
    },
    {
      bg: "bg-gradient-to-r from-orange-500 to-red-500",
      btn: "bg-indigo-400 hover:bg-indigo-500",
    },
  ];
  const currentTheme = themes[clickCount % themes.length];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${currentTheme.bg} text-white transition-colors duration-500`}
    >
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden p-8">
        <h1 className="text-3xl font-bold mb-2">Did You Know?</h1>
        <p className="text-white/80 mb-6">
          Click the button to learn something new!
        </p>

        <button
          onClick={fetchRandomFact}
          disabled={isLoading}
          className={`${currentTheme.btn} text-white font-medium py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg w-full`}
        >
          {isLoading ? (
            <>
              <FiRefreshCw className="animate-spin" />
              <span>Fetching...</span>
            </>
          ) : (
            <span>✨ Get Random Fact</span>
          )}
        </button>

        <div className="mt-8 min-h-32">
          {error && (
            <div className="bg-red-100/20 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center gap-2 text-red-100">
                <FiAlertTriangle className="flex-shrink-0" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {fact && !error && (
            <div className="animate-fadeIn">
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">
                  Today's Random Fact:
                </h3>
                <p className="text-lg leading-relaxed">{fact}</p>
              </div>
              <p className="text-white/60 text-sm mt-3">
                Click again for another fact!
              </p>
            </div>
          )}
        </div>

        <footer className="mt-8 text-white/50 text-sm text-center">
          <p>Made with ❤️ by Krishnendu Ghosh</p>
          <p className="text-xs mt-1">Fact source: catfact.ninja</p>
        </footer>
      </div>
    </div>
  );
}

export default FactFetcher;
