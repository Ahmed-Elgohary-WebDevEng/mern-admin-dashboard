import User from "../../models/User.model.js";
import countryCodes from "country-list";
import getCountryIso3 from "country-iso-2-to-3";

const GeographyController = {
  getGeography: async (req, res) => {
    try {
      const users = await User.find().select("country");

      console.log(users)

      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryIso3(country);

        if (countryISO3 !== "undefined") {
          if (!acc[countryISO3]) {
            acc[countryISO3] = 0;
          }
          acc[countryISO3]++;
          return acc;
        }
      }, {});

      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );

      res.status(200).json(formattedLocations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

export default GeographyController;
