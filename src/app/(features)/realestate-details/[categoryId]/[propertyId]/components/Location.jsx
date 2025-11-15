import React from 'react'

function Location() {
  return (
    <div>
       <div className="sm:p-6">
      <div className="w-full md:w-1/4 lg:w-2/3 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-3xl sm:text-4xl lg:text-2xl font-bold text-slate-800 mb-8 sm:mb-12">
            Nearby Location
          </h2>

          {/* Embedded Google Map */}
          <div className="rounded-xl overflow-hidden shadow-md h-[400px]">
            <iframe
              src="https://www.google.com/maps?q=Heritage+Lane,+Gulshan+Abad,+Rawalpindi+682001&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Location
