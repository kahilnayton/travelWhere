const { User, Location, TripList } = require("./models");
const { hashPassword } = require("./services/auth");
const main = async () => {
  await Location.destroy({
    where: {}
  });
  await TripList.destroy({
    where: {}
  });
  const userObj = {
    username: "root",
    password: "root"
  };

  const { username } = userObj;
  const password_digest = await hashPassword(userObj.password);
  const user = await User.create({
    username,
    password_digest
  });

  const LL1 = await TripList.create({
    title: "Argentina",
    description: "Christmas 2019",
    image_link:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
    travel_date: "12/13/2019"
  });

  const LL2 = await TripList.create({
    title: "Spain",
    description: "Summer 2020",
    image_link:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png",
    travel_date: "06/13/2020"
  });

  const Loc1 = await Location.create({
    place: "Buenos Aires",
    address: "100 Lane st",
    travel_date: "12/14/2019",
    image_link:
      "https://www.telegraph.co.uk/content/dam/Travel/Destinations/South%20America/Argentina/Buenos%20Aires/buenos-aires-guide-birdseye.jpg?imwidth=450"
  });

  const Loc2 = await Location.create({
    place: "Mar Del plata",
    address: "100 Lane st",
    travel_date: "12/15/2019",
    image_link:
      "https://whatyouth.com/wp-content/uploads/2016/04/whatyouth_guide_argentina_photo-1000x664.jpg"
  });

  const Loc3 = await Location.create({
    place: "Mendoza",
    address: "Mendoza",
    travel_date: "12/16/2019",
    image_link:
      "https://www.tripsavvy.com/thmb/IU4fCCAwQn7618aifBRWSsOoqa0=/3456x2304/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-693410412-5af46c9904d1cf0036383cbc.jpg"
  });

  await LL1.setUser(user);
  await LL2.setUser(user);
  await Loc1.setTripList(LL1);
  await Loc2.setTripList(LL2);
  await Loc3.setTripList(LL1);
  process.exit();
};

main();
