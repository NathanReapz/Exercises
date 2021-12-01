var form =document.getElementById("myForm");
var formlength=document.getElementById("myForm").elements.length;
var modal = document.getElementById("myModal");
var btn = document.getElementById("addBtn");
var submit = document.getElementsByClassName("submit")[0];
btn.onclick = function() {
    modal.style.display = "block";
  }
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  submit.onclick = function() {
    modal.style.display = "none";
  }

var selectedRow = null

var arr = new Array();
function addData(){
    getData();
    arr.push({
       id: document.getElementById("eid").value,
       name: document.getElementById("ename").value,
       age: document.getElementById("age").value,
    })
    localStorage.setItem("localData",JSON.stringify(arr));
    showData();
}


function getData(){
    var str = localStorage.getItem("localData");
    if(str != null){
    arr=JSON.parse(str);
    }
}
function deleteData(){
    localStorage.clear();
}

function showData(){
    getData();
    var table = document.getElementById("etable");
    var x = table.rows.length;
    while(--x){
        table.deleteRow(x);
    }
    for(i=0;i<arr.length;i++){
       var newRow = table.insertRow();
       cell1 = newRow.insertCell();
       cell1.innerHTML = arr[i].id
       cell2 = newRow.insertCell();
       cell2.innerHTML = arr[i].name;
       cell3 = newRow.insertCell();
       cell3.innerHTML = arr[i].age;
       cell4 = newRow.insertCell();
       cell4.innerHTML = `<button id = "edit" onClick="onEdit(this,${i})">Edit</button>
            <button id = "del" onClick="onDelete(this,${i})">Delete</button>`;
       resetForm();
       }

}

function resetForm() {
    document.getElementById("eid").value = "";
    document.getElementById("ename").value = "";
    document.getElementById("age").value = "";
    selectedRow = null;
}

function onEdit(td,index) {
    modal.style.display = "block";
    selectedRow = td.parentElement.parentElement;
    console.log(selectedRow)
    deleteLocal(index);
    document.getElementById("eid").value = selectedRow.cells[0].innerHTML;
    document.getElementById("ename").value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
     
}

function onDelete(td,index) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("etable").deleteRow(row.rowIndex);
        deleteLocal(index);
        resetForm();
    }
}

function deleteLocal(index){
    var content = localStorage.getItem("localData");
    var tmp = JSON.parse(content);
    localStorage.removeItem("localdata");
    tmp.splice(index, 1);
    localStorage.setItem("localData",JSON.stringify(tmp));
             
}
function validate() {
    isValid = true;
    if (document.getElementById("eid").value == "") {
        isValid = false;
    } 
    else {

    return isValid;
}}

function search(){
    var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("etable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function clearsearch(){
    document.getElementById("search").value = "";
    search();
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("etable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {   
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
