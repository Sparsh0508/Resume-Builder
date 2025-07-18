import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalInfoForm = ({ data, onUpdate, onNext }) => {
  const [formData, setFormData] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    address: data?.address || '',
    city: data?.city || '',
    state: data?.state || '',
    zipCode: data?.zipCode || '',
    linkedIn: data?.linkedIn || '',
    website: data?.website || '',
    professionalSummary: data?.professionalSummary || '',
    profilePhoto: data?.profilePhoto || null
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            profilePhoto: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            profilePhoto: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
        <p className="text-sm text-text-secondary mt-1">
          Enter your basic contact information and professional details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Profile Photo</label>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {formData.profilePhoto ? (
                <div className="relative">
                  <Image
                    src={formData.profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-lg object-cover border border-border"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full"
                    onClick={() => setFormData(prev => ({ ...prev, profilePhoto: null }))}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center">
                  <Icon name="User" size={32} className="text-muted-foreground" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-text-secondary mb-2">
                  Drag and drop your photo here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={errors.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={errors.lastName}
            required
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            required
          />
        </div>

        {/* Address */}
        <Input
          label="Address"
          type="text"
          placeholder="Enter street address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={errors.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={errors.city}
            required
          />
          <Input
            label="State"
            type="text"
            placeholder="Enter state"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            error={errors.state}
            required
          />
          <Input
            label="ZIP Code"
            type="text"
            placeholder="Enter ZIP code"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            error={errors.zipCode}
            required
          />
        </div>

        {/* Professional Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn Profile"
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={formData.linkedIn}
            onChange={(e) => handleInputChange('linkedIn', e.target.value)}
          />
          <Input
            label="Personal Website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
          />
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Professional Summary</label>
          <textarea
            className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
            value={formData.professionalSummary}
            onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Brief summary of your professional background</span>
            <span>{formData.professionalSummary.length}/500</span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between pt-6 border-t border-border">
          <div></div>
          <Button type="submit" iconName="ArrowRight" iconPosition="right">
            Continue to Experience
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;