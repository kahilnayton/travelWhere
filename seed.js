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
    username: "admin",
    password: "admin"
  };

  const { username } = userObj;
  const password_digest = await hashPassword(userObj.password);
  const user = await User.create({
    username,
    password_digest
  });

  const TripList1 = await TripList.create({
    title: "Argentina",
    description: "Go see and hills and maybe drink a bit of wine",
    image_link:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
    travel_date: "12/13/2019"
  });

  const TripList2 = await TripList.create({
    title: "Spain",
    description: "Definitely see some of Buenos Aires and maybe check out some beaches",
    image_link:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png",
    travel_date: "06/13/2020"
  });

  const TripList3 = await TripList.create({
    title: "Chile",
    description: "Go in the winter and spend some time skiing",
    image_link:
      "https://www.worldatlas.com/r/w728-h425-c728x425/upload/04/61/bb/cl-flag-min.jpg",
    travel_date: "12/13/2020"
  });

  const TripList4 = await TripList.create({
    title: "Croatia",
    description: "Eat all the food and swim",
    image_link:
      "https://media.tmicdn.com/catalog/product/cache/393572b8c1f13fa8b2ac03b51a17cd45/f/l/flag-of-croatia-temporary-tattoo_2487.jpg",
    travel_date: "12/13/2023"
  });

  const TripList5 = await TripList.create({
    title: "Australia",
    description: "A place I live to go, lets get wasted mate",
    image_link:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/800px-Flag_of_Australia.svg.png",
    travel_date: "12/13/2040"
  });

  const Location1 = await Location.create({
    place: "Buenos Aires",
    address: "100 Lane st",
    departure_date: "12/14/2019",
    return_date: "12/16/2019",
    image_link:
      "https://www.telegraph.co.uk/content/dam/Travel/Destinations/South%20America/Argentina/Buenos%20Aires/buenos-aires-guide-birdseye.jpg?imwidth=450"
  });

  const Location2 = await Location.create({
    place: "Mar Del plata",
    address: "100 Lane st",
    departure_date: "12/16/2019",
    return_date: "12/17/2019",
    image_link:
      "https://whatyouth.com/wp-content/uploads/2016/04/whatyouth_guide_argentina_photo-1000x664.jpg"
  });

  const Location3 = await Location.create({
    place: "Mendoza",
    address: "Mendoza",
    departure_date: "12/17/2019",
    return_date: "12/20/2019",
    image_link:
      "https://www.tripsavvy.com/thmb/IU4fCCAwQn7618aifBRWSsOoqa0=/3456x2304/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-693410412-5af46c9904d1cf0036383cbc.jpg"
  });

  const Location4 = await Location.create({
    place: "Melbourne",
    address: "100 Tim Ave",
    departure_date: "12/16/2019",
    return_date: "12/17/2019",
    image_link:
      "https://cdn.britannica.com/64/190464-050-B74E1FD9/view-central-business-district-Melbourne-train-station.jpg"
  });

  const Location5 = await Location.create({
    place: "Gympie",
    address: "49 Pile St",
    departure_date: "12/16/2019",
    return_date: "12/17/2020",
    image_link:
      "https://images.trvl-media.com/hotels/10000000/9850000/9849600/9849542/e6e23d04_y.jpg"
  });

  const Location6 = await Location.create({
    place: "Zagreb",
    address: "69 Crotia Lane",
    departure_date: "12/16/2019",
    return_date: "12/17/2019",
    image_link:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Zagreb_%2829255640143%29.jpg/365px-Zagreb_%2829255640143%29.jpg"
  });

  await TripList1.setUser(user);
  await TripList2.setUser(user);
  await TripList3.setUser(user);
  await TripList4.setUser(user);
  await TripList5.setUser(user);
  await Location1.setTriplist(TripList1);
  await Location2.setTriplist(TripList2);
  await Location3.setTriplist(TripList1);
  await Location4.setTriplist(TripList5);
  await Location5.setTriplist(TripList5);
  await Location6.setTriplist(TripList4);
  process.exit();
};

main();
