import React from "react";

export default class Calendar extends React.Component {
  state = {
    arrays: [],
    month: ""
  };
  chunkArray(array, size) {
    const result = [];
    while (array.length > 0) {
      result.push(array.splice(0, size));
    }
    return result;
  }
  getDays = (year, month) => {
    // 일수
    const days = new Date(year, month, 0).getDate();
    console.log(days);
    let day = new Date(year, month, 1).getDay();
    //day가 0이 아니면 (일요일) 전 달에서 그만큼 가져오기
    let arrays = [...Array(days)].map((value, index) => index + 1);
    if (day !== 0) {
      let days = new Date(year, month, 0).getDate();
      while (day > 0) {
        arrays.unshift({ day: days, month: month });
        day--;
        days--;
      }
    }
    arrays = this.chunkArray(arrays, 7);
    this.setState({
      arrays,
      month: parseInt(month, 10),
      year: parseInt(year, 10)
    });
  };
  componentDidMount() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    this.getDays(year, month);
  }
  week = ["일", "월", "화", "수", "목", "금", "토"];
  render() {
    const { arrays, month, year } = this.state;
    return (
      <div className="container">
        <div className="month">
          <button onClick={e => this.getDays(year, month - 1)}>앞으로</button>
          <button>{month + 1}</button>
          <button onClick={e => this.getDays(year, month + 1)}>뒤로</button>
        </div>
        <div className="day-title">
          <div className="date-row">
            {this.week.map(day => (
              <div className="date-cell">{day}</div>
            ))}
          </div>
        </div>

        {arrays.map(array => (
          <div className="date-row">
            {array.map(
              num =>
                num.month ? (
                  <div className="date-cell last-month ">{num.day}</div>
                ) : (
                  <div className="date-cell">{num}</div>
                )
            )}
          </div>
        ))}
      </div>
    );
  }
}
