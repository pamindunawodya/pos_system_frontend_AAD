// Save Customer Ajax JSON
$('#btnCustomerAdd').on('click', () => {
    console.log("save Customer");
    saveCustomerFromInputs();
});

saveCustomerFromInputs = () => {
    const id = document.getElementById("txtCustomerId0").value;
    const name = document.getElementById("txtCustomerName0").value;
    const address = document.getElementById("txtCustomerAddress0").value;
    const salary = document.getElementById("txtCustomerSalary0").value;
    console.log(id);
    createSaveCustomerObj(id, name, address, salary);
};

createSaveCustomerObj = (id, name, address, salary) => {
    const customerData = {
        id,
        name,
        address,
        salary
    };
    const customerDataJSON = JSON.stringify(customerData);
    console.log(customerDataJSON);
    saveAjaxCustomerReq(customerDataJSON);
};

saveAjaxCustomerReq = (customerDataJSON) => {
    console.log("save now");
    $.ajax({
        url: "http://localhost:8080/Mapping/CustomerHandle",
        type: "POST",
        data: customerDataJSON,
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: (resp) => {
            console.log(resp);
            // Call a function to update the table with the new customer data
            updateTableWithNewCustomer(resp);
        },
        error: (e) => {
            console.error(e); // Log the error to the console for more details.
        }
    });
};

function updateTableWithNewCustomer(newCustomerData) {
    const tableBody = document.getElementById("tblCustomer").getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = newCustomerData.id;
    cell2.innerHTML = newCustomerData.name;
    cell3.innerHTML = newCustomerData.address;
    cell4.innerHTML = newCustomerData.salary;
}

// Update Customer Ajax JSON
$('#btnCustomerUpdate').on('click', () => {
    console.log("update customer");
    updateCustomerFromInputs();
});

updateCustomerFromInputs = () => {
    const id = document.getElementById("txtCustomerId0").value;
    const name = document.getElementById("txtCustomerName0").value;
    const address = document.getElementById("txtCustomerAddress0").value;
    const salary = document.getElementById("txtCustomerSalary0").value;
    console.log(id);
    createUpdateCustomerObj(id, name, address, salary);
};

createUpdateCustomerObj = (id, name, address, salary) => {
    const customerDataUpdate = {
        id,
        name,
        address,
        salary
    };
    const customerDataUpdateJSON = JSON.stringify(customerDataUpdate);
    console.log(customerDataUpdateJSON);
   updateAjaxCustomerReq(customerDataUpdateJSON);
};

