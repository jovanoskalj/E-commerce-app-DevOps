import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import useRestaurants from "../../../../hooks/useRestaurants.js";

const EditDishDialog = ({open, onClose, onEdit, dish}) => {
    const restaurants = useRestaurants();
    const [formData, setFormData] = useState({
        "name": dish.name,
        "description": dish.description,
        "price": dish.price,
        "quantity": dish.quantity,
        "restaurantId": dish.restaurantId,

    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        onEdit(dish.id, formData);
        setFormData(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}

                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}

                    fullWidth
                    multiline
                    rows={3}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}

                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}

                    type="number"
                    fullWidth
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Restaurant</InputLabel>
                    <Select
                        name="restaurantId"
                        label="Restaurant"
                        value={formData.restaurantId}
                        onChange={handleChange}

                        variant="outlined"
                        className="restaurant-select"
                        MenuProps={{PaperProps: {style: {maxHeight: 100}}}}>
                        {restaurants.map((restaurant) => (
                            <MenuItem
                                key={restaurant.id}
                                value={restaurant.id}
                                className="restaurant-option"
                            >
                                {restaurant.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="warning" className="submit-btn" onClick={handleSubmit}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDishDialog;