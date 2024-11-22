// Initialize addresses from localStorage or empty array if none exist
let addresses = JSON.parse(localStorage.getItem('addresses')) || [];

// DOM elements
const addressForm = document.getElementById('addressForm');
const editForm = document.getElementById('editForm');
const addressList = document.getElementById('addressList');
const editModal = document.getElementById('editModal');

// Function to save addresses to localStorage
function saveAddresses() {
    localStorage.setItem('addresses', JSON.stringify(addresses));
}

// Function to show specific section and hide others
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show requested section
    document.getElementById(sectionId).classList.remove('hidden');
}

// Function to display addresses
function displayAddresses() {
    addressList.innerHTML = '';
    addresses.forEach((address, index) => {
        const addressCard = document.createElement('div');
        addressCard.className = 'address-card';
        addressCard.innerHTML = `
            <div class="actions">
                <button class="btn edit" onclick="openEditModal(${index})">Edit</button>
                <button class="btn delete" onclick="deleteAddress(${index})">Delete</button>
            </div>
            <p><strong>Name:</strong> ${address.name}</p>
            <p><strong>Street:</strong> ${address.street}</p>
            <p><strong>City:</strong> ${address.city}</p>
            <p><strong>State:</strong> ${address.state}</p>
            <p><strong>ZIP Code:</strong> ${address.zip}</p>
        `;
        addressList.appendChild(addressCard);
    });
}

// Function to add new address
function addAddress(e) {
    e.preventDefault();

    const newAddress = {
        name: document.getElementById('name').value,
        street: document.getElementById('street').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value
    };

    addresses.push(newAddress);
    saveAddresses();
    
    // Reset form and show success message
    addressForm.reset();
    alert('Address added successfully!');
    showSection('home');
    
    // Update display if view section is visible
    displayAddresses();
}

// Function to delete address
function deleteAddress(index) {
    if (confirm('Are you sure you want to delete this address?')) {
        addresses.splice(index, 1);
        saveAddresses();
        displayAddresses();
    }
}

// Function to open edit modal
function openEditModal(index) {
    const address = addresses[index];
    document.getElementById('editName').value = address.name;
    document.getElementById('editStreet').value = address.street;
    document.getElementById('editCity').value = address.city;
    document.getElementById('editState').value = address.state;
    document.getElementById('editZip').value = address.zip;
    document.getElementById('editIndex').value = index;
    editModal.classList.remove('hidden');
}

// Function to close edit modal
function closeEditModal() {
    editModal.classList.add('hidden');
    editForm.reset();
}

// Function to update address
function updateAddress(e) {
    e.preventDefault();
    
    const index = document.getElementById('editIndex').value;
    const updatedAddress = {
        name: document.getElementById('editName').value,
        street: document.getElementById('editStreet').value,
        city: document.getElementById('editCity').value,
        state: document.getElementById('editState').value,
        zip: document.getElementById('editZip').value
    };

    addresses[index] = updatedAddress;
    saveAddresses();
    displayAddresses();
    closeEditModal();
    alert('Address updated successfully!');
}

// Event listeners
addressForm.addEventListener('submit', addAddress);
editForm.addEventListener('submit', updateAddress);

// Initial display
showSection('home');
displayAddresses();
