///////////////////////////////////////////////////////
/*Customer Save & Table update*/
//////////////////////////////////////////////////////

import CustomerModel from "../Model/customerModel.js";
import {CustomerDB} from "../db/database.js";
import {ItemDB} from "../db/database.js";


let selected_customer_Index = null;

const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;

const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

$("#SaveCustomer").on("click", function() {
    let First_Name = $("#firstName").val();
    let Last_Name = $("#lastName").val();
    let Email = $("#email").val();
    let Phone_Number = $("#mobile").val();
    let Cus_Address = $("#address").val();

    if (First_Name.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "First Name",
            footer: '<a href="#">Fill the First Name</a>'
        });
    }else if (Last_Name.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Last Name",
            footer: '<a href="#">Fill the Last Name</a>'
        });
    }else if (!validEmail(Email)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email",
            footer: '<a href="#">Fill the Email</a>'
        });
    }else if (Phone_Number.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Phone Number",
            footer: '<a href="#">Fill the Phone Number</a>'
        });
    }else if (Cus_Address.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Address",
            footer: '<a href="#">Fill the Address</a>'
        });
    } else {
        let customerData = new CustomerModel(
            CustomerDB.length + 1,
            First_Name,
            Last_Name,
            Email,
            Phone_Number,
            Cus_Address
        );
        CustomerDB.push(customerData);
        Swal.fire({
            title: "Customer is Saved!",
            text: "You clicked the button!",
            icon: "success"
        });
        customerTable();
    }
});

const customerTable = () => {
    $("#CustomerTable").empty();
    CustomerDB.map((item,index) => {
        let Data = `<tr>
            <td>${item.id}</td>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.address}</td>
            <td>${item.mobile}</td>
            </tr>`
        $("#CustomerTable").append(Data);
        clearForm();
    });
}

const clearForm = ()=>{
    $("#firstName").val('');
    $("#lastName").val('');
    $("#email").val('');
    $("#mobile").val('');
    $("#address").val('');
}

/////////////////////////////////////////////////////////////////////////////////
/* Update customer */
/////////////////////////////////////////////////////////////////////////////////

$("#customer_update_button").on("click", function() {
    // Get values from form inputs
    let first_Name = $("#firstName").val();
    let last_Name = $("#lastName").val();
    let cus_Email = $("#email").val();
    let phone_Number = $("#mobile").val();
    let customer_Address = $("#address").val();

    if (selected_customer_Index !== undefined && selected_customer_Index < CustomerDB.length) {

        /*let updatedCustomer = {
            id: CustomerDB[selected_customer_Index].id, // Preserve existing ID
            first_Name: first_Name,
            lastName: last_Name,
            email: cus_Email,
            mobile: phone_Number,
            address: customer_Address
        };*/

        let customerUpdate = new CustomerModel(
            CustomerDB[selected_customer_Index].id,
            first_Name,
            last_Name,
            cus_Email,
            phone_Number,
            customer_Address
        );

        CustomerDB[selected_customer_Index] = customerUpdate;

        customerTable();

        clearForm();

    } else {
        alert("No customer selected for update.");
    }
});

$("#CustomerTable").on("click",'tr', function (){
    let value = $(this).index();

    selected_customer_Index = $(this).index();

    let customer_obj = CustomerDB[value];

    let first_name = customer_obj.firstName;
    let last_name = customer_obj.lastName;
    let phone_number = customer_obj.mobile;
    let email = customer_obj.email;
    let addressCus = customer_obj.address;

    $("#firstName").val(first_name);
    $("#lastName").val(last_name);
    $("#mobile").val(phone_number);
    $("#email").val(email);
    $("#address").val(addressCus);
});

////////////////////////////////////////////////////////////////////////
/*Delete Customer*/
///////////////////////////////////////////////////////////////////////

$("#Customer_delete_button").on("click", function (){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            CustomerDB.splice(selected_customer_Index, 1);
            clearForm();
            customerTable();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });



});











