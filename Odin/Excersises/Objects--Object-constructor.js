function Book( title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return title + " by " + author + ", " + pages + ", " + read
    }
}

const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet")

// console.log(theHobbit.info())

// --------------Prototypal inheritance------------------------------------------ //

// 2

let head = {
    glasses: 1
  };
  
  let table = {
    pen: 3,
    __proto__: head
  };
  
  let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table
  };
  
  let pockets = {
    money: 2000,
    __proto__: bed
  };

// alert( pockets.pen ); // 3
// alert( bed.glasses ); // 1
// alert( table.money ); // undefined

// 4

let hamster = {
    stomach: [],
  
    eat(food) {
// assign to this.stomach instead of this.stomach.push
      this.stomach= [food];
    }
  };
  
  let speedy = {
// stomach: []
    __proto__: hamster
  };
  
  let lazy = {
// stomach: []
    __proto__: hamster
  };
  
  // This one found the food
  speedy.eat("apple");
//   alert( speedy.stomach ); // apple
  
  // This one also has it, why? fix please.
//   alert( lazy.stomach ); // apple

  // ----------------------------               ---------------------------- //

