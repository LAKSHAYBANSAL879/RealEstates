const Property = require('../Models/propertyModel');
const fs = require('fs');
const path = require('path');

const addProperty = async (req, res) => {
  try {
    const photos = req.files.map(file => file.filename);
    const propertyData = { ...req.body, photos };
    const property = new Property(propertyData);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editProperty = async (req, res) => {
  const { id } = req.params;
  try {
    let property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    
    console.log('Files:', req.files);

    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => file.filename);
      property.photos.push(...newPhotos);
    }

    for (const key in req.body) {
      property[key] = req.body[key];
    }

    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.photos.forEach(photo => {
      const filePath = path.join(__dirname, '../property-images', photo);
      fs.unlink(filePath, err => {
        if (err) console.error('Error deleting file:', err);
      });
    });

    res.status(200).json({ message: 'Property removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProperty,
  getProperties,
  getPropertyById,
  editProperty,
  removeProperty,
};
