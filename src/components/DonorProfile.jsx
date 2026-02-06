import React, { useState, useEffect } from 'react';
import '../styles/DonorProfile.css';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const DonorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch donor profile - using mock ID 1 for demo
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/donors/1`);
        setProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/donors/${profile.id}`, formData);
      setProfile(formData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (_error) {
      console.error('Failed to update profile:', _error);
      alert('Failed to update profile');
    }
  };

  if (loading) return <div className="donor-profile loading">Loading profile...</div>;

  return (
    <div className="donor-profile">
      <div className="profile-container">
        {profile ? (
          <>
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="blood-badge">{profile.bloodGroup}</div>
              </div>
              <div className="profile-title">
                <h2>{profile.name}</h2>
                <p className="status">
                  {profile.available ? (
                    <span className="available">✓ Available for Donation</span>
                  ) : (
                    <span className="unavailable">✗ Not Available</span>
                  )}
                </p>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-card">
                <h3>📋 Personal Information</h3>
                <div className="profile-info">
                  {editing ? (
                    <div className="edit-form">
                      <div className="info-row">
                        <label htmlFor="email">Email:</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="info-row">
                        <label htmlFor="phone">Phone:</label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="info-row">
                        <label htmlFor="city">City:</label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="info-row">
                        <label htmlFor="state">State:</label>
                        <input
                          id="state"
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="info-row">
                        <label htmlFor="pincode">Pincode:</label>
                        <input
                          id="pincode"
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="info-row">
                        <span className="label">Email:</span>
                        <span className="value">{profile.email}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Phone:</span>
                        <span className="value">{profile.phone}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Location:</span>
                        <span className="value">
                          {profile.city}, {profile.state} {profile.pincode}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="profile-card">
                <h3>🩸 Donation History</h3>
                <div className="donation-stats">
                  <div className="stat">
                    <span className="stat-label">Blood Group:</span>
                    <span className="stat-value">{profile.bloodGroup}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Last Donation:</span>
                    <span className="stat-value">
                      {profile.lastDonationDate || 'Never'}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Member Since:</span>
                    <span className="stat-value">{profile.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                {editing ? (
                  <>
                    <button className="btn-save" onClick={handleSave}>
                      ✓ Save Changes
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setEditing(false)}
                    >
                      ✗ Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-edit" onClick={() => setEditing(true)}>
                      ✎ Edit Profile
                    </button>
                    <button className="btn-availability">
                      {profile.available
                        ? '✗ Mark Unavailable'
                        : '✓ Mark Available'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Profile not found. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
