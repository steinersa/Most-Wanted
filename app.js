/*
Build all of your functions for displaying and gathering information below (GUI).
*/
let traitSearch;
let gender;


// app is the function called to start the entire application
function app(people){
  let result;
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
     result = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      result = searchByTrait(people);
      // let searchResults = searchResults;
      // console.log(searchResults);
      // return searchResults;
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
  mainMenu(result, people);
  alert(result);
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      // TODO: get person's info
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      findImmediateFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      

      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function findImmediateFamily(person, people){
  let familySearch = promptFor("Do you want to look up this person's immediate family members? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let familyMembers = [];

  people.filter(function(el){
    if(person[0].parents[0] == el.id || person[0].parents[1] == el.id){ 
      familyMembers.push(el.id);
      console.log(familyMembers);
    if(person[0].currentSpouse[0] == el.id){
      familyMembers.push(el.id);
      console.log(familyMembers);
      return true;
    }
    }
    else{
      return false;
    }
    
  });

  switch(familySearch){
    case 'yes':
      // let familyInfo = "Parents: " + person[0].parents + "\n";
      // familyInfo += "Current Spouse: " + person[0].currentSpouse + "\n";
      // alert (familyInfo);
      findImmediateFamily();
      break;
    case 'no':
        app(people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
  mainMenu(result, people);
  alert(result);
}


function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el){
    if(el.firstName === firstName && el.lastName === lastName) {
      console.log(el);
      return el;
    }
  });
}


function searchByTrait(people){
  let filteredPeople;
  traitSearch = promptFor("Please type in a trait to search by. Options include: 'gender', 'eye color', 'height', 'weight', and 'dob'. Type the option you want or 'restart' or 'quit'.", chars);
  switch(traitSearch) {
    case "gender":
    // let genderPeople = searchGender(people);
    filteredPeople = searchGender(people);
    // console.log(genderPeople);
      break;
    case "eyeColor":
    filteredPeople = searchEyeColor(people);
      break;
    case "height":
    filteredPeople = searchHeight(people);
      break;
    case "weight":
    filteredPeople = searchWeight(people);
      break;
    case "dob":
    filteredPeople = searchDob(people);
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people);
  }
  console.log(filteredPeople);
  // searchByTrait(filteredPeople);

  if (filteredPeople.length === 1){
    let person = filteredPeople;
    return person;
  }
  else {
    return searchByTrait(filteredPeople);
  }
}


function searchGender(people){
  let gender = promptFor("Please type male or female.", chars);
  let filteredPeople = people.filter(function(el){
    if(el.gender === gender) {
      return true;
    }
    else{
      return false;
    }
    })
 // console.log(filteredPeople);
 return filteredPeople;
}


function searchEyeColor(people){
  let eyeColor = promptFor("Please type brown, black, hazel, blue, green.", chars);
  let filteredPeople = people.filter(function(el){
    if(el.eyeColor === eyeColor) {
      return true;
    }
    else{
      return false;
    }
  })
  return filteredPeople;
}

function searchHeight(people){
  let height = promptFor("Please enter height.", chars);

  let filteredPeople = people.filter(function(el){
    if(el.height == height) {
      return true;
    }
    else {
      return false;
    }
  })
  return filteredPeople;
}

function searchWeight(people){
  let weight = promptFor("Please enter weight.", chars);

  let filteredPeople = people.filter(function(el){
    if(el.weight == weight) {
      return true;
    }
    else {
      return false;
    }
  })
  return filteredPeople;
}

function searchDob(people){
  let dob = promptFor("Please enter date of birth.", chars);

  let filteredPeople= people.filter(function(el){
    if(el.dob === dob) {
      return true;
    }
    else {
      return false;
    }
  })
  return filteredPeople;
}

  // TODO: What to do with filteredPeople?


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Date of Birth: " + person[0].dob + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}