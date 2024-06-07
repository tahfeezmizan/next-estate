import React, { useState } from 'react';

const PropertyVerifyStatusModal = ({ property, handleClose }) => {
    const [verificationStatus, setVerificationStatus] = useState(property?.verification_status || '');

    const handleStatusUpdate = () => {
        console.log('Selected Verification Status:', verificationStatus);
        handleClose(); // Call the function to hide the modal
    };

    return (
        <div className="modal-box text-center">
            <h3 className="font-bold text-lg mb-5 border-b pb-4">Property Verify Status!</h3>
            <select
                className="select select-bordered w-full max-w-xs"
                value={verificationStatus}
                onChange={(e) => setVerificationStatus(e.target.value)}
            >
                <option disabled value="">{property?.verification_status}</option>
                <option className='text-lg' value="verified">Verified</option>
                <option className='text-lg' value="rejected">Rejected</option>
            </select>
            <div className="modal-action justify-center">
                <button onClick={handleStatusUpdate} className="btn mr-5 px-8">Confirm</button>
                <form method="dialog">
                    <button onClick={handleClose} className="btn ml-5 px-8">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default PropertyVerifyStatusModal;
