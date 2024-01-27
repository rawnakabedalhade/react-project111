import axios from "axios";
import { useState, useEffect, useContext } from "react";
import userContext from "../../store/userContext";
import normalizeUser from "./normalizeUser";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import userStatusContext from "../../store/userStatusContext";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UsersInfo = () => {
  let { user, SetUser } = useContext(userContext);
  // let { bizStatus, setBizStatus } = useContext(userStatusContext);
  const [bizStatus, setBizStatus] = useState([]);
  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => {
        SetUser(normalizeUser(data));
        const businessStatusArray = data.map((userData) => userData.isBusiness);
        setBizStatus(businessStatusArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [SetUser]);
  const handleDelete = async (id) => {
    console.log("Deleting user with ID:", id);
    let userToFind = user.find((userData) => userData._id === id);
    if (userToFind.isAdmin) {
      toast.error("You can't edit user which is Admin", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    try {
      let { data } = await axios.delete("/users/" + id);
      SetUser((copyOfUsers) => {
        // Find the index of the deleted user
        const deletedUserIndex = copyOfUsers.findIndex(
          (user) => user._id === id
        );
        // Update bizStatus based on the modified copyOfUsers
        setBizStatus((copyOfStatus) => {
          const updatedStatus = [...copyOfStatus];
          updatedStatus.splice(deletedUserIndex, 1); // Remove the status for the deleted user
          return updatedStatus;
        });
        // Return the new copyOfUsers array after deletion
        return copyOfUsers.filter((user) => user._id !== id);
      });

      toast.success("User deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleEdit = async (id, index) => {
    axios
      .patch("/users/" + id)
      .then(({ data }) => {
        console.log(data);
        // Update the business status directly based on the response data
        setBizStatus((prevBizStatus) => {
          const updatedBizStatus = [...prevBizStatus];
          updatedBizStatus[index] = data.isBusiness; // Update the business status at the specified index
          return updatedBizStatus;
        });
        toast.success("User Edit user's status successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <TableBody>
      {user.map((userData, index) => (
        <StyledTableRow key={userData._id}>
          <StyledTableCell component="th" scope="row">
            {userData._id}
          </StyledTableCell>
          <StyledTableCell align="right">
            {userData.name.first + " " + userData.name.last}
          </StyledTableCell>
          <StyledTableCell align="right">
            {userData.isAdmin ? "isAdmin" : "Not-Admin"} ,
            {bizStatus[index] ? "isBusiness" : "Not-Business"}
          </StyledTableCell>
          <StyledTableCell align="right">
            <Button onClick={() => handleDelete(userData._id)}>
              <DeleteIcon sx={{ color: "black" }} />
            </Button>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Button onClick={() => handleEdit(userData._id, index)}>
              <ModeEditIcon sx={{ color: "black" }} />
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
};

export default UsersInfo;
