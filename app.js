const firebaseConfig = {
    apiKey: "AIzaSyCNlMgMBU2_3DvaNCzRFYdTi7NwuxjHx18",
    authDomain: "firstproject-11f63.firebaseapp.com",
    databaseURL: "https://firstproject-11f63-default-rtdb.firebaseio.com",
    projectId: "firstproject-11f63",
    storageBucket: "firstproject-11f63.appspot.com",
    messagingSenderId: "343476204263",
    appId: "1:343476204263:web:d658c5d1634abba897a842",
    measurementId: "G-SEC93TPLRK"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var studentOBJ = {}
    
    show()

    function save(){
        name = document.getElementById("name").value
        rollno = document.getElementById("rollno").value
        phone = document.getElementById("phone").value
        city = document.getElementById("city").value
        pin = document.getElementById("pin").value

        studentOBJ.Name=name
        studentOBJ.RollNo=rollno
        studentOBJ.Phone=phone
        studentOBJ.City=city
        studentOBJ.Pin=pin

        firebase.database().ref('/records/'+ rollno).set(studentOBJ)
        alert("data save")
        clear()
        show()
    }

    function update(){

        name = document.getElementById("name").value
        rollno = document.getElementById("rollno").value
        phone = document.getElementById("phone").value
        city = document.getElementById("city").value
        pin = document.getElementById("pin").value

        studentOBJ.Name=name
        studentOBJ.Phone=phone
        studentOBJ.RollNo=rollno
        studentOBJ.City=city
        studentOBJ.Pin=pin

        firebase.database().ref('/records/'+ rollno).update(studentOBJ);

        alert("Data Updated");
        show()
    }

    function del(){
        name = document.getElementById("name").value;
        
        firebase.database().ref('/records/' + rollno).remove();

        alert("Data Deleted")
        show()
        
    }

    function show(){
        document.getElementById("tbody").innerHTML=""

        firebase.database().ref('/records/').once("value", function (AllRecord){
            AllRecord.forEach(function (snapshot){

                // console.log(snapshot.val().Name)

                addItem(snapshot.val().RollNo,snapshot.val().Name,snapshot.val().Phone,snapshot.val().City,snapshot.val().Pin)
                // console.log(snapshot.val().RollNo,snapshot.val().Name,snapshot.val().Phone,snapshot.val().City,snapshot.val().Pin)


            });
        });
    }

    function addItem(rollno,Name,Phone,City,Pin){
        row = document.createElement("tr")

        cell1=document.createElement("td")
        cell2=document.createElement("td")
        cell3=document.createElement("td")
        cell4=document.createElement("td")
        cell5=document.createElement("td")
        cell6=document.createElement("td")
        cell7=document.createElement("td")

        cell1.innerHTML = rollno
        cell2.innerHTML = Name
        cell3.innerHTML = Phone
        cell4.innerHTML = City
        cell5.innerHTML = Pin

        btnEdit = document.createElement("img")
        btnEdit.setAttribute("src", "image/R.png")
        btnEdit.setAttribute("height","40px")
        btnEdit.setAttribute("width","40px")
        // btnEdit.setAttribute("border","1px")              

        btnEdit.setAttribute("onclick", `editFirebase(this)`)

        cell6.appendChild(btnEdit);

        btndel = document.createElement("img")
        btndel.setAttribute("src", "image/Del.png")
        btndel.setAttribute("height","40px")
        btndel.setAttribute("width","40px")
        // btndel.setAttribute("border","1px")
        btndel.setAttribute("onclick", `delFirebase(this)`)

        cell7.appendChild(btndel)

        row.appendChild(cell1)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)
        row.appendChild(cell5)
        row.appendChild(cell6)
        row.appendChild(cell7)

        document.getElementById("tbody").appendChild(row)
    }

    function editFirebase(select){

        row=select.parentNode.parentNode

        document.getElementById("rollno").value= row.childNodes[0].innerHTML
        document.getElementById("name").value= row.childNodes[1].innerHTML
        document.getElementById("phone").value=row.childNodes[2].innerHTML
        document.getElementById("city").value=row.childNodes[3].innerHTML
        document.getElementById("pin").value=row.childNodes[4].innerHTML

    }

    function delFirebase(select){
        row = select.parentNode.parentNode
        rollno = row.childNodes[0].innerHTML
        firebase.database().ref('/records/'+ rollno).remove()
        show()
    }

    function clear(){
        document.getElementById("name").value=""
        document.getElementById("rollno").value=""
        document.getElementById("phone").value=""
        document.getElementById("city").value=""
        document.getElementById("pin").value=""

    }
