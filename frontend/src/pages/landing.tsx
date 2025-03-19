import { useNavigate } from "react-router-dom";
import { AppIcon } from "../icons/AppIcon";



export function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center"
      
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* App Icon in Top Left */}
      <div className="absolute top-5 left-5 z-20 flex items-center space-x-2 ">
        <AppIcon />
        <span className="text-white text-2xl font-bold">CerebriX</span>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4"> Your Second Brain</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Store and organize your important YouTube, Twitter, and other crucial links at one place. 
          Access them anytime, effortlessly.
        </p>
      </div>

      {/* Call-to-Action Button */}
      <button
        onClick={() => navigate("/signin")}
        className="absolute bottom-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 z-10"
      >
        Get Started
      </button>
    </div>
  );
}
