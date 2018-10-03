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
  forward = e => {
    const { month, year } = this.state;
    if (month === 11) {
      this.getDays(year + 1, 0);
    } else {
      this.getDays(year, month + 1);
    }
  };
  backward = e => {
    const { month, year } = this.state;
    if (month === 0) {
      this.getDays(year - 1, 11);
    } else {
      this.getDays(year, month - 1);
    }
  };
  getDays = (year, month) => {
    // 일수
    const days = new Date(year, month, 0).getDate();
    // 그 달의 1일 요일
    let day = new Date(year, month, 1).getDay();
    //day가 0이 아니면 (일요일) 전 달에서 그만큼 가져오기
    let arrays = [...Array(days)].map((value, index) => index + 1);
    if (day !== 0) {
      let days = new Date(year, month, 0).getDate();
      while (day > 0) {
        arrays.unshift({ day: days, month });
        day--;
        days--;
      }
    }
    // 마지막 일자가 토요일이 아니면 다음 달 가져오기
    let lastDay = parseInt(new Date(year, month, days).getDay(), 10);

    if (lastDay !== 6) {
      let day = 1;
      while (lastDay < 6) {
        lastDay++;
        arrays.push({ day });
        day++;
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
    console.log(this.state);
    const { arrays, month, year } = this.state;
    return (
      <div className="container">
        <div className="month">
          <button onClick={this.backward}>뒤로</button>
          <button>
            {year}/{month + 1}
          </button>
          <button onClick={this.forward}>앞으로</button>
        </div>
        <div className="day-title">
          <div className="date-row">
            {this.week.map(day => (
              <div key={day} className="date-cell">
                {day}
              </div>
            ))}
          </div>
        </div>

        {arrays.map((array, i) => (
          <div key={i} className="date-row">
            {array.map(
              (num, i) =>
                num.day ? (
                  <div key={i} className="date-cell last-month ">
                    {num.day}
                  </div>
                ) : (
                  <div key={i} className="date-cell">
                    {num}
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    );
  }
}
