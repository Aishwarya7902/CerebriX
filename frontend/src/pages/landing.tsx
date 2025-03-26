import { useNavigate } from "react-router-dom";
import { AppIcon } from "../icons/AppIcon";
import { motion } from "framer-motion";

export function Landing() {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-400">
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-purple-500 bg-opacity-20 backdrop-blur-md z-0"></div>

            {/* App Icon */}
            <div className="absolute top-5 left-5 z-20 flex items-center space-x-2">
                <AppIcon />
                <span className="text-white text-3xl font-bold tracking-wide drop-shadow-md">CerebriX</span>
            </div>

            {/* Centered Content */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center text-white px-6"
            >
                <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-lg">
                    Your Second Brain
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4 opacity-90">
                    Store and organize your important YouTube, Twitter, and other crucial links in one place. Access them anytime, effortlessly.
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
                onClick={() => navigate("/signin")}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-10 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 z-10"
            >
                Get Started
            </motion.button>
        </div>
    );
}
