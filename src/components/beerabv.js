import React from "react";

export default class BeerAbv extends React.Component {
  state = {
    isLoading: true,
    beers: [],
    error: null,
    abvTrue: null
  };
  fetchbeers() {
    fetch(`https://api.punkapi.com/v2/beers?abv_gt=${this.state.abv}`)
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
