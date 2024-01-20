import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import fromServer from "../CardDetails/normalizeDetails";
import DetailsCardComponent from "../../Components/DetailsCardComponent";
import useDeleteCard from "../../hooks/useDeleteCard";
import useFavoriteCard from "../../hooks/useFavoriteCard";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const CardDetails = () => {
  const handleDelete = useDeleteCard();
  const handleFavorite = useFavoriteCard();
  const navigate = useNavigate();
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
    handleDelete(id);
  };

  const handleEditeCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = (id) => {
    handleFavorite(id);
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
      liked={CardDetails.liked}
      onDelete={handleDeleteCard}
      onEdit={handleEditeCard}
      onPhone={handlePhoneCard}
      onFavorite={handleFavoriteCard}
    />
  );
};

export default CardDetails;
