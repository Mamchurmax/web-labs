import React, {useState} from 'react';
import './EditPermitForm.css';

const EditPermitForm = ({ permit, onSave, onCancel }) => {
    const [location, setLocation] = useState(permit.location);
    const [description, setDescription] = useState(permit.description );
    const [duration, setDuration] = useState(permit.duration);
    const [price, setPrice] = useState(permit.price);

    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const newErrors = {};

        if (!location) {
            newErrors.location = "Name cannot be empty.";
        } else if (/\d/.test(location)) {
            newErrors.location = "Name cannot contain numbers.";
        }

        if (!description) {
            newErrors.description = "Description cannot be empty.";
        }

        if (duration < 0.1 || duration > 100) {
            newErrors.duration = "Duration must be between 0.1 and 100 years.";
        }


        if (price < 0 || price > 10000) {
            newErrors.price = "Price must be between 0 and 10,000.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateInputs()) {
            const updatedPermit = {
                ...permit,
                location: location,
                description,
                duration: parseFloat(duration),
                price: parseFloat(price)
            };

                onSave(updatedPermit);

        }
    };

    return (
        <div className="edit-pet-form">
            <h2>Edit {permit.location}</h2>
            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <span className="error">{errors.location}</span>}
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <span className="error">{errors.description}</span>}
            </label>
            <label>
                Duration:
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseFloat(e.target.value) || 0)}  // Переконайтесь, що це число
                />
                {errors.duration && <span className="error">{errors.duration}</span>}
            </label>
            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}  // Переконайтесь, що це число
                />
                {errors.price && <span className="error">{errors.price}</span>}
            </label>
            <div className="form-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditPermitForm;
