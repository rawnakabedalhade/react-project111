import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import fromServer from "../CardDetails/normalizeDetails";
import DetailsCardComponent from "../../Components/DetailsCardComponent";

const CardDetails = () => {
  let [CardDetails, setCardDetails] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    address: "",
  });
  let { id } = useParams();
  useEffect(() => {
    axios.get("/cards/" + id).then(({ data }) => {
      setCardDetails(fromServer(data));
      console.log(data);
    });
  }, [id]);
  const handleDeleteCard = (id) => {
    console.log("father: card to delete", id);
  };

  const handleEditeCard = (id) => {
    console.log("father:card to Create", id);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = (id) => {
    console.log("father:Favorite Card", id);
  };
  return (
    <DetailsCardComponent
      id={CardDetails._id}
      title={CardDetails.title}
      subtitle={CardDetails.subtitle}
      description={CardDetails.description}
      web={CardDetails.web}
      email={CardDetails.email}
      img={CardDetails.url}
      phone={CardDetails.phone}
      address={CardDetails.address}
      cardNumber={CardDetails.bizNumber}
      onDelete={handleDeleteCard}
      onEdit={handleEditeCard}
      onPhone={handlePhoneCard}
      onFavorite={handleFavoriteCard}
    />
  );
};

export default CardDetails;
