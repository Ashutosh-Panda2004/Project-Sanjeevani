import React from 'react';

const MedicalDetails = ({ handleInputChange, handleFileChange }) => {
  return (
    <div className="space-y-6">
      {/* Emergency Admission Form */}
      <div className="border p-6 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-6">Emergency Admission Form</h2>

        {/* Patient Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
              { id: 'dob', label: 'Date of Birth', type: 'date' },
              { id: 'gender', label: 'Gender', type: 'text', placeholder: 'Enter gender' },
              { id: 'address', label: 'Address', type: 'text', placeholder: 'Enter address' },
              { id: 'phoneNumber', label: 'Phone Number', type: 'text', placeholder: 'Enter phone number' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
                <input
                  type={type}
                  id={id}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'emergencyContactName', label: 'Name', type: 'text', placeholder: 'Enter contact name' },
              { id: 'emergencyContactRelationship', label: 'Relationship to Patient', type: 'text', placeholder: 'Enter relationship' },
              { id: 'emergencyContactPhone', label: 'Phone Number', type: 'text', placeholder: 'Enter contact phone number' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
                <input
                  type={type}
                  id={id}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Details */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Emergency Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'natureOfEmergency', label: 'Nature of Emergency', type: 'text', placeholder: 'Enter nature of emergency' },
              { id: 'symptoms', label: 'Brief Description of Symptoms', type: 'text', placeholder: 'Enter symptoms' },
              { id: 'currentMedications', label: 'Current Medications (if any)', type: 'text', placeholder: 'Enter medications' },
              { id: 'allergies', label: 'Allergies', type: 'text', placeholder: 'Enter allergies' },
              { id: 'medicalConditions', label: 'Previous Medical Conditions', type: 'text', placeholder: 'Enter previous conditions' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
                <input
                  type={type}
                  id={id}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Consent */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Consent</h3>
          <div className="border p-4 rounded-md bg-gray-50">
            <p className="mb-4">I, the undersigned, authorize the hospital to provide emergency medical treatment as deemed necessary.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'consentSignature', label: 'Signature of Patient or Guardian', type: 'text', placeholder: 'Enter signature' },
                { id: 'consentDate', label: 'Date', type: 'date' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
                  <input
                    type={type}
                    id={id}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Insurance Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'insuranceProvider', label: 'Insurance Provider', type: 'text', placeholder: 'Enter insurance provider' },
              { id: 'policyNumber', label: 'Policy Number', type: 'text', placeholder: 'Enter policy number' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
                <input
                  type={type}
                  id={id}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          {/* Insurance Card Upload Form */}
          <div>
            <label htmlFor="insuranceCard" className="block text-gray-700 text-sm font-medium mb-2">Upload Insurance Card</label>
            <input
              type="file"
              id="insuranceCard"
              onChange={handleFileChange}
              className="w-full py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Medical Records */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Medical Records</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="medicalRecords" className="block text-gray-700 text-sm font-medium mb-2">Upload Medical Records</label>
              <input
                type="file"
                id="medicalRecords"
                onChange={handleFileChange}
                className="w-full py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="consentForm" className="block text-gray-700 text-sm font-medium mb-2">Upload Consent Form</label>
              <input
                type="file"
                id="consentForm"
                onChange={handleFileChange}
                className="w-full py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Signature</h3>
          <div>
            <label htmlFor="signature" className="block text-gray-700 text-sm font-medium mb-2">Upload Signature</label>
            <input
              type="file"
              id="signature"
              onChange={handleFileChange}
              className="w-full py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Government-Issued ID */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Government-Issued ID</h3>
          <div>
            <label htmlFor="governmentId" className="block text-gray-700 text-sm font-medium mb-2">Upload Government-Issued ID</label>
            <input
              type="file"
              id="governmentId"
              onChange={handleFileChange}
              className="w-full py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDetails;
