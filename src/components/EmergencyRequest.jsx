import React, { useState } from 'react';
import '../styles/EmergencyRequest.css';
import axios from 'axios';

const EmergencyRequest = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    requiredUnits: '',
    hospitalName: '',
    hospitalLocation: '',
    patientName: '',
    patientAge: '',
    medicalCondition: '',
    urgencyLevel: 'HIGH',
    contactPerson: '',
    contactPhone: '',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/emergency-requests', formData);
      setMessage('🚨 Emergency request created! Donors will be notified.');
      setFormData({
        bloodGroup: '',
        requiredUnits: '',
        hospitalName: '',
        hospitalLocation: '',
        patientName: '',
        patientAge: '',
        medicalCondition: '',
        urgencyLevel: 'HIGH',
        contactPerson: '',
        contactPhone: '',
        additionalInfo: '',
      });
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage('❌ Failed to create request. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="emergency-request">
      <div className="emergency-wrapper">
        <div className="emergency-card">
          <div className="emergency-header">
            <h2>🚨 Emergency Blood Request</h2>
            <p>Save Lives Now</p>
            <div className="pulse-animation"></div>
          </div>

          <form onSubmit={handleSubmit} className="emergency-form">
            {/* Blood Details */}
            <div className="form-section">
              <h3>🩸 Blood Requirements</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group *</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Units Required *</label>
                  <input
                    type="number"
                    name="requiredUnits"
                    value={formData.requiredUnits}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Hospital Details */}
            <div className="form-section">
              <h3>🏥 Hospital Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Hospital Name *</label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="hospitalLocation"
                    value={formData.hospitalLocation}
                    onChange={handleChange}
                    placeholder="Enter hospital location"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="form-section">
              <h3>👤 Patient Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name *</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter age"
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Medical Condition *</label>
                <textarea
                  name="medicalCondition"
                  value={formData.medicalCondition}
                  onChange={handleChange}
                  placeholder="Describe the medical condition"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            {/* Urgency & Contact */}
            <div className="form-section">
              <h3>⚠️ Urgency & Contact</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Urgency Level *</label>
                  <select
                    name="urgencyLevel"
                    value={formData.urgencyLevel}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Name of contact person"
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Contact Phone *</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="form-group full-width">
              <label>Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional details"
                rows="2"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn emergency-btn" disabled={loading}>
              {loading ? '⏳ Sending...' : '🚨 Send Emergency Request'}
            </button>
          </form>

          {message && <div className="message emergency-message">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequest;
