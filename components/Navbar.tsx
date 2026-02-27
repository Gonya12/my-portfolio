export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        <a href="#home" className="font-bold text-lg tracking-wide">
          Gonzalo<span className="text-[#4682B4]">.</span>
        </a>

        <div className="hidden md:flex gap-6 text-gray-300">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#skills" className="hover:text-white transition">Skills</a>
          <a href="#work" className="hover:text-white transition">Work</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Gonya12"
            target="_blank"
            className="hidden sm:inline-flex border border-gray-700 px-4 py-2 rounded-full text-sm hover:border-white hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href="mailto:Gonya_12@outlook.com"
            className="bg-[#4682B4] text-black font-semibold px-4 py-2 rounded-full text-sm hover:opacity-90 transition"
          >
            Hire me
          </a>
        </div>
      </div>
    </nav>
  );
}