const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  propertyFor: { type: String, required: true }, 
  propertyType: { type: String},
  specificPropertyType: { type: String },
  buildUpArea: { type: String },
  carpetArea: { type: String },
  propertyAge: { type: String },
  floor: { type: String },
  totalFloors: { type: String },
  facing: { type: String },
  bhk: { type: String },
  toilets: { type: String },
  balconies: { type: String },
  tenantPreference: { type: String },
  availability: { type: String },
  description: { type: String },
  society: { type: String },
  area: { type: String },
  landmark: { type: String },
  city: { type: String },
  state: { type: String },
  nonVeg: { type: String },
  pets: { type: String },
  furnishing: { type: String },
  features: { type: [String] }, 
  amenities: { type: [String] }, 
  rentAmount: { type: String },
  rentDuration: { type: String },
  maintenanceIncluded: { type: Boolean, default: false },
  maintenanceFee: { type: String },
  preferredPaymentMode: { type: String },
  basePrice: { type: String },
  priceWithRegistration: { type: String },
  photos: { type: [String] }, 
}, {
  timestamps: true,
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
