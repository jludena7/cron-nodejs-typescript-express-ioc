module.exports = {
  async up(db) {
    const daysAgo = function (days) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - days);
      return daysAgo;
    }

    const collections = [
      {
        email: "demo100@gmail.com",
        name: "Pedro Pica",
        status: true,
        last_date_session: daysAgo(90),
      },
      {
        email: "demo200@gmail.com",
        name: "Homero Simson",
        status: true,
        last_date_session: daysAgo(90),
      },
      {
        email: "demo300@gmail.com",
        name: "Pablo Marmol",
        status: true,
        last_date_session: new Date(),
      }
    ];

    await db.collection('users').insertMany(collections);
  },

  async down(db) {
    return db.collection('users').deleteMany({
      email: { $in: ["demo100@gmail.com", "demo200@gmail.com", "demo300@gmail.com"] }
    });
  }
};