updateAjaxCustomerReq = (customerDataUpdateJSON) => {
    console.log("update now");
    $.ajax({
        url: "http://localhost:8080/Mapping/CustomerHandle",
        type: "PUT", // Use "PUT" instead of "DELETE" for updating data
        data: customerDataUpdateJSON,
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
$('#btnCustomerDelete').on('click', () => {
    console.log("delete customer");
    const customerId = document.getElementById("txtCustomerId0").value;
    deleteCustomer(customerId);
});

deleteCustomer = (customerId) => {
    const customerDataDelete = {
        id: customerId
    };
    const customerDataDeleteJSON = JSON.stringify(customerDataDelete);
    console.log(customerDataDeleteJSON);
    deleteAjaxCustomerReq(customerDataDeleteJSON);
};

deleteAjaxCustomerReq= (customerDataDeleteJSON) => {
    console.log("delete now");
    $.ajax({
        url: "http://localhost:8080/Mapping/CustomerHandle",
        type: "DELETE",
        data: customerDataDeleteJSON,
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

$(document).ready(function() {
    // Attach click event to the button
    $('#btnCustomerGetAll').on('click', () => {
        console.log("Get all customers");
        getAllCustomers();
    });
});

function getAllCustomers() {
    // Send the AJAX GET request without any data in the request body
    getAllAjaxCustomerReq();
}

function getAllAjaxCustomerReq() {
    console.log("Load now");
    $.ajax({
        url: "http://localhost:8080/Mapping/CustomerHandle",
        type: "GET",
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: function(resp) {
            console.log(resp);
            // Call a function to add the data to the table
            addDataToTable(resp);
        },
        error: function(e) {
            console.error(e); // Log the error to the console for more details.
        }
    });
}

function addDataToTable(customerData) {
    const tableBody = document.getElementById("tblCustomer").getElementsByTagName('tbody')[0];

    // Clear the table body before adding new data
    tableBody.innerHTML = "<tbody>";

    // Loop through the customer data and add each customer to the table
    customerData.forEach(customer => {
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.innerHTML = customer.id;
        cell2.innerHTML = customer.name;
        cell3.innerHTML = customer.address;
        cell4.innerHTML = customer.salary;
    });
}

// Reg Ex
let cusIdRegEx = /^C00\d+$/;
let cusNameRegEx = /^[A-z| ]{5,20}$/;
let cusAddressRegEx = /^[A-z| |0-9|,]{5,}$/;
let cusSalaryRegEx = /^\d{1,7}(?:\.\d{0,2})?$/;

$('#txtCustomerId0,#txtCustomerName0,#txtCustomerAddress0,#txtCustomerSalary0').on('keyup', function (event) {
    let input1 = $('#txtCustomerId0').val();
    let input2 = $('#txtCustomerName0').val();
    let input3 = $('#txtCustomerAddress0').val();
    let input4 = $('#txtCustomerSalary0').val();

    if (cusIdRegEx.test(input1)) {
        $('#txtCustomerId0').css('border', '2px solid green');
        $('#lblcusid').text("");
        if (event.key === "Enter") {
            $('#txtCustomerName0').focus();
        }
        if (cusNameRegEx.test(input2)) {
            $('#txtCustomerName0').css('border', '2px solid green');
            $('#lblcusname').text("");
            if (event.key === "Enter") {
                $('#txtCustomerAddress0').focus();
            }
            if (cusAddressRegEx.test(input3)) {
                $('#txtCustomerAddress0').css('border', '2px solid green');
                $('#lblcusaddress').text("");
                if (event.key === "Enter") {
                    $('#txtCustomerSalary0').focus();
                }
                if (cusSalaryRegEx.test(input4)) {
                    $('#txtCustomerSalary0').css('border', '2px solid green');
                    $('#lblcussalary').text("");
                    enableButton();
                    if (event.key === "Enter") {
                        $('#btnCustomerAdd').click();
                        $('#txtCustomerId0').focus();
                    }
                } else {
                    $('#txtCustomerSalary0').css('border', '2px solid red');
                    $('#lblcussalary').text("Required field. Pattern:-(100.00 or 100)");
                    $('#lblcussalary').css('color', 'red');
                    $('#lblcussalary').css('font-size', '8px');
                    disableButton();
                }
            } else {
                $('#txtCustomerAddress0').css('border', '2px solid red');
                $('#lblcusaddress').text("Required field. Minimum 5");
                $('#lblcusaddress').css('color', 'red');
                $('#lblcusaddress').css('font-size', '8px');
                disableButton();
            }
        } else {
            $('#txtCustomerName0').css('border', '2px solid red');
            $('#lblcusname').text("Required field. 5 to 20 characters Allowed.");
            $('#lblcusname').css('color', 'red');
            $('#lblcusname').css('font-size', '8px');
            disableButton();
        }
    } else {
        $('#txtCustomerId0').css('border', '2px solid red');
        $('#lblcusid').text("Required field. Pattern:-(C00)");
        $('#lblcusid').css('color', 'red');
        $('#lblcusid').css('font-size', '8px');
        disableButton();
    }
});


$('#txtCustomerId0,#txtCustomerName0,#txtCustomerAddress0,#txtCustomerSalary0').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

function disableButton() {
    $('#btnCustomerAdd').attr('disabled', 'disabled');
    $('#btnCustomerUpdate').attr('disabled', 'disabled');
}

function enableButton() {
    $('#btnCustomerAdd').removeAttr('disabled');
    $('#btnCustomerUpdate').removeAttr('disabled');
}

//Clear Text Fields
function clearCustomer() {
    $('#txtCustomerId0').val("");
    $('#txtCustomerName0').val("");
    $('#txtCustomerAddress0').val("");
    $('#txtCustomerSalary0').val("");
    disableButton();
    $('#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary').text("");
    $('#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary').css('color',"");
    $('#txtCustomerId0,#txtCustomerName0,#txtCustomerAddress0,#txtCustomerSalary0').css('border','');

}