import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import fromServer from "../CardDetails/normalizeDetails";
import DetailsCardComponent from "../../Components/DetailsCardComponent";
import useDeleteCard from "../../hooks/useDeleteCard";
import useFavoriteCard from "../../hooks/useFavoriteCard";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import loginContext from "../../store/loginContext";

const CardDetails = () => {
  const handleDelete = useDeleteCard();
  const handleFavorite = useFavoriteCard();
  const navigate = useNavigate();
  const { login } = useContext(loginContext);
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
      setCardDetails({
        ...fromServer(data),
        likes: data.likes || [],
      });
    });
  }, [id]);

  console.log(CardDetails);

  let liked = false; // Initialize 'liked' as false by default

  if (CardDetails.likes && CardDetails.likes.find((id) => id === login._id)) {
    liked = true;
  }

  const handleDeleteCard = (id) => {
    handleDelete(id);
  };
  const handleEditeCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handlePhoneCard = (phone) => {
    console.log("father:Phone Card", phone);
  };
  const handleFavoriteCard = (id) => {};
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
      liked={liked}
      onDelete={handleDeleteCard}
      onEdit={handleEditeCard}
      onPhone={handlePhoneCard}
      onFavorite={handleFavoriteCard}
    />
  );
};

export default CardDetails;
