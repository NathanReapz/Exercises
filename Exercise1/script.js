// let currentData = [{id:01,name:"nathan",age:21},{id:01,name:"nathan",age:21},
// {id:01,name:"nathan",age:21},{id:01,name:"nathan",age:21}
// ,{id:01,name:"nathan",age:21},{id:01,name:"nathan",age:21}
// ,{id:01,name:"nathan",age:21},{id:01,name:"nathan",age:21}]
var form =document.getElementById("myForm");
let formData= [];
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
submit.addEventListener("click",function(){
      let details = {
        id:document.getElementById("eid").value,
        name:document.getElementById("ename").value,
        age:document.getElementById("age").value
      }
      formData.push(createTable(details));
      localStorage.setItem("myform", JSON.stringify(formData))
      console.log(formData)
     
})

let count =1;
function createTable(details){
let row = document.getElementById("etable").insertRow(count);
      let a = row.insertCell(0);
      let b = row.insertCell(1);
      let c = row.insertCell(2);
      let d = row.insertCell(3);
      var test = JSON.parse(localStorage.getItem("myform"));
      a.innerHTML =details.id;
      b.innerHTML=details.name;
      c.innerHTML=details.age;
      d.innerHTML =`<button type='button' onclick = "del(this)" id="del">
      Delete</button>
<button type='button' onclick ="edit(this)" id="edit">
Edit</button>`
      document.forms[0].reset();
      count++
      return details;
}

function del(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  localStorage.removeItem("myform")
  count--;
  
}

function edit(btn){
  modal.style.display = "block";
  selectedRow = btn.parentElement.parentElement;
  document.getElementById("eid").value = selectedRow.cells[0].innerHTML;
  document.getElementById("ename").value = selectedRow.cells[1].innerHTML;
  document.getElementById("age").value = selectedRow.cells[2].innerHTML;
}


