import React, { Component } from 'react';
import { AstronomicalObject, ApiResponse } from '../types';
import './ResultList.css';

interface ResultsProps {
  searchTerm: string;
}

interface ResultsState {
  data: AstronomicalObject[];
  isLoading: boolean;
  error: string | null;
}

class ResultList extends Component<ResultsProps, ResultsState> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    console.log('ResultList mounted');
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      console.log('ResultList updated with new search term');
      this.fetchData(this.props.searchTerm);
    }
  }

  fetchData = async (searchTerm: string) => {
    console.log('Fetching data with search term:', searchTerm);
    this.setState({ isLoading: true, error: null });
    try {
      const query = searchTerm ? `name=${encodeURIComponent(searchTerm)}` : '';
      const url = `https://stapi.co/api/v2/rest/astronomicalObject/search?${query}&pageNumber=0&pageSize=10`;
      console.log('Fetching URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: ApiResponse = await response.json();
      console.log('API Response:', result);

      // Фильтрация на стороне клиента
      const filteredData = result.astronomicalObjects.filter((obj) => {
        const term = searchTerm.toLowerCase();
        const nameMatches = obj.name.toLowerCase().includes(term);
        const typeMatches = obj.astronomicalObjectType
          .toLowerCase()
          .includes(term);

        return nameMatches || typeMatches;
      });

      this.setState({ data: filteredData, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  render() {
    const { data, isLoading, error } = this.state;
    console.log('Rendering data:', data);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <div className="result-list">
        {data.length === 0 ? (
          <div>No results found</div>
        ) : (
          <div className="card-container">
            {data.map((item: AstronomicalObject) => (
              <div key={item.uid} className="card">
                <h3>{item.name}</h3>
                <p>{item.astronomicalObjectType}</p>
                {item.location && (
                  <p>
                    Location: {item.location.name} (UID: {item.location.uid})
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ResultList;
