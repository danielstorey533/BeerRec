import React from "react";

export default class Beers extends React.Component {
  state = {
    isLoading: true,
    beers: [],
    error: null
  };

  fetchbeers() {
    let url = "";
    // Ideally, this checks some props "abvSet" value instead; the search
    // in the NavBar would set true/false dependent on the existence of characters
    // within the search bar.
    if (this.props.abvValue === 0) {
      url = `https://api.punkapi.com/v2/beers/`;
    } else {
      url = `https://api.punkapi.com/v2/beers?abv_gt=${this.props.abvValue}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          beers: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchbeers();
  }

  componentDidUpdate(prevProps) {
    // if the abvValue has changed, make a new API call.
    if (prevProps.abvValue !== this.props.abvValue) {
      this.fetchbeers();
    }
  }

  //A React Fragment is used here as a means of outputting an error if one is caught.
  //It is also used for mapping beers from the API and returning them into div styling.
  render() {
    console.log("beer.js abv state: ", this.props.abvValue);
    const { isLoading, beers, error } = this.state;
    return (
      <React.Fragment>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          beers.map(beer => {
            const { id, name, tagline, description, image_url, abv } = beer;
            return (
              <div key={id} className="col">
                <div className="card1 mb-4 shadow-sm">
                  <hr />
                  <h2>
                    <b>{name}</b>
                  </h2>
                  <h5>
                    <i> {tagline}</i>
                  </h5>
                  <p> {description}</p>
                  <p>
                    <b> {abv}% ABV</b>
                  </p>
                  <img src={image_url} height="120" width="40"></img>

                  <hr />
                </div>
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}
