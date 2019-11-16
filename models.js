const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'TravelKit',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

class User extends Sequelize.Model { }

User.init({
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password_digest: Sequelize.STRING
}, {
    sequelize,
  modelName: 'user'
})

class TravelList extends Sequelize.Model{ }

TravelList.init({
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  image_link: Sequelize.TEXT,
  travel_date: Sequelize.DATE
},
  {
    sequelize,
    modelName: 'travelList'
  })
class Location extends Sequelize.Model { }
  
Location.init({
  country: Sequelize.STRING,
  description: Sequelize.TEXT,
  image_link: Sequelize.TEXT,
  location: Sequelize.TEXT,
},
  {
    sequelize,
    modelName: 'location'
  })

User.hasMany(TravelList, { onDelete: 'cascade' });
TravelList.belongsTo(User);
TravelList.hasMany(Location, { onDelete: 'cascade' })
Location.belongsTo(TravelList);

module.exports = {
  User,
  TravelList,
  Location,
  sequelize
}