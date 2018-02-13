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
    
    
   
    
    return {
         
        //Display the entire menu initially
        initMenus: function() {
            var request = new XMLHttpRequest();    
            request.open("GET", "http://localhost:3000/db", false);
            request.send(null)
            var menuJSON = JSON.parse(request.responseText);
            var reverseKeys = Object.keys(menuJSON).reverse();
            var elementStore = '<div class="container"><div class="row">                                                                                            <div id="food-id" class="col-md-9"><p>%name%</p></div>                                              <div id="food-id2" class="col-md-1"><p>%price%</p></div><div  class="col-md-1"></div><div id="food-id2" class="col-md-1">%2ndPrice%</div>                                                    </div><div class="row"><div class="col-md-12"><p>%description%</p></div></div></div>';
            
            var subCategoryHeading = '<div id="%idCate%" class="row"><h3 class="center">%categoryHeading%</h3></div>';
            
            
            for (var i = 0; i < reverseKeys.length; i++) {
                for (var j = menuJSON[reverseKeys[i]].length - 1; j >= 0; j--) {
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
                    document.getElementById(DOMstrings.initmenu).insertAdjacentHTML('afterend', newElement);
                }
                
                //Add subheadings after all the foods have been appended in that section
                var categoryHeading = subCategoryHeading.replace("%categoryHeading%", categories[i]);
                categoryHeading = categoryHeading.replace("%idCate%", idCategories[i]);
                document.getElementById(DOMstrings.initmenu).insertAdjacentHTML('afterend', categoryHeading);  
            }
        },
        
        //Adjust menu size according to the event trigger
        clickSearchCategory: function (pressedCategory) {
            
            var element = document.getElementById(DOMstrings.initmenu).childNodes
            //Need to turn nodelist into array
            
            for (var i = 0; i < element.length; i++){
                if (pressedCategory !== categories[i]){
                    //get the element that doesnt match to the button event triggered
                    
                   
                    document.getElementById(DOMstrings.initmenu).removeChild(element);
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
        var searchValue;
        
        //get the element that triggered the event
        searchValue = event.target.value;
        var nodeSearch = event.target;
        console.log(nodeSearch);
        UICtrl.clickSearchCategory(searchValue);
    };
    
    
    return {
        
        startMenu: function(){
            UICtrl.initMenus();
            setupEventListeners();
        }
    };
    
})(foodValueController, UIController);

controller.startMenu();