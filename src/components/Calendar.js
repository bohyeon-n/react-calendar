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
  forward = today => {
    const { month, year } = this.state;
    if (month === 11) {
      this.getDays(year + 1, 0, today);
    } else {
      this.getDays(year, month + 1, today);
    }
  };
  backward = today => {
    const { month, year } = this.state;
    if (month === 0) {
      this.getDays(year - 1, 11, today);
    } else {
      this.getDays(year, month - 1, today);
    }
  };
  handleClickCell = today => {
    today > 15 ? this.backward(today) : this.forward(today);
  };
  getDays = (year, month, today = new Date().getDate()) => {
    // 전체 일수
    const days = new Date(year, month + 1, 0).getDate();
    // 그 달의 1일 요일
    let day = new Date(year, month, 1).getDay();
    //day가 0이 아니면 (일요일) 전 달에서 그만큼 가져오기(미리보기)
    let arrays = [...Array(days)].map((value, index) => {
      return { day: index + 1, month: month + 1 };
    });

    // 이벤트 가져오기
    this.props.events.map(event => {
      const date = new Date(event.time * 1000);
      if (date.getFullYear() === year && date.getMonth() === month) {
        arrays[date.getDate() - 1].event = event.title;
      }
    });
    if (day !== 0) {
      let days = new Date(year, month, 0).getDate();
      while (day > 0) {
        arrays.unshift({ day: days, month });
        day--;
        days--;
      }
    }
    // 다음달 미리보기 6주로 맞춤

    let count = 1;

    while (arrays.length < 42) {
      arrays.push({ day: count++, month: month + 2 });
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
    const { evnets } = this.props;
    const { arrays, month, year, today } = this.state;
    console.log(arrays);
    return (
      <div className="container">
        <div className="calendar-header">
          <div className="button">
            <button onClick={e => this.backward(1)}>뒤로</button>
            <button onClick={e => this.forward(1)}>앞으로</button>
            <button onClick={this.nowDate}>today</button>
          </div>
          <div className="today">
            {year}/{month + 1}
          </div>
        </div>
        <div className="calendar-content">
          <div className="date-row">
            {this.week.map(day => (
              <div key={day} className="date-cell">
                {day}
              </div>
            ))}
          </div>

          {arrays.map((array, i) => (
            <div key={i} className="date-row">
              {array.map(
                (num, i) =>
                  num.month !== month + 1 ? (
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
                      className={
                        today === num.day ? "date-cell today" : "date-cell"
                      }
                      onClick={e => this.setState({ today: num })}
                    >
                      {num.day}
                      {num.event ? (
                        <dvi className="event">{num.event}</dvi>
                      ) : null}
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
