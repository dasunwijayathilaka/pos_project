import { CustomerDB, ItemDB, OrderDB } from "../db/database.js";
import ItemModel from "../Model/itemModel.js";
import OrderModel from "../Model/orderModel.js";
import CustomerModel from "../Model/customerModel.js";

let orderTableDb = [];

function populateCustomerDropdown() {
    const customerSelect = document.getElementById("customer1");
    customerSelect.innerHTML = CustomerDB.map(customer => `<option value="${customer.id}">${customer.id}</option>`).join("");
}

function handleCustomerSelection() {
    const customerSelect = document.getElementById("customer1");
    const nameField = document.getElementById("name1");
    const addressField = document.getElementById("address1");

    const selectedCustomerId = customerSelect.value;
    const customer = CustomerDB.find(c => String(c.id) === String(selectedCustomerId));

    if (customer) {
        nameField.value = customer.firstName;
        addressField.value = customer.address;
    } else {
        nameField.value = "";
        addressField.value = "";
    }
}

$("#customer1").on("click", function () {
    handleCustomerSelection();
});

function populateItemDropdown() {
    const itemSelect = document.getElementById("item");
    itemSelect.innerHTML = ItemDB.map(item => `<option value="${item.Itemid}">${item.Itemid}</option>`).join("");
}

function handleItemSelection() {
    const itemSelect = document.getElementById("item");
    const itemName = document.getElementById("itemName1");
    const price = document.getElementById("price1");
    const qty = document.getElementById("qty1");

    const selectedItemId = itemSelect.value;
    const item = ItemDB.find(i => String(i.Itemid) === String(selectedItemId));

    if (item) {
        itemName.value = item.itemName;
        price.value = item.price;
        qty.value = item.qty;
    } else {
        itemName.value = "";
        price.value = "";
        qty.value = "";
    }
}

$("#item").on("click", function () {
    handleItemSelection();
});

function generateOrderId() {
    if (OrderDB.length === 0) return 'O001';
    const lastOrderId = OrderDB[OrderDB.length - 1].orderId;
    const lastIdNum = parseInt(lastOrderId.slice(1), 10);
    return 'O' + String(lastIdNum + 1).padStart(3, '0');
}

document.addEventListener("DOMContentLoaded", function () {
    const orderIdField = document.getElementById("orderID");
    if (orderIdField) {
        orderIdField.value = generateOrderId();
    } else {
        console.error("Order ID field not found");
    }
});

$("#Order").on("click", function () {
    populateCustomerDropdown();
    populateItemDropdown();
});

const orderTable = () => {
    const itemId = $('#item').val();
    const itemName = $('#itemName1').val();
    const price = $('#price1').val();
    const qtyOnHand = $('#qty1').val();
    const orderQty = $('#orderQty').val();
    const total = price * orderQty;

    const orderItem = {
        itemId,
        itemName,
        price,
        qtyOnHand,
        orderQty,
        total
    };
    orderTableDb.push(orderItem);

    $("#OrderTable").empty();
    orderTableDb.forEach(order => {
        let orderData = `<tr>
            <td>${order.itemId}</td>
            <td>${order.itemName}</td>
            <td>${order.price}</td>
            <td>${order.orderQty}</td>
            <td>${order.total}</td>
        </tr>`;
        $("#OrderTable").append(orderData);
    });
}

const clearForm = () => {
    $('#item').val('');
    $('#itemName1').val('');
    $('#qty1').val('');
    $('#orderQty').val('');
    $('#price1').val('');
    $('#orderID').val(generateOrderId());
}

$("#AddItem").on('click', function () {
    orderTable();
    calculateTotal();
    clearForm();
});

function calculateTotal() {
    let total = 0;
    const table = document.getElementById("OrderTable");

    for (let i = 0; i < table.rows.length; i++) {
        const totalCell = table.rows[i].cells[4];
        const cellValue = parseFloat(totalCell.innerText || totalCell.textContent);

        if (!isNaN(cellValue)) {
            total += cellValue;
        }
    }
    document.getElementById("subtotal").textContent = total.toFixed(2);
}

function getSubTotalValue() {
    return parseFloat(document.getElementById("subtotal").textContent);
}

function calculateCashBalance() {
    const currentSubTotal = getSubTotalValue();
    let cash = document.getElementById("cash").value;
    let discount = document.getElementById("discount").value;

    if (isNaN(cash) || isNaN(discount) || isNaN(currentSubTotal)) {
        alert("Please enter valid numbers");
    } else {
        let totalAmount = currentSubTotal - discount;
        let cashBalance = cash - totalAmount;

        document.querySelector("h4 > strong").textContent = totalAmount.toFixed(2);
        document.querySelector("h5 > strong").textContent = cashBalance.toFixed(2);
    }
}

$("#PurchaseItem").on("click", function () {
    calculateCashBalance();
    saveOrder();
});

function saveOrder() {
    const orderIdField = document.getElementById("orderID");
    const customerId = $('#customer1').val();
    const subtotal = getSubTotalValue();
    const discount = $('#discount').val();
    const cash = $('#cash').val();
    const cashBalance = document.querySelector("h5 > strong").textContent;

    if (!orderIdField || !customerId || isNaN(subtotal) || isNaN(discount) || isNaN(cash)) {
        alert("Please fill in all the required fields with valid values");
        return;
    }

    let orderData = {
        orderId: orderIdField.value,
        customerId: customerId,
        subtotal: subtotal,
        discount: discount,
        cash: cash,
        balance: cashBalance,
        orderItems: orderTableDb,
        date: new Date().toLocaleString() // Adding a date property here
    };

    OrderDB.push(orderData);

    const event = new CustomEvent('orderSaved', { detail: orderData });
    document.dispatchEvent(event);

    console.log(orderData);
    console.log(OrderDB);
}
