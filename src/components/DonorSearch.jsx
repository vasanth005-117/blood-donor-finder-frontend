import React, { useState } from 'react';
import '../styles/DonorSearch.css';
import axios from 'axios';

const DonorSearch = () => {
  const [searchParams, setSearchParams] = useState({
    bloodGroup: '',
    city: '',
  });

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchParams.bloodGroup || !searchParams.city) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.get('http://localhost:8080/api/donors/search', {
        params: searchParams,
      });
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
      setDonors([]);
    }
    setLoading(false);
  };

  return (
    <div className="donor-search">
      <div className="search-container">
        <div className="search-card">
          <h2>🔍 Find Donors</h2>
          <p>Search by blood group and location</p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-inputs">
              <div className="search-group">
                <label htmlFor="search-bloodGroup">Blood Group *</label>
                <select
                  id="search-bloodGroup"
                  name="bloodGroup"
                  value={searchParams.bloodGroup}
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

              <div className="search-group">
                <label htmlFor="search-city">City *</label>
                <input
                  id="search-city"
                  type="text"
                  name="city"
                  value={searchParams.city}
                  onChange={handleChange}
                  placeholder="Enter city name"
                  required
                />
              </div>

              <button type="submit" className="search-btn" disabled={loading}>
                {loading ? '⏳ Searching...' : '🔎 Search'}
              </button>
            </div>
          </form>
        </div>

        {searched && (
          <div className="results-section">
            {loading && <p className="loading">Loading donors...</p>}
            {!loading && donors.length > 0 && (
              <div className="donors-grid">
                {donors.map((donor) => (
                  <div key={donor.id} className="donor-card">
                    <div className="donor-badge">
                      <span className="blood-group">{donor.bloodGroup}</span>
                    </div>
                    <div className="donor-info">
                      <h3>{donor.name}</h3>
                      <p className="donor-city">📍 {donor.city}, {donor.state}</p>
                      <p className="donor-contact">📞 {donor.phone}</p>
                      <p className="donor-email">✉️ {donor.email}</p>
                      {donor.available ? (
                        <button className="contact-btn">✓ Contact Donor</button>
                      ) : (
                        <button className="contact-btn unavailable">
                          ✗ Not Available
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && donors.length === 0 && (
              <p className="no-results">❌ No donors found. Try different criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorSearch;
