import { ArrowRight } from 'lucide-react';

export default function WhoWeAre() {
  return (
    <div className=" px-4 py-16 ">
      <h2 className="text-4xl font-bold text-center text-black mb-12">Who We Are</h2>
      
      <div className="border-2 border-gray-300 rounded-2xl p-8 md:p-12 bg-white">
        <p className="text-lg md:text-xl text-gray-800 mb-6 leading-relaxed">
          We Help People Achieve Their Goals Through Trusted Guidance In Homes, Cars, And Consulting.
        </p>
        
        <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300">
          Know More
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}