import {useCallback, useEffect, useState} from "react";
import orderRepository from "../repository/orderRepository.js";
import dishRepository from "../repository/dishRepository.js";

const useOrder = () => {
    const [order, setOrder] = useState(null);

    // TODO: Implement this.
    const fetchPendingOrder = useCallback(() => {

        orderRepository
            .findPending()
            .then((response) => {
                setOrder(
                    response.data
                );
            })
            .catch((error) => console.log(error));
    }, []);

    // TODO: Implement this.
    const confirmPendingOrder = useCallback(() => {
        orderRepository
            .confirmPendingOrder()
            .then(() => {
                console.log("Successfully added a new product.");
                fetchPendingOrder();
            })
            .catch((error) => console.log(error));
    }, [fetchPendingOrder]);

    // TODO: Implement this.
    const cancelPendingOrder = useCallback(() => {
        orderRepository
            .cancelPendingOrder()
            .then(() => {
                console.log("Successfully added a new product.");
                fetchPendingOrder();
            })
            .catch((error) => console.log(error));
    }, [fetchPendingOrder]);

    useEffect(() => {
        fetchPendingOrder()
    }, [fetchPendingOrder]);

    return {order, fetchPendingOrder, confirmPendingOrder, cancelPendingOrder};
};

export default useOrder;