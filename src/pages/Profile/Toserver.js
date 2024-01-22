const Toserver = (data) => {
  return {
    name: {
      first: data.first,
      last: data.last,
    },
    phone: data.phone,
    email: data.email,
    password: data.password,
    image: {
      url: data.url,
    },
    address: {
      country: data.country,
      city: data.city,
      street: data.street,
      houseNumber: data.houseNumber,
    },
  };
};
