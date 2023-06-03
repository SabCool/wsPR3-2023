let obj = {
    //first_name, last_name ...
    first_name: "Sabine",
    last_name: "Cool",
    addresses: ['street 1', 'address 2', 'address 3'],
    sayHello() {
        console.log("Hello ", this.first_name);
    }
 }
 
 console.log(obj);
 console.log(obj.first_name);
 obj.sayHello();