import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotFoundPage = () => {
  return (
    <Container>
      <Typography variant="h1" color="initial">
        Error 404
      </Typography>
      <Typography variant="h3" color="initial">
        Page Not Found
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="initial">
            Oops... The requested URL was not found on this server
          </Typography>
          <Button variant="text" color="primary">
            Click here to return to the home Page
          </Button>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img src="/assets/imgs/brokenrobot.jpg" alt="" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};
export default NotFoundPage;
