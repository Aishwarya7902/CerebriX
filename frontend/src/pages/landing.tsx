import { useNavigate } from "react-router-dom";
import { AppIcon } from "../icons/AppIcon";
import { motion } from "framer-motion";

export function Landing() {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url('https://wallpapercave.com/wp/wp9668204.jpg')`,
            }}
        >
            {/* Neon Glow Overlay */}
            <div className="absolute inset-0 bg-purple-500 bg-opacity-30 backdrop-blur-md z-0"></div>

            {/* App Icon in Top Left */}
            <div className="absolute top-5 left-5 z-20 flex items-center space-x-2">
                <AppIcon />
                <span className="text-white text-3xl font-extrabold tracking-widest glow-text">CerebriX</span>
            </div>

            {/* Centered Content with Motion */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center text-white px-6"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold neon-text mb-4">
                    Your Second Brain
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-glow">
                    Store and organize your important YouTube, Twitter, and other crucial links in one place.
                    Access them anytime, effortlessly.
                </p>
            </motion.div>

            {/* Call-to-Action Button */}
            <motion.button
                onClick={() => navigate("/signin")}
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #00d9ff" }}
                className="absolute bottom-10 bg-pink-400 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 z-10 neon-btn"
            >
                Get Started
            </motion.button>

            {/* Additional Styles */}
            <style>
                {`
          .glow-text {
            text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.9);
          }
          .neon-text {
            text-shadow: 0px 0px 15px #ff00ff, 0px 0px 30px #ff00ff;
          }
          .text-glow {
            text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
          }
          .neon-btn {
            box-shadow: 0px 0px 15px #00d9ff;
          }
        `}
            </style>
        </div>
    );
}
