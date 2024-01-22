const dataOfUser = (data) => {
  return {
    first: data.first,
    middle: data.middle,
    last: data.last,

    phone: data.phone,
    email: data.email,
    password: data.password,

    url: data.url,
    alt: data.alt,

    state: data.state,
    country: data.country,
    city: data.city,
    street: data.street,
    houseNumber: data.houseNumber,
    zip: data.zip,
  };
};

export default dataOfUser;
