import React from 'react';
import { Info, X } from 'lucide-react';

export default function PriceSummary({ isOpen, onClose }) {
  const priceData = {
    basePrice: 417911,
    rcTransferPrice: 6000,
    carServicingCharges: 4000,
    totalPrice: 987654,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Price Summary</h2>
          <p className="text-sm text-gray-500">
            Check your complete price breakup
          </p>
        </div>

        {/* Price Details */}
        <div className="bg-gray-100 rounded-lg p-4 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {/* Base Price */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                Base price
              </h3>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ₹{priceData.basePrice.toLocaleString('en-IN')}
            </p>
          </div>

          {/* RC Transfer */}
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                RC transfer price
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Sunnies RC transfer service comes with RTO assistance. Charges include
                Regional Transport Office (RTO) fees, specific to car and transfer
                location.
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ₹{priceData.rcTransferPrice.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Car Servicing */}
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                Car servicing charges
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                One-time fee for pre-sale car maintenance, including oil change, filter
                replacement, brake check, and wheel alignment.
              </p>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ₹{priceData.carServicingCharges.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Total */}
          <div className="bg-gray-200 rounded-lg p-4 sm:p-5 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                Total car price
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                ₹{priceData.totalPrice.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
