///////////////////////////////////////////////////////
/*Item Save & Table update*/
//////////////////////////////////////////////////////
import {ItemDB} from "../db/database.js";
import ItemModel from "../Model/itemModel.js";

let selected_item_Index = null;

$("#SaveItem").on("click", function() {
    let Item_Name = $("#itemName").val();
    let Item_Description = $("#itemDescription").val();
    let Item_Price = $("#price").val();
    let Item_Quantity = $("#qty").val();

    console.log()

    /*let itemData = {
        id : ItemDB.length + 1,
        ItemName : Item_Name,
        ItemDescription : Item_Description,
        ItemPrice : Item_Price,
        ItemQuantity : Item_Quantity
    }*/
    let item = new ItemModel(
        ItemDB.length + 1,
        Item_Name,
        Item_Description,
        Item_Quantity,
        Item_Price
    );

    ItemDB.push(item);
    itemTable();
    clearForm();
});

///////////////////////////////////////////////////////
/*Table update*/
//////////////////////////////////////////////////////

const itemTable = () => {
    $("#ItemTable").empty();
    ItemDB.map((item,index) => {
        let Data = `<tr>
            <td>${item.Itemid}</td>
            <td>${item.itemName}</td>
            <td>${item.itemDescription}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
            </tr>`
        $("#ItemTable").append(Data);
    });
}

///////////////////////////////////////////////////////
/*Clear Form*/
//////////////////////////////////////////////////////

const clearForm = () => {
    $('#itemName').val('');
    $('#itemDescription').val('');
    $('#qty').val('');
    $('#price').val('');
}
///////////////////////////////////////////////////////
/*Item Update & Table update*/
//////////////////////////////////////////////////////

$('#item_update_button').on('click', function() {
    let Item_name = $('#itemName').val();
    let Item_description = $('#itemDescription').val();
    let Item_quantity = $('#qty').val();
    let Item_price = $('#price').val();

    if (selected_item_Index !== undefined && selected_item_Index < ItemDB.length){

        let itemData = new ItemModel(
            ItemDB[selected_item_Index].Itemid,
            Item_name,
            Item_description,
            Item_quantity,
            Item_price
        );

        ItemDB[selected_item_Index] = itemData;

        itemTable();
        clearForm();
    } else {
        alert('Please select an item to update');
    }
});

///////////////////////////////////////////////////////
/*Filling the Forms after click the table row*/
//////////////////////////////////////////////////////

$('#ItemTable').on('click','tr', function () {
    let value = $(this).index();

    selected_item_Index = $(this).index();

    let item_obj = ItemDB[value];

    let item_name = item_obj.itemName;
    let item_description = item_obj.itemDescription;
    let item_quantity = item_obj.qty;
    let item_price = item_obj.price;

    $('#itemName').val(item_name);
    $('#itemDescription').val(item_description);
    $('#qty').val(item_quantity);
    $('#price').val(item_price);
});

///////////////////////////////////////////////////////
/*Item Delete*/
//////////////////////////////////////////////////////

$('#item_delete_button').on('click', function() {
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
            ItemDB.splice(selected_item_Index, 1);
            itemTable();
            clearForm();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
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