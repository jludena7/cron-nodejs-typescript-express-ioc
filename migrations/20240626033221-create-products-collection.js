module.exports = {
  async up(db) {
    const collections = [
      {
        sku: "PR1000001",
        name: "Zapatillas Rex M32",
        price: "100.00",
        stock: 50,
      },
      {
        sku: "PR1000002",
        name: "Zapatillas Yuki M32",
        price: "120.00",
        stock: 11,
      },
      {
        sku: "PR1000003",
        name: "Zapatillas Gix M32",
        price: "110.00",
        stock: 10,
      }
    ];

    await db.collection('products').insertMany(collections);
  },

  async down(db) {
    return db.collection('products').deleteMany({
      sku: { $in: ["PR1000001", "PR1000002", "PR1000003"] }
    });
  }
};
