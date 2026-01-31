import React, { useState, useEffect } from 'react';
import DonorService from '../services/DonorService';
import './DonorList.css';

function DonorList() {
    const [donors, setDonors] = useState([]);
    const [searchBloodGroup, setSearchBloodGroup] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingDonor, setEditingDonor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        bloodGroup: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        age: '',
        available: true,
        lastDonationDate: ''
    });

    useEffect(() => {
        loadDonors();
    }, []);

    const loadDonors = () => {
        DonorService.getAllDonors()
            .then(response => {
                setDonors(response.data);
            })
            .catch(error => {
                console.error('Error loading donors:', error);
            });
    };

    const handleSearch = () => {
        if (searchBloodGroup || searchCity) {
            DonorService.searchDonors(searchBloodGroup, searchCity)
                .then(response => {
                    setDonors(response.data);
                })
                .catch(error => {
                    console.error('Error searching donors:', error);
                });
        } else {
            loadDonors();
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingDonor) {
            DonorService.updateDonor(editingDonor.id, formData)
                .then(() => {
                    loadDonors();
                    resetForm();
                    alert('Donor updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating donor:', error);
                    alert('Error updating donor!');
                });
        } else {
            DonorService.createDonor(formData)
                .then(() => {
                    loadDonors();
                    resetForm();
                    alert('Donor added successfully!');
                })
                .catch(error => {
                    console.error('Error creating donor:', error);
                    alert('Error creating donor!');
                });
        }
    };

    const handleEdit = (donor) => {
        setEditingDonor(donor);
        setFormData(donor);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (globalThis.confirm('Are you sure you want to delete this donor?')) {
            DonorService.deleteDonor(id)
                .then(() => {
                    loadDonors();
                    alert('Donor deleted successfully!');
                })
                .catch(error => {
                    console.error('Error deleting donor:', error);
                    alert('Error deleting donor!');
                });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            bloodGroup: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            age: '',
            available: true,
            lastDonationDate: ''
        });
        setEditingDonor(null);
        setShowForm(false);
    };

    return (
        <div className="donor-container">
            <h1>Blood Donor Finder</h1>
            
            {/* Search Section */}
            <div className="search-section">
                <h2>Search Donors</h2>
                <div className="search-controls">
                    <select 
                        value={searchBloodGroup}
                        onChange={(e) => setSearchBloodGroup(e.target.value)}
                        className="search-input"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    
                    <input 
                        type="text"
                        placeholder="Enter city"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="search-input"
                    />
                    
                    <button onClick={handleSearch} className="btn btn-search">Search</button>
                    <button onClick={loadDonors} className="btn btn-reset">Reset</button>
                </div>
            </div>

            {/* Add Donor Button */}
            <button 
                onClick={() => setShowForm(!showForm)} 
                className="btn btn-primary"
            >
                {showForm ? 'Cancel' : 'Add New Donor'}
            </button>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="form-section">
                    <h2>{editingDonor ? 'Edit Donor' : 'Add New Donor'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                            
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                            
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            
                            <input
                                type="date"
                                name="lastDonationDate"
                                placeholder="Last Donation Date"
                                value={formData.lastDonationDate}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleInputChange}
                                />
                                {' '}
                                Available for donation
                            </label>
                        </div>
                        
                        <div className="form-actions">
                            <button type="submit" className="btn btn-success">
                                {editingDonor ? 'Update' : 'Add'} Donor
                            </button>
                            <button type="button" onClick={resetForm} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Donor List */}
            <div className="donor-list">
                <h2>Available Donors ({donors.length})</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Blood Group</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Age</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map(donor => (
                                <tr key={donor.id}>
                                    <td>{donor.name}</td>
                                    <td><span className="blood-group">{donor.bloodGroup}</span></td>
                                    <td>{donor.email}</td>
                                    <td>{donor.phone}</td>
                                    <td>{donor.city}</td>
                                    <td>{donor.state}</td>
                                    <td>{donor.age}</td>
                                    <td>
                                        <span className={`status ${donor.available ? 'available' : 'unavailable'}`}>
                                            {donor.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => handleEdit(donor)} 
                                            className="btn btn-edit"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(donor.id)} 
                                            className="btn btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DonorList;
