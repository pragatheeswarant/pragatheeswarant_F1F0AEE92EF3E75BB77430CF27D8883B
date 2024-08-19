//this variable to keep track the selecting rows 
let selectedrow = null;

//this  function handles the add and modify the input data in tables
function display() {

  //get the values from input fields with their ids

  let name = document.getElementById("name").value;
  let dob = document.getElementById("dob").value;
  let address = document.getElementById("address").value;



//call the this function and assign to the age ,compute the age based on given dob
  let age = calculation();

 //declare the empty string to store the input data's
  let result = "";

  //if selectedrow is null,it creates a new row with input data 
  if(selectedrow==null){
  result =
    "<tr class='getvalue'><td class='getname'>" +
    name +
    "</td><td class='datum'>" +
    dob +
    "</td><td class='getaddress'>" +
    address +
    "</td><td class='getage'>" +
    age +
    "</td></tr>";
  }

  //else it is not null,it calls the update function to modify the data's in existing row data
  else {
    update();
  }

  //here append the input data's on the table body 

  document.getElementById("add").innerHTML += result;


//resets the input fields 

  document.getElementById("name").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("address").value = "";

  selected(); // assuming selected row in table after adding new row 

  //return false to defualt form submission behaviour
  return false;
}

// this function calculate the age based on given dob 

function calculation() {

  //get the value from dob input fields 
  const dob = document.getElementById("dob").value;

  //converts the date of birth to a date object and extracts the year &assign to birthday
  let birthday = new Date(dob).getFullYear();

  //get the current year using date object and storing it in the current year
  let currentyear = new Date().getFullYear();

  //return the difference between the birthday and currentyear
  return currentyear - birthday;
}

//it keep track of the sorting order 
let ascending = true;

//this function sorts the table based on the specified columns  with parameter 'n'.
function sorting(n) {

  //get all row values by table row id and it store into the array 
  let values = document.getElementsByClassName("getvalue");
  let array = [];

  //this loops copies the each data in the array 
  for (let i = 0; i < values.length; i++) {
    array[i] = values[i];
  }

  //this loops read the entire data on the array 
  //runs through the array multiple times, each time reducing the range of comparison 

  for (let i = 0; i < array.length; i++) {

    //Compares sequence rows in the current unsorted section of the array.

    for (let j = 0; j < array.length - 1 - i; j++) {
      //extracts the values for comparison from the row elements
      let namea = array[j].getElementsByClassName("getname")[0].textContent;
      let nameb = array[j + 1].getElementsByClassName("getname")[0].textContent;
      let date1 = new Date(array[j].getElementsByClassName("datum")[0].innerText).getTime();
      let date2 = new Date(array[j + 1].getElementsByClassName("datum")[0].innerText).getTime();
      let age1 = parseInt(array[j].getElementsByClassName("getage")[0].innerText);
      let age2 = parseInt(array[j + 1].getElementsByClassName("getage")[0].innerText);
      let address1 =array[j].getElementsByClassName("getaddress")[0].textContent;
      let address2 =array[j + 1].getElementsByClassName("getaddress")[0].textContent;
        
        //depending on the column specified (n), the values are compared. 
        //if they are in the wrong order based on the ascending flag, the rows are swapped.

      if (
        (n === "name" && ascending && namea > nameb) ||
        (n === "name" && !ascending && namea < nameb)
      ) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else if (
        (n === "date" && ascending && date1 > date2) ||
        (n === "date" && !ascending && date1 < date2)
      ) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else if (
        (n === "address" && ascending && address1 > address2) ||
        (n === "address" && !ascending && address1 < address2)
      ) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else if (
        (n === "age" && ascending && age1 > age2) ||
        (n === "age" && !ascending && age1 < age2)
      ) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
       
      }
    }
  }

    //clears the table and appends the sorted row a table
  let table = document.getElementById("add");
  table.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    table.innerHTML += array[i].outerHTML;
    
  }

  //get the arrow by id to updates the arrow indication when ascending and descending order 
  let arrown = document.getElementById("namearrow");
  let arrowd = document.getElementById("datearrow");
  let arrowad = document.getElementById("addressarrow");
  let arrowag = document.getElementById("agearrow");

   //depending on the column specified (n), the arrow will be indicating up and down 
  if (ascending) {
    if (n == 'name') {
      arrown.innerHTML = "&uparrow;";
    }
    if (n == 'date') {
      arrowd.innerHTML = "&uparrow;";
    }
    if (n == 'address') {
      arrowad.innerHTML = "&uparrow;";
    }
    if (n == 'age') {
      arrowag.innerHTML = "&uparrow;";
    }
  } else {
    if (n == 'name') {
      arrown.innerHTML = "&downarrow;";
    }
    if (n == 'date') {
      arrowd.innerHTML = "&downarrow;";
    }
    if (n == 'address') {
      arrowad.innerHTML = "&downarrow;";
    }
    if (n == 'age') {
      arrowag.innerHTML = "&downarrow;";
    }
  }

  //its used to select the row to update even after the sorting the data's
  selected();

  //swtiching between ascending and descending order for the next sort operation.
  ascending = !ascending;
}

