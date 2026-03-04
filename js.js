function checkGrade(){

    let grade = document.getElementById("gradeInput").value;
    let result = document.getElementById("result");

    if(grade === ""){
        result.innerHTML = "Please enter a grade!";
        result.style.color = "red";
        return;
    }

    grade = Number(grade);

    //ده عشان ميدخلش درجه اكتر من 100 يا شباب 
    if(grade > 100 || grade < 0){
        result.innerHTML = "Grade must be between 0 and 100. Enter again!";
        result.style.color = "red";
        document.getElementById("gradeInput").value = "";
        document.getElementById("gradeInput").focus();
        return;
    }

    if(grade >= 90){
        result.innerHTML = "Grade: A";
        result.style.color = "green";
    }
    else if(grade >= 80){
        result.innerHTML = "Grade: B";
        result.style.color = "blue";
    }
    else if(grade >= 70){
        result.innerHTML = "Grade: C";
        result.style.color = "orange";
    }
    else{
        result.innerHTML = "Grade: F";
        result.style.color = "red";
    }
}