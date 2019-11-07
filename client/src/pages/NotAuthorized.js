import React from "react";
import { Col, Row, Container } from "../components/Grid";

function NotAuthorized() {
  return (
    <Container fluid>
      <Row>
        <Col size="lg-12">
            <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                <div class="col-md-12 p-lg-12">
                    <h1 class="display-5 font-weight-normal">You do not have access to this feature!</h1>
                    <p class="lead font-weight-normal">To be able to favorite movies or create a list of movies you have seen, you will have to log in.
                                No sign up required, you can authenticate yourself by logging in with your Google or Twitter account.
                    </p>
                    <p class="lead font-weight-normal"><strong>You will then have access to...</strong></p>
                </div>
                <div class="product-device shadow-sm d-none d-md-block"></div>
                <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                <Row>
                    <Col size="lg-4">
                        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        </svg>
                        
                        <h2>Favoriting</h2>
                        <p>Mark movies that are your favorites! This will help us find movies catered to your interests.</p>
                        
                    </Col>
                    <Col size="lg-4">
                        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                        <h2>Watched List</h2>
                        <p>Already seen the movie that was recommended? You can click "Seen it!" so we know not to recommend it to you again. You will also be able to see all the movies you have seen overtime.</p>
                        
                    </Col>
                    <Col size="lg-4">
                        <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
                        <h2>Rejecting</h2>
                        <p>Don't like a particular movie? Well you can click "Reject" on any movie so you wont be recommended to watch it.</p>
                        
                    </Col>
                   
                </Row>
            </div>
        </Col>
      </Row>
      <Row>
     
      </Row>
    </Container>
  );
}

export default NotAuthorized;