//it is allow to select row from the table and append to the input field with the data from the row
function selected() {

  //get the table and row  to select 
  let table = document.getElementById("display");
  let rows = table.getElementsByTagName("tr");

  //loops through each row  (started from second row ,1st row assuming the table header)
  for (let i = 1; i < rows.length; i++) {

   //add onclick event on each row 
    rows[i].onclick = function () {

      //get the data from the cells of table data of clicked row and it assign to data variable
      let data = rows[i].getElementsByTagName("td");

      //populate the clicked row data on their input fields 
      document.getElementById("name").value = data[0].innerHTML;
      document.getElementById("dob").value = data[1].innerHTML;
      document.getElementById("address").value = data[2].innerHTML;

      //sets selectedrow to the clicked row to modify the data
      selectedrow = rows[i];
    };
  }
}

function update() {

 //get the values from the input fields with their ids and function
  let name = document.getElementById("name").value;
  let dob = document.getElementById("dob").value;
  let address = document.getElementById("address").value;
  let age = calculation();

  //update the cells of the selectedrow with the new values from the input fields
  selectedrow.cells[0].innerHTML = name;
  selectedrow.cells[1].innerHTML = dob;
  selectedrow.cells[2].innerHTML = address;
  selectedrow.cells[3].innerHTML = age;

  //resets the input fields 
  document.getElementById("name").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("address").value = "";

  //sets selectedrow to null for inicating the no row is selected.
  selectedrow = null;
}

function deleted() {
  //if selectedrow is not equal to null,
  //if it isn’t, it means a row is selected and the function proceeds to delete it.

  if (selectedrow !== null) 
    {
      // //get the table and row  to delete
      let table = document.getElementById("display");
      let rows = table.getElementsByTagName("tr");

      //loop starts from 1 to skip the header row and iterates through each row of the table.
      for (let i = 1; i < rows.length; i++) 
        {

        //  it checks if the current row  is the same as selectedrow.
          // if it is, the row is deleted using table.deleteRow(i) and the loop breaks.
        if (rows[i] === selectedrow) 
           {
            //i denotes index of current row
          table.deleteRow(i); 
          //then the  break statement exits the loop once the row is deleted
          break;
           }
        }

      //clear the input fields 
      document.getElementById("name").value = "";
      document.getElementById("dob").value = "";
      document.getElementById("address").value = "";
     //this hides the confirmation delete button after deleting the row
      document.querySelector('.delete_1').style.display = 'none';
     //reset the selectedrow
      selectedrow = null;
    } 
  } 


function showalert() 
        {
   if (selectedrow ==null){
  document.querySelector ('.delete_1').style.display= 'none';
  alert("please select the row");
  
   }

   else{
    document.querySelector('.delete_1').style.display = 'block';
   }

}





