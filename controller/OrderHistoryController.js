import { OrderDB } from "../db/database.js";

export class OrderHistoryController {
    constructor() {
        this.orderTableBody = document.getElementById("orderTableBody");
        this.orderDetailsTableBody = document.getElementById("orderDetailsTableBody");
        this.addEventListeners();
    }

    addEventListeners() {
        // Event listener to show order details when "View Details" button is clicked
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("view-details-btn")) {
                const orderId = event.target.getAttribute("data-order-id");
                this.displayOrderDetails(orderId);
                const orderDetailsModal = new bootstrap.Modal(document.getElementById("orderDetailsModal"));
                orderDetailsModal.show();
            }
        });

        // Listen for the 'orderSaved' event to update the order history
        document.addEventListener('orderSaved', (event) => {
            const savedOrder = event.detail;
            this.addOrderToHistory(savedOrder);
        });
    }

    loadOrderHistory() {
        this.displayOrderHistory();
    }

    displayOrderHistory() {
        this.orderTableBody.innerHTML = "";

        OrderDB.forEach(order => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.customerId}</td>
                <td>${order.subtotal}</td>
                <td>${order.date || new Date().toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-primary btn-sm view-details-btn" data-order-id="${order.orderId}">View Details</button>
                </td>
            `;
            this.orderTableBody.appendChild(row);
        });
    }

    addOrderToHistory(order) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customerId}</td>
            <td>${order.subtotal}</td>
            <td>${order.date || new Date().toLocaleDateString()}</td>
            <td>
                <button class="btn btn-primary btn-sm view-details-btn" data-order-id="${order.orderId}">View Details</button>
            </td>
        `;
        this.orderTableBody.appendChild(row);
    }

    displayOrderDetails(orderId) {
        const order = OrderDB.find(order => order.orderId === orderId);
        this.orderDetailsTableBody.innerHTML = "";

        order.orderItems.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.itemId}</td>
                <td>${item.itemName}</td>
                <td>${item.price}</td>
                <td>${item.orderQty}</td>
                <td>${item.total}</td>
            `;
            this.orderDetailsTableBody.appendChild(row);
        });
    }
}
