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
  forward = (today = 1) => {
    console.log("hihihihihihi" + today);
    const { month, year } = this.state;
    if (month === 11) {
      this.getDays(year + 1, 0, today);
    } else {
      this.getDays(year, month + 1, today);
    }
  };
  backward = (today = 1) => {
    const { month, year } = this.state;
    if (month === 0) {
      this.getDays(year - 1, 11, today);
    } else {
      this.getDays(year, month - 1, today);
    }
  };
  handleClickCell = today => {
    console.log(today);
    console.log(today < 15);
    today > 15 ? this.backward(today) : this.forward(today);
  };
  getDays = (year, month, today = new Date().getDate()) => {
    // 전체 일수
    const days = new Date(year, month, 0).getDate();
    // 그 달의 1일 요일
    let day = new Date(year, month, 1).getDay();
    //day가 0이 아니면 (일요일) 전 달에서 그만큼 가져오기(미리보기)

    let arrays = [...Array(days)].map((value, index) => index + 1);
    if (day !== 0) {
      let days = new Date(year, month, 0).getDate();
      while (day > 0) {
        arrays.unshift({ day: days, month });
        day--;
        days--;
      }
    }
    // 마지막 일자가 토요일(6)이 아니면 다음 달에서 가져오기(미리보기)
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
      year: parseInt(year, 10),
      today: parseInt(today, 10)
    });
  };
  nowDate = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    this.getDays(year, month);
  };
  componentDidMount() {
    this.nowDate();
  }
  week = ["일", "월", "화", "수", "목", "금", "토"];
  render() {
    const { arrays, month, year, today } = this.state;
    return (
      <div className="container">
        <div className="month">
          <button onClick={this.backward}>뒤로</button>
          <button onClick={this.nowDate}>
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
                  <div
                    key={i}
                    className="date-cell last-month "
                    onClick={e => this.handleClickCell(num.day)}
                  >
                    {num.day}
                  </div>
                ) : (
                  <div
                    key={i}
                    className={today === num ? "date-cell today" : "date-cell"}
                    onClick={e => this.setState({ today: num })}
                  >
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
