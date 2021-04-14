import React, { Component } from 'react';
import './index.css';
const classNames = require('classnames');

export default class FootballMatchesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  fetchData = () =>
    fetch(
      `https://jsonmock.hackerrank.com/api/football_competitions?year=${this.state.selectedYear}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year,
    });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.selectedYear !== this.state.selectedYear) {
      this.fetchData();
    }
  }

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li
                className={classNames({
                  'sidebar-item': true,
                  active: this.state.selectedYear === year,
                })}
                onClick={this.onClick(year)}
                key={year}
              >
                <a>{year}</a>
              </li>
            );
          })}
        </ul>

        <section className="content">
          <section>
            {this.state.isLoaded && this.state.items.length > 0 && (
              <div className="total-matches" data-testid="total-matches">
                Total Matches: {this.state.items.length}
              </div>
            )}

            {!this.state.items <= 0 && (
              <ul className="mr-20 matches styled" data-testid="match-list">
                {this.state.items.map((item) => {
                  return (
                    <li className="slide-up-fade-in" key={item.name}>
                      Match{item.name} won by {item.winner}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          {this.state.items.length === 0 && this.state.isLoaded && (
            <div data-testid="no-result" className="slide-up-fade-in no-result">
              No Matches Found
            </div>
          )}
        </section>
      </div>
    );
  }
}
