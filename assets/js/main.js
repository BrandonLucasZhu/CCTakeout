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
    
    
    
    
    
    
   
    
    return {
         
        //Display the entire menu initially
        initMenus: function() {
           var request = new XMLHttpRequest();    
           request.open("GET", "http://localhost:3000/db", false);
           request.send(null)
           var menuJSON = JSON.parse(request.responseText);
            var reverseKeys = Object.keys(menuJSON).reverse();
           var appetizerss = JSON.stringify(menuJSON);
            var i = 0;
            var elementStore = '<div class="row">                                                                                            <div id="food-id" class="col-md-9"><p>%name%</p></div>                                              <div id="food-id2" class="col-md-3"><p>$%price%</p></div>                                       </div>';
            
            
            for (var i = 0; i < reverseKeys.length; i++) {
                for (var j = menuJSON[reverseKeys[i]].length - 1; j >= 0; j--) {
                    //Add name of the dish
                    var newElement = elementStore.replace("%name%", JSON.stringify(menuJSON[reverseKeys[i]][j]["name"]).replace(/^"(.*)"$/, '$1')); //Remove quotation marks in key
                    
                    if (Array.isArray(menuJSON[reverseKeys[i]][j]["price"])){
                    
                    //Add the price of the dish
                    newElement = newElement.replace("%price%", JSON.stringify(menuJSON[reverseKeys[i]][j]["price"][0]) +" $" + JSON.stringify(menuJSON[reverseKeys[i]][j]["price"][1]) );
                    }
                    else {
                        newElement = newElement.replace("%price%", JSON.stringify(menuJSON[reverseKeys[i]][j]["price"]));    
                    }
                        
                        
                    //Insert the HTML into the DOM .insertAdjacentHTML('afterend', "<div><p>hi</p></div>");
                    document.getElementById("menu--title").insertAdjacentHTML('afterend', newElement);
                }
                
            }
            
            
            
            
            
            
        }
        
    }; 
})();



//Main global controller private
var controller = (function(foodValueCtrl, UICtrl){
    
    
    
    
    return {
        
        startMenu: function(){
            UICtrl.initMenus()
        }
    };
    
})(foodValueController, UIController);

controller.startMenu();