// Task 1: Created Product Class
class Product {
    constructor(name, id, price, stock) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.stock = stock;
    }
    getDetails() {
        return `Product: ${this.name}, ID: ${this.id}, Price: ${this.price}, Stock: ${this.stock}`;
    };
    updateStock(quantity) {
        this.stock -= quantity;
    };
    restock(quantity) {
        this.stock += quantity; // Task 5 Edit
    };
}; // Created the product class, pulls the information and updates the item quantity.

const prod1 = new Product("Laptop", 101, 1200, 10);
console.log(prod1.getDetails());
prod1.updateStock(3);
console.log(prod1.getDetails());
// Prints everything to the console.

// Task 2: Created Order Class
class Order {
    constructor(orderID, product, quantity) {
        this.orderID = orderID;
        this.product = product;
        this.quantity = quantity;
        this.totalPrice = product.price * quantity;
        this.product.updateStock(quantity);
    }
    getOrderDetails() {
        return `Order ID: ${this.orderID}, Product: ${this.product.name}, Quantity: ${this.quantity}, Total Price: $${this.totalPrice}`;
    };
}; // Created class order which stores order information and logs it to the console.

const order1 = new Order(501, prod1, 2);
console.log(order1.getOrderDetails()); 
// Expected output: "Order ID: 501, Product: Laptop, Quantity: 2, Total Price: $2400"

console.log(prod1.getDetails()); 
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 5" (Stock reduced)

// Task 3: Created Inventory Class
class Inventory {
    constructor() {
        this.products = [];
        this.orders = [];
    }

    addProduct(product) {
        return this.products.push(product);
    }

    listProducts() {
        this.products.forEach(product => console.log(product.getDetails()));
    }
    // Task 4: Implemented Order Management
    placeOrder(orderId, product, quantity) {
        if (product.stock >= quantity) {
            const newOrder = new Order(orderId, product, quantity);
            this.orders.push(newOrder);
        }
    }

    listOrders() {
        this.orders.forEach(order => console.log(order.getOrderDetails()));
    }

    // Task 5: Implemented Product Restocking
    restockProduct(productId, quantity) {
        const product = this.products.find(prod => prod.id === productId);
        if (product) {
            product.restock(quantity);
            return `Replenished Item: ${product.getDetails()}`;
        } else {
            return `Unknown Product`;
        }
    }
} // Searches for a product based on ID and restocks the item quantity.

const inventory = new Inventory();
inventory.addProduct(prod1);
inventory.restockProduct(101, 5);
console.log(prod1.getDetails()); 
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 8"
inventory.addProduct(prod1);
inventory.listProducts();
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 5"
inventory.placeOrder(601, prod1, 2);
inventory.listOrders();
// Expected output: "Order ID: 601, Product: Laptop, Quantity: 2, Total Price: $2400"
console.log(prod1.getDetails());
// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 3"