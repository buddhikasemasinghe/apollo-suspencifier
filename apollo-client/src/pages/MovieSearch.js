import React from "react";
import { Container, Form, Segment, Input, GridColumn } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { navigate } from "@reach/router";

export const MovieSearch = () => {
  const [searchText, setSearchText] = React.useState("Spiderman");

  return (
    <Container>
      <Grid>
        <GridColumn width={2}></GridColumn>
        <GridColumn width={10}>
          <Segment basic textAlign="center">
            <Form>
              <Input
                action={{
                  color: "green",
                  content: "Search now",
                  onClick: () =>
                    navigate("/movies", { state: { text: searchText } })
                }}
                icon="search"
                iconPosition="left"
                size="massive"
                placeholder="Let's find your favorite movie ...."
                onChange={event => {
                  setSearchText(event.target.value);
                }}
              />
            </Form>
          </Segment>
        </GridColumn>
        <GridColumn width={2}></GridColumn>
      </Grid>
    </Container>
  );
};
