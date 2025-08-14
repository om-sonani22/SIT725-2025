const foodItems = [
  { id: 1, name: "Pizza Margherita", description: "A classic Italian pizza topped with fresh tomatoes, mozzarella cheese, and basil leaves." },
  { id: 2, name: "Pasta Carbonara", description: "Creamy pasta made with eggs, Pecorino Romano cheese, pancetta, and black pepper." },
  { id: 3, name: "Lasagna", description: "Layers of pasta sheets, rich meat sauce, béchamel, and cheese baked to perfection." },
  { id: 4, name: "Risotto alla Milanese", description: "Creamy rice dish flavored with saffron and Parmesan cheese, originating from Milan." },
  { id: 5, name: "Tiramisu", description: "A classic Italian dessert with layers of coffee-soaked ladyfingers, mascarpone cream, and cocoa powder." },
];

function getAllFood() {
  return foodItems;
}

module.exports = {
  getAllFood,
};