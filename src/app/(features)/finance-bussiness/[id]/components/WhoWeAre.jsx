export default function WhoWeAreSection() {
  return (
    <div className="bg-white md:py-10  px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
          Who We Are
        </h2>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
          <p className="text-center md:text-left">
            Headquartered In Dubai's Vibrant Financial Hub, We Are A Premier Financial Advisory Firm Dedicated To Empowering Clients With Innovative, Data-Driven Solutions. Our Global Expertise And Local Knowledge Ensure Your Financial Success.
          </p>

          <p className="text-center md:text-left">
            From Wealth Management To Business Optimization, We Partner With You To Navigate Complexity And Achieve Sustainable Growth.
          </p>
        </div>
      </div>
    </div>
  );
}