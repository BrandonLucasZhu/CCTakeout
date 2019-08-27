//ES5 JS

//Private: Use to calculate price


var foodValueController = (function(){ 

    var id, name, price, size, description;
    
    
    
    //Constructor for food fields
    var foodSpecs = function(id, name, price, size, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.size = size;
        this.description = description;
    };

    return {
        
    };
    
})();

//UI CONTROLLER: Private
var UIController = (function(){
    
    var DOMstrings = {
        initmenu:"menu--title",
        searchCategory:"#entire--category"
    };
    
    var categories = ["Combination Plates", "Dinners", "Specialities", "SeaFood", "Sweet and Sour", "Chow Mein/Chop Suey", "Chicken", "Egg Foo Young", "Vegetable Dishes", "Beef and Pork", "Fried Rice", "Side Orders", "Soups", "Appetizers"];
    
    var idCategories = ["combinationPlates", "familyDinners", "specialities", "seaFood", "sweetAndSour", "chowMein", "chicken", "eggFooYoung", "vegDishes", "beefPork", "friedRice", "sideOrders", "soups", "appetizers"];
    
    var elementStore = '<div class="container"><a class="menu-links" href=""><div class="row grad-links-buttons">                                                                                            <div id="food-id" class="col-md-8"><p>%name%</p></div>                                              <div id="food-id2" class="col-md-1"><p>%price%</p></div><div  class="col-md-1"></div><div id="food-id2" class="col-md-1">%2ndPrice%</div>                                                    </div></a><div class="row"><div class="col-md-12"><p>%description%</p></div></div></div>';
            
    var subCategoryHeading = '<div id="%idCate%" class="row"><h3 class="center">%categoryHeading%</h3></div>';
   
    var request = new XMLHttpRequest();    
        
    var initLoaded = false;
    
    
    return {
         
        //Display the entire menu initially
        initMenus: function() {
            
            
            for (var k = 0; k < categories.length; k++) {
                //Add subheadings after all the foods have been appended in that section
                var categoryHeading = subCategoryHeading.replace("%categoryHeading%", categories[k]);
                categoryHeading = categoryHeading.replace("%idCate%", idCategories[k]);
                document.getElementById(DOMstrings.initmenu).insertAdjacentHTML('afterend', categoryHeading);  
            }
            
            for (var i = 0; i < reverseKeys.length; i++) {
                for (var j = 0; j < menuJSON[reverseKeys[i]].length; j++) {
                    //Add name of the dish
                    var newElement = elementStore.replace("%name%", JSON.stringify(menuJSON[reverseKeys[i]][j]["name"]).replace(/^"(.*)"$/, '$1')); //Remove quotation marks in key
                    
                    if (Array.isArray(menuJSON[reverseKeys[i]][j]["price"])){
                    
                        //Add the price of the dish
                        newElement = newElement.replace("%price%","$"+menuJSON[reverseKeys[i]][j]["price"][0].toFixed(2));  
                        newElement = newElement.replace("%2ndPrice%","$"+menuJSON[reverseKeys[i]][j]["price"][1].toFixed(2));
                    }
                    else {
                        newElement = newElement.replace("%2ndPrice%","$"+menuJSON[reverseKeys[i]][j]["price"].toFixed(2));
                        newElement = newElement.replace("%price%","");
                    }
                    
                    //Check if description is apparent in JSON property
                    if (menuJSON[reverseKeys[i]][j].hasOwnProperty("description")){
                        newElement = newElement.replace("%description%",JSON.stringify(menuJSON[reverseKeys[i]][j]["description"]).replace(/^"(.*)"$/, '$1'));
                    }
                    else{
                            newElement = newElement.replace("%description%", "");
                    }       
                    //Insert the HTML into the DOM 
                    document.getElementById(idCategories[i]).insertAdjacentHTML('beforeend', newElement);
                }
            }
            initLoaded = true;
        },
        
        //Adjust menu size according to the event trigger
        clickSearchCategory: function (pressedCategory) {
           var categoryHeading, headingDisplayed, headingID, subMenu;
           
           request.open("GET", "http://localhost:3000/db", false);
           request.send(null)
           var menuJSON = JSON.parse(request.responseText);
           var reverseKeys = Object.keys(menuJSON).reverse();
        
           if (pressedCategory === "all"){
               if (initLoaded === false){
                    for (var i = 0; i < idCategories.length; i++){
                       // remove all subheadings other than the one being selected
                        if (document.getElementById(idCategories[i]).firstChild !== null) {      
                            document.getElementById(idCategories[i]).removeChild(document.getElementById(idCategories[i]).firstChild);
                        }
                        document.getElementById(idCategories[i]).innerHTML = "";
                    }
                   
                    UIController.initMenus();
               }
               
           }
           else{
               initLoaded = false;
               for (var i = 0; i < idCategories.length; i++){
                       // remove all subheadings other than the one being selected
                    if (document.getElementById(idCategories[i]).firstChild !== null) {      
                        document.getElementById(idCategories[i]).removeChild(document.getElementById(idCategories[i]).firstChild);

                    }
                    document.getElementById(idCategories[i]).innerHTML = "";

                    if (idCategories[i] === pressedCategory) {
                        headingDisplayed = categories[i];
                        headingID = idCategories[i];
                        subMenu = menuJSON[pressedCategory];

                        //Only show one heading
                        if (document.getElementById(idCategories[i]) !== null && idCategories[i] !== pressedCategory){
                            //Just replace the div element if it exists already
                            document.getElementById(idCategories[i]).replace("%categoryHeading%", headingDisplayed);
                            document.getElementById(idCategories[i]).replace("%idCate%", headingID);
                        }
                        else{
                            categoryHeading = subCategoryHeading.replace("%categoryHeading%", headingDisplayed);
                            categoryHeading = categoryHeading.replace("%idCate%", headingID);
                        }
                    }
                }

                document.getElementById(DOMstrings.initmenu).insertAdjacentHTML('afterend', categoryHeading);  

                for (var j = 0; j < subMenu.length; j++ ) {

                    var newElement = elementStore.replace("%name%", JSON.stringify(subMenu[j]["name"]).replace(/^"(.*)"$/, '$1')); //Remove quotation marks in key

                    if (Array.isArray(subMenu[j]["price"])){
                            //Add the price of the dish
                            newElement = newElement.replace("%price%","$"+subMenu[j]["price"][0].toFixed(2));  
                            newElement = newElement.replace("%2ndPrice%","$"+subMenu[j]["price"][1].toFixed(2));
                        }
                        else {
                            newElement = newElement.replace("%2ndPrice%","$"+subMenu[j]["price"].toFixed(2));
                            newElement = newElement.replace("%price%","");
                        }
                    //Check if description is apparent in JSON property
                    if (subMenu[j].hasOwnProperty("description")){
                        newElement = newElement.replace("%description%",JSON.stringify(subMenu[j]["description"]).replace(/^"(.*)"$/, '$1'));
                    }
                    else{
                        newElement = newElement.replace("%description%", "");
                    }
                    //Insert the HTML into the DOM 
                    document.getElementById(pressedCategory).insertAdjacentHTML('beforeend', newElement);
                }
           }
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        
        }
            
    }; 
})();



//Main global controller private
var controller = (function(foodValueCtrl, UICtrl){
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
    
        document.querySelector(DOM.searchCategory).addEventListener("click", ctrlFindCategory);
    };
    
    //Gets the event from "Search by category" a minimizes menu based on the button event clicked
    var ctrlFindCategory = function(event) {
        //get the element that triggered the event
        var buttonClicked = event.target.value;
        UICtrl.clickSearchCategory(buttonClicked);
    };
    
    
    return {
        
        startMenu: function(){
            UICtrl.initMenus();
            setupEventListeners();
        }
    };
    
})(foodValueController, UIController);

controller.startMenu();