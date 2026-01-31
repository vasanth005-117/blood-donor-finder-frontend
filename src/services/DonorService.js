import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/donors';

class DonorService {
    
    // Get all donors
    getAllDonors() {
        return axios.get(API_BASE_URL);
    }
    
    // Get donor by ID
    getDonorById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }
    
    // Create new donor
    createDonor(donor) {
        return axios.post(API_BASE_URL, donor);
    }
    
    // Update donor
    updateDonor(id, donor) {
        return axios.put(`${API_BASE_URL}/${id}`, donor);
    }
    
    // Delete donor
    deleteDonor(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
    
    // Search by blood group
    searchByBloodGroup(bloodGroup) {
        return axios.get(`${API_BASE_URL}/search/bloodgroup/${bloodGroup}`);
    }
    
    // Search by city
    searchByCity(city) {
        return axios.get(`${API_BASE_URL}/search/city/${city}`);
    }
    
    // Search with filters
    searchDonors(bloodGroup, city) {
        let url = `${API_BASE_URL}/search?`;
        if (bloodGroup) url += `bloodGroup=${bloodGroup}&`;
        if (city) url += `city=${city}`;
        return axios.get(url);
    }
    
    // Get available donors
    getAvailableDonors() {
        return axios.get(`${API_BASE_URL}/available`);
    }
    
    // Get available donors by blood group
    getAvailableDonorsByBloodGroup(bloodGroup) {
        return axios.get(`${API_BASE_URL}/available/${bloodGroup}`);
    }
}

export default new DonorService();
