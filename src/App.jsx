import React, { Component } from 'react';

class App extends Component {
  state = {
    searchTerm: '',
    results: [],
    loading: false
  }

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch = () => {
    this.setState({ loading: true });
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${this.state.searchTerm}&utf8=&format=json`, {
      headers: { 'Api-User-Agent': 'YOUR_APP_NAME/1.0' }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ results: data.query.search, loading: false });
    })
    .catch(error => {
      console.error(error);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div>
        <h1>Wikipedia Search App</h1>
        <input type="text" onChange={this.handleInputChange} />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.loading ? <div>Loading...</div> : null}
        <ul>
          {this.state.results.map(result => (
            <li key={result.pageid}>
              <a href={`https://en.wikipedia.org/?curid=${result.pageid}`}>{result.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
