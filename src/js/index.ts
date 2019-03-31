import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

import { ICustomer } from "./ICustomer";

let buttonElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
buttonElement.addEventListener("click", showAllCustomers);
let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

let buttonOneElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getOneButton");
buttonOneElement.addEventListener("click",showOneCustomer);
let outputElement2: HTMLDivElement = <HTMLDivElement>document.getElementById("content2");


let AddCustomerButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddCustomerButton.addEventListener("click",AddACustomer);

let buttonDeleteElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
buttonDeleteElement.addEventListener("click", deleteCustomer);

function showAllCustomers(): void {
    let uri: string = "https://website20190331100223.azurewebsites.net/api/customer/";
    axios.get<ICustomer[]>(uri)
        .then(function (response: AxiosResponse<ICustomer[]>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            // outputHtmlElement.innerHTML = JSON.stringify(response.data);
            let result: string = "<ol>";
            response.data.forEach((customer: ICustomer) => {
                result += "<li>" + customer.id + " " + customer.firstName + " " + customer.lastName + " " + customer.year + "</li>";
            });
            result += "</ol>";
            outputElement.innerHTML = result;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                outputElement.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                outputElement.innerHTML = error.message;
            }
        });
}
function showOneCustomer(): void {
    let id: HTMLInputElement = <HTMLInputElement> document.getElementById("getCustomerID");
    let uri: string = "https://website20190331100223.azurewebsites.net/api/customer/"+id.value;
    axios.get<ICustomer>(uri)
        .then(function (response: AxiosResponse<ICustomer>): void {
            let result: string = "<ol>";
            let customer : ICustomer = <ICustomer>response.data;
            result += "<li>" + customer.id + " " + customer.firstName + " " + customer.lastName + " " + customer.year + "</li>";
            result += "</ol>";
            outputElement2.innerHTML = result;

        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                outputElement2.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                outputElement2.innerHTML = error.message;
            }
        });
}

function AddACustomer(): void {
    let addFirtstNameElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addFirstName");
    let addLasttNameElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addLastName");
    let addYearElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addYear");

    let myFirstName : string = addFirtstNameElement.value;
    let myLastName : string = addLasttNameElement.value;
    let myYear : number = +addYearElement.value;

    let newCar : ICustomer = {id: 0, firstName: myFirstName, lastName: myLastName, year: myYear}
    axios.post<ICustomer>("https://website20190331100223.azurewebsites.net/api/customer",newCar)
        .then(function () {
            showAllCustomers()
        })
        .catch(function (error : AxiosError) : void {
            console.log(error.message)
        })
}

function deleteCustomer(): void {
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let id: string = inputElement.value;
    let uri2: string = "https://website20190331100223.azurewebsites.net/api/customer/" + id;
    axios.delete<ICustomer>(uri2)
        .then(function (response: AxiosResponse<ICustomer>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                output.innerHTML = error.message;
            } else { // something went wrong in the .then block?
                output.innerHTML = error.message;
            }
        });
}