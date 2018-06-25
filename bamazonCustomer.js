var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function(err){
    if (err) throw err;
    displayProducts();
});
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res){
        console.log("-----------------------------------");
        console.log("Welcome to Bamazon.\nThese are the items for sale today:")
        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
          }
        console.log("-----------------------------------");
        orderProducts();
    });
}
function orderProducts(){
    inquirer.prompt([
        {
            type: "input",
            name: "productNumber",
            message: "Please select the number of the product for purchase:"
        },
        {
            type: "input",
            name: "units",
            message: "How many would you like to purchase?"
        }
    ]).then(function(user){
        var product = parseInt(user.productNumber);
        connection.query("SELECT * FROM products WHERE item_id=?", [product], function(err, res){
            var units = parseInt(user.units);
            var price = parseInt(res[0].price);
            if (units > res[0].stock_quantity){
                console.log("-----------------------------------");
                console.log("Sorry, not enough in stock.\nPlease begin selection again.");
                console.log("-----------------------------------");
                displayProducts();
            }
            else {
                console.log("-----------------------------------");
                console.log(
                "Thank you for your purchase of $" + units * price + "." + 
                "\n" + res[0].product_name + " is such a great value!  You're going to love it!" + 
                "\nPlease, continue shopping.");
                console.log("-----------------------------------");
                connection.query("UPDATE products SET stock_quantity=stock_quantity-? WHERE item_id=?",[units, product] ,function(err, res){
                    displayProducts();
                });
            }
        });
    });
}