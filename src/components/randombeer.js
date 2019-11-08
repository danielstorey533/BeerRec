import React from "react";

export default class RandomBeer extends React.Component {
  state = {
    isLoading: true,
    beers: [],
    error: null
  };
  fetchbeers() {
    fetch(`https://api.punkapi.com/v2/beers/random`)
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

  render() {
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
                  <p> {abv}% ABV</p>
                  <img src={image_url} height="320" width="100"></img>

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
