// Save Customer Ajax JSON
$('#btnItemAdd').on('click', () => {
    console.log("save Item");
    saveItemFormInputs();
});

saveItemFormInputs= () => {
    const code = document.getElementById("txtItemCode0").value;
    const description = document.getElementById("txtDescription0").value;
    const qty = document.getElementById("txtQty0").value;
    const price = document.getElementById("txtUnitPrice0").value;
    console.log(code);
    createSaveObj(code, description, qty, price);
};

createSaveObj = (code,description,qty,price) => {
    const itemData = {
        code,
        description,
        qty,
        price
    };
    const itemDataJson = JSON.stringify(itemData);
    console.log(itemDataJson);
    saveAjaxItemReq(itemDataJson);
};

saveAjaxItemReq = (itemDataJson) => {
    console.log("save now");
    $.ajax({
        url: "http://localhost:8080/Mapping/ItemHandle",
        type: "POST",
        data: itemDataJson,
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: (resp) => {
            console.log(resp);
        },
        error: (e) => {
            console.error(e); // Log the error to the console for more details.
        }
    });
};

// Update Item Ajax JSON
$('#btnItemUpdate').on('click', () => {
    console.log("update item");
    updateItemFromInputs();
});

updateItemFromInputs = () => {
    const code = document.getElementById("txtItemCode0").value;
    const description = document.getElementById("txtDescription0").value;
    const qty = document.getElementById("txtQty0").value;
    const price = document.getElementById("txtUnitPrice0").value;
    console.log(code);
    createUpdateObj(code, description, qty, price); // Call createUpdateObj instead of createSaveObj
};

createUpdateObj = (code, description, qty, price) => {
    const itemDataUpdate = {
        code,
        description,
        qty,
        price
    };
    const updateItemDataJson = JSON.stringify(itemDataUpdate);
    console.log(updateItemDataJson);
    updateAjaxItemReq(updateItemDataJson);
};

updateAjaxItemReq = (updateItemDataJson) => {
    console.log("update now");
    $.ajax({
        url: "http://localhost:8080/Mapping/ItemHandle",
        type: "PUT", // Use "PUT" instead of "DELETE" for updating data
        data: updateItemDataJson,
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: (resp) => {
            console.log(resp);
        },
        error: (e) => {
            console.error(e); // Log the error to the console for more details.
        }
    });
};

// Delete Customer Ajax JSON
$('#btnItemDelete').on('click', () => {
    console.log("delete customer");
    const itemCode = document.getElementById("txtItemCode0").value;
    deleteItem(itemCode);
});

deleteItem = (itemCode) => {
    const itemDataDelete = {
        code: itemCode
    };
    const itemDataDeleteJSON = JSON.stringify(itemDataDelete);
    console.log(itemDataDeleteJSON);
    deleteAjaxItemReq(itemDataDeleteJSON);
};

deleteAjaxItemReq = (itemDataDeleteJson) => {
    console.log("delete now");
    $.ajax({
        url: "http://localhost:8080/Mapping/ItemHandle",
        type: "DELETE",
        data: itemDataDeleteJson,
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: (resp) => {
            console.log(resp);
        },
        error: (e) => {
            console.error(e); // Log the error to the console for more details.
        }
    });
};



// Reg Ex
let codeRegEx = /^I00\d+$/;
let descRegEx = /^[A-z| |0-9]{1,25}$/;
let qtyRegEx = /^[0-9]{1,4}$/;
let priceRegEx = /^\d{1,4}(?:\.\d{0,2})?$/;

$('#txtItemCode0,#txtDescription0,#txtQty0,#txtUnitPrice0').on('keyup', function (event) {
    let input1 = $('#txtItemCode0').val();
    let input2 = $('#txtDescription0').val();
    let input3 = $('#txtQty0').val();
    let input4 = $('#txtUnitPrice0').val();

    if (codeRegEx.test(input1)) {
        $('#txtItemCode0').css('border', '2px solid green');
        $('#lblitemcode').text("");
        if (event.key === "Enter") {
            $('#txtDescription0').focus();
        }
        if (descRegEx.test(input2)) {
            $('#txtDescription0').css('border', '2px solid green');
            $('#lbldescription').text("");
            if (event.key === "Enter") {
                $('#txtQty0').focus();
            }
            if (qtyRegEx.test(input3)) {
                $('#txtQty0').css('border', '2px solid green');
                $('#lblqty').text("");
                if (event.key === "Enter") {
                    $('#txtUnitPrice0').focus();
                }
                if (priceRegEx.test(input4)) {
                    $('#txtUnitPrice0').css('border', '2px solid green');
                    $('#lblprice').text("");
                    enableButton2();
                    if (event.key === "Enter") {
                        $('#btnItemAdd').click();
                        $('#txtItemCode0').focus();
                    }
                } else {
                    $('#txtUnitPrice0').css('border', '2px solid red');
                    $('#lblprice').text("Required field. Pattern:-(100.00 or 100)");
                    $('#lblprice').css('color', 'red');
                    $('#lblprice').css('font-size', '8px');
                    disableButton2();
                }
            } else {
                $('#txtQty0').css('border', '2px solid red');
                $('#lblqty').text("Required field. Maximum 5");
                $('#lblqty').css('color', 'red');
                $('#lblqty').css('font-size', '8px');
                disableButton2();
            }
        } else {
            $('#txtDescription0').css('border', '2px solid red');
            $('#lbldescription').text("Required field. characters and numbers Allowed.");
            $('#lbldescription').css('color', 'red');
            $('#lbldescription').css('font-size', '8px');
            disableButton2();
        }
    } else {
        $('#txtItemCode0').css('border', '2px solid red');
        $('#lblitemcode').text("Required field. Pattern:-(I00-000)");
        $('#lblitemcode').css('color', 'red');
        $('#lblitemcode').css('font-size', '8px');
        disableButton2();
    }
});

function disableButton2() {
    $('#btnItemAdd').attr('disabled', 'disabled');
    $('#btnItemUpdate').attr('disabled', 'disabled');
}

function enableButton2() {
    $('#btnItemAdd').removeAttr('disabled');
    $('#btnItemUpdate').removeAttr('disabled');
}

$('#txtItemCode0,#txtDescription0,#txtQty0,#txtUnitPrice0').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});

function clearItem() {
    $('#txtItemCode0').val("");
    $('#txtDescription0').val("");
    $('#txtQty0').val("");
    $('#txtUnitPrice0').val("");
    disableButton2();
    $('#lblitemcode,#lbldescription,#lblqty,#lblprice').text("");
    $('#lblitemcode,#lbldescription,#lblqty,#lblprice').css('color',"");
    $('#txtItemCode0,#txtDescription0,#txtQty0,#txtUnitPrice0').css('border','');
}