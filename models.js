const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'travelWhereDb',
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

class TripList extends Sequelize.Model{ }

TripList.init({
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
  place: Sequelize.STRING,
  address: Sequelize.TEXT,
  travel_date: Sequelize.DATE,
  image_link: Sequelize.TEXT,
},
  {
    sequelize,
    modelName: 'location'
  })

User.hasMany(TripList, { onDelete: 'cascade' });
TripList.belongsTo(User);
TripList.hasMany(Location, { onDelete: 'cascade' })
Location.belongsTo(TripList);

module.exports = {
  User,
  TripList,
  Location,
  sequelize
}