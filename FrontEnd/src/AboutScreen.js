import { Fragment } from "react";
import { Box } from "@mui/material";
import { margin } from "@mui/system";


function AboutScreen() {
 /* const styles = {
    font-family: "Roboto", sans-serif;
    margin: 0;
    padding: 0;
  }
  .intro {
    background-color: #efefef;
  }
  .p-2,
  .link-secondary {
    color: #0d4c92;
    text-decoration: none;
    font-weight: 600;
  }
  .blog-header-logo,
  .text-dark {
    text-decoration: none;
    color: #0d4c92;
    font-weight: 600;
  }
  .display-5,
  .fw-bold,
  .lh-1,
  .mb-3 {
    color: #0d4c92;
  }
  .modal-dialog,
  .modal-content,
  .rounded-4 {
    background-color: #0d4c92;}
  
  
  };*/
  return (    
    <Box sx={{marginTop:-10}}>

<div class="container col-xxl-8 px-8 py-5">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img
            src="2.jpeg"
            class="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>

           <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">
            Become financially stable by using our budget-planner!
          </h1>
          <p class="lead">
            Most people need some way of seeing where their money is going each
            month. A budget can help you feel more in control of your finances
            and make it easier to save money for your goals.Record your daily
            spending with our web-app.
          </p>
        </div>
    </div>
    </div>
    </Box>
  );
}

export default AboutScreen;


