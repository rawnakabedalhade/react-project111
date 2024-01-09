import ROUTES from "../routes/ROUTES";

const alwaysLinks = [{ to: ROUTES.ABOUT, children: "About" }];
const loggedInLinks = [{ to: ROUTES.FAVCARDS, children: "FAV CARDS" }];
const bizLinks = [{ to: ROUTES.MYCARDS, children: "MY CARDS" }];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "SIGNUP" },
  { to: ROUTES.LOGIN, children: "LOGIN" },
  ,
];
const adminLinks = [
  { to: ROUTES.MYCARDS, children: "MY CARDS" },
  { to: ROUTES.SANDBOX, children: "SANDBOX" },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks, adminLinks };
