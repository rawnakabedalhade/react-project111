import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import "../style/aboutus.css";
import LoopIcon from "@mui/icons-material/Loop";
const AboutUsPage = () => {
  return (
    <div class="containerbg">
      <div id="card">
        <div class="card-inner">
          <div class="card-front">
            <h1>About Us - Card Management</h1>
            <p>
              Welcome to Card Management website, your go-to platform for
              managing and showcasing cards.
            </p>
            <h2>How It Works ?</h2>
            <p>
              At our website, we've simplified the Card Management process...
            </p>
            <p>click on for more details</p>
            <LoopIcon />
          </div>
          <div class="card-back">
            <ol>
              <li>
                Show: Explore the diverse range of cards created by our
                community.
              </li>
              <li>
                Create: Use our intuitive interface to craft your own unique
                cards.
              </li>
              <li>
                Edit: Fine-tune your cards with ease to match your evolving
                ideas.
              </li>
              <li>
                Delete: Manage your collection by removing cards that no longer
                serve a purpose.
              </li>
              <li>
                Fav: Keep track of your favorite cards for quick access and
                reference.
              </li>
            </ol>
            <h2>Get Started Today</h2>
            <p>
              Join our website and start your journey of creativity and
              organization. Showcase, create, edit, delete, and favorite cards
              effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
