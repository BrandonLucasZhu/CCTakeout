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
           var my_JSON_object = JSON.parse(request.responseText);
           console.log(my_JSON_object.appetizers);
        }
        
    }; 
})();



//Main global controller private
var controller = (function(foodValueCtrl, UICtrl){
    
    
    
    
    return {
        
    };
    
})(foodValueController, UIController);
