function validateAndGenerateExcel() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';

    const apiResponse = document.getElementById('apiResponse');
    apiResponse.textContent = '';

    var firstName = document.getElementById("firstName").value
    if (firstName.trim()==null || firstName.trim()==""|| firstName===" ") {
        errorMessage.textContent = 'Please specify your first name';
        return;
    }
    if (!isValidName(firstName)) {
        errorMessage.textContent = 'Name can only have alphabets and spaces';
        return;
    }

    var lastName = document.getElementById("lastName").value
    if (lastName.trim()==null || lastName.trim()==""|| lastName===" ") {
        errorMessage.textContent = 'Please specify your last name';
        return;
    }
    if (!isValidName(lastName)) {
        errorMessage.textContent = 'Name can only have alphabets and spaces';
        return;
    }

    var email = document.getElementById("email").value
    if (email.trim()==null || email.trim()==""|| email===" ") {
        errorMessage.textContent = 'Please specify your email';
        return;
    }
    if (!isValidEmail(email)) {
        errorMessage.textContent = 'Email format is incorrect';
        return;
    }

    var phone = document.getElementById("phone").value
    if (phone.trim()==null || phone.trim()==""|| phone===" ") {
        errorMessage.textContent = 'Please specify your phone number';
        return;
    }
    if(phone.trim().length<10 || phone.trim().length>10) {
        errorMessage.textContent = 'Phone number should be of 10 digits';
        return;
    }
    if (!isValidMobileNumber(phone)) {
        errorMessage.textContent = 'Phone number should contain only digits';
        return;
    }

    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
    };

    $.ajax({
        url: 'http://localhost:8080/ExcelRegistrationBackend/webapi/myresource/generateExcel',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            // Display the response in the UI
            const filePath = response.filePath;
            $('#apiResponse').html("File Generated at " + filePath);
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
        },
        error: function(xhr, status, error) {
            // Handle error
            $('#apiResponse').html('Error: ' + error);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isValidMobileNumber(number) {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(number);
}

function isValidName(name) {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
}
