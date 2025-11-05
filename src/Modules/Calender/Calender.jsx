import { useState, useEffect } from "react";
import "../../Modules/Calender/Calender.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";
import api from "../../api/api"; //  base URL file

const Calendar = () => {
  const [currentView, setCurrentView] = useState("day");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 11));

  // NEW: sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = (e) => {
    if (e && e.stopProhe21pagation) e.stopPropagation();
    setSidebarOpen((s) => !s);
  };
  const closeSidebar = () => setSidebarOpen(false);

  //  State to hold events from API
  const [events, setEvents] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Fetch events from backend API without dynamic params

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await api.get("/calendar-events/month");
  //           params: { year, month }

  //       // const response = await api.get("/calendar-events/month?year=2025&month=8");
  //       setEvents(response.data);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, [currentDate]);

  // Pass data in api dynamically

  const fetchEvents = async () => {
    try {
                                                   // Extract year and month from currentDate
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; 

      // API call 
      const response = await api.get("/calendar-events/month", {
        params: { year, month },
      });
          // const [events, setEvents] = useState([]);
      setEvents(response.data); 
      // console.log("Fetched events:", response.data);
    } catch (error) {
      console.error("Error fetching events111:", error);
    }
  };

  ///upcoming events and exmas
  const fetchUpcoming = async () => {
    try {
      const response = await api.get("/calendar-events/calendar/upcoming");
      setUpcomingExams(response.data.exams);
      setUpcomingEvents(response.data.events);
      console.log("Upcoming exams:", response.data.exams);
      console.log("Upcoming events:", response.data.events);
    } catch (error) {
      console.error("Error fetching upcoming events/exams:", error);
    }
  };

  // Fetch events when date changes
  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  useEffect(() => {
    fetchUpcoming(); 
  }, [currentDate]);

  const formatMonthYear = (date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });  // formatMonthYear-> used to disply current mnth & yr

  const getLocalDateKey = (date) => {                  ///getLocalDateKey=>Helps mapevents to specific dates in the calendar.
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;                         
  };

  const changeMonth = (offset) => {                          //Change the calendar month forward or backward,offset used to move no.of mnths
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const changeWeek = (offset) => {                               //chnge week forward or backward
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7); 
    setCurrentDate(newDate); 
  }; 

  const changeDay = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  // ---------------- DAY VIEW ----------------
  const DayView = () => {
    const formattedDay = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const dayKey = getLocalDateKey(currentDate);
    const dayEvents = events.filter(                                //goes through every event in events.
      (ev) => ev.startDateTime.split("T")[0] === dayKey
    );
    const uEvents = upcomingEvents.filter(
      (d) => d.startDateTime.split("T")[0] === dayKey
    );
    const uExams = upcomingExams.filter(
      (d2) => d2.startDateTime.split("T")[0] === dayKey
    );

    const timeSlots = [];
    for (let i = 1; i <= 24; i++) {
      const hour = String(i).padStart(2, "0");
      const displayTime = i <= 12 ? `${i}:00 AM` : `${i - 12}:00 PM`;
      timeSlots.push({ hour: hour, displayTime });
    }

    return (
      <div className="calendar-content day-view-layout">
        <div className="day-header-bar-container">
          <div className="day-header-bar">{formattedDay}</div>
        </div>
        <div className="day-grid">
          <div className="time-column">
            {timeSlots.map((slot, index) => (
              <div key={index} className="day-time-slot">
                {slot.displayTime}
              </div>
            ))}
          </div>
          <div className="day-events-column">
            {timeSlots.map((slot, index) => {
              const event = dayEvents.find((ev) =>
                ev.startDateTime.split("T")[1].startsWith(slot.hour)
              );
              return (
                <div key={index} className="day-event-slot-wrapper">
                  {event && (
                    <div
                      className="event-slot-day"
                      style={{
                        backgroundColor: event.colorCode || "lightblue",
                      }}
                    >
                      <div className="event-time">{slot.displayTime}</div>
                      <div className="event-title">{event.title}</div>
                    </div>
                  )}
                </div>
              );
            })}
            
          </div>
        </div>
      </div>
    );
  };

  // ---------------- WEEK VIEW ----------------
  const WeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() - ((currentDate.getDay() + 6) % 7)
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const currentWeekRange = `${startOfWeek.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    })} – ${endOfWeek.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    })}`;

    return (
      <div className="calendar-content week-view">
        <div className="week-range-bar-container">
          <div className="week-range-bar">{currentWeekRange}</div>
        </div>
        <div className="week-grid-layout">
          {days.map((day, index) => {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + index);
            const dayKey = getLocalDateKey(dayDate);

            const event = events.find(
              (ev) => ev.startDateTime.split("T")[0] === dayKey
            );
            const uEvents = upcomingEvents.filter(
              (d) => d.startDateTime.split("T")[0] === dayKey
            );
            const uExams = upcomingExams.filter(
              (d2) => d2.startDateTime.split("T")[0] === dayKey
            );
            return (
              <div key={index} className="week-row-layout">
                <div className="week-day-cell">
                  <div className="week-day-name">{day}</div>
                </div>
                <div className="week-event-cell">
                  
                  {event && (
                    <div
                      className="event-slot-week"
                      style={{
                        backgroundColor: event.colorCode || "lightgreen",
                      }}
                    >
                      <div className="event-time">
                        {new Date(event.startDateTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="event-title">{event.title}</div>
                    </div>
                  )}

                  {/* {uExams && (
                    <div
                      className="event-slot-week"
                      style={{ backgroundColor: uExams.colorCode || "lightgreen" }}
                    >
                      <div className="event-time">
                        {new Date(uExams.startDateTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="event-title">{uExams.title}</div>
                    </div>
                  )} */}
                     {/* {uEvents && (
                    <div
                      className="event-slot-week"
                      style={{ backgroundColor: uEvents.colorCode || "lightgreen" }}
                    >
                      <div className="event-time">
                        {new Date(uEvents.startDateTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="event-title">{uEvents.title}</div>
                    </div>
                  )} */}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ---------------- MONTH VIEW ----------------
  const MonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const totalCells = 42;
    const cells = [];

    
    const monthEvents = {};
    const monthUevents = {};
    const monthExams = {};
    events.forEach((ev) => {
      const dateKey = ev.startDateTime.split("T")[0];
      monthEvents[dateKey] = {
        color: ev.colorCode || "blue",
        title: ev.title,
      };
    });

    upcomingExams.forEach((ev) => {
      const dateKey = ev.startDateTime.split("T")[0];
      monthExams[dateKey] = {
        color: ev.colorCode || "blue",
        title: ev.title,
      };
    });
        upcomingEvents.forEach((ev) => {
      const dateKey = ev.startDateTime.split("T")[0];
      monthUevents[dateKey] = {
        color: ev.colorCode || "blue",
        title: ev.title,
      };
    });

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - startOffset + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;

      let event = null;
      let dateKey = null;
      if (isCurrentMonth) {
        dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          dayNumber
        ).padStart(2, "0")}`;
        event = monthEvents[dateKey];
      }

      let exams = null;
      if (isCurrentMonth) {
        dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          dayNumber
        ).padStart(2, "0")}`;
        exams = monthExams[dateKey];
      }
      let uevents = null;
      if (isCurrentMonth) {
        dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          dayNumber
        ).padStart(2, "0")}`;
        uevents = monthUevents[dateKey];
      }
      cells.push(
        <div
          key={i}
          className={`month-day-cell ${!isCurrentMonth ? "outside-month" : ""}`}
          onClick={() => {
            if (isCurrentMonth) {
              setCurrentDate(new Date(year, month, dayNumber));
              setCurrentView("day");
            }
          }}
          style={{ cursor: isCurrentMonth ? "pointer" : "default" }}
        >
          <div className="month-date">{isCurrentMonth ? dayNumber : ""}</div>
          {event && (
            <div
              className="event-month-view"
              style={{ backgroundColor: event.color || "lightblue" }}
            >
              {event.title}
            </div>
          )}
          {exams && (
            <div
              className="event-month-view"
              style={{ backgroundColor: exams.color || "lightblue" }}
            >
              {exams.title}
            </div>
          )}
           {uevents && (
            <div
              className="event-month-view"
              style={{ backgroundColor: uevents.color || "lightblue" }}
            >
              {uevents.title}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="calendar-content month-view">
        <div className="month-grid">
          <div className="month-day-name">Mon</div>
          <div className="month-day-name">Tue</div>
          <div className="month-day-name">Wed</div>
          <div className="month-day-name">Thu</div>
          <div className="month-day-name">Fri</div>
          <div className="month-day-name">Sat</div>
          <div className="month-day-name">Sun</div>
          {cells}
        </div>
      </div>
    );
  };

  // ---------------- RENDER VIEW ----------------
  const renderView = () => {
    switch (currentView) {
      case "day":
        return <DayView />;
      case "week":
        return <WeekView />;
      case "month":
        return <MonthView />;
      default:
        return <WeekView />;
    }
  };

  const getNavigationHandler = () => {    ///returns functions for the previous and next buttons based on the current view.
    switch (currentView) {
      case "day":
        return { prev: () => changeDay(-1), next: () => changeDay(1) };
      case "week":
        return { prev: () => changeWeek(-1), next: () => changeWeek(1) };
      case "month":
        return { prev: () => changeMonth(-1), next: () => changeMonth(1) };
      default:
        return { prev: () => changeWeek(-1), next: () => changeWeek(1) };
    }
  };

  const { prev, next } = getNavigationHandler();

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="main-content">
        <Header />
        <div className="page-wrap">
          <div className="calendar-container">
            <div className="calender-header">
              <div className="calender-head-title">
                <button
                  className="hamburger"
                  aria-label="menu"
                  aria-expanded={sidebarOpen}
                  onClick={toggleSidebar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                  >
                    <rect width="20" height="2" rx="1" fill="currentColor" />
                    <rect
                      y="6"
                      width="12"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                    <rect
                      y="12"
                      width="20"
                      height="2"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                <div className="calender-head">Calendar</div>
              </div>
            </div>

            <div className="calendar-header-nav">
              <div className="navigation">
                <span className="arrow" onClick={prev}>
                  ←
                </span>
                <span className="current-display">
                  {formatMonthYear(currentDate)}
                </span>
                <span className="arrow" onClick={next}>
                  →
                </span>
              </div>
              <div className="view-switcher">
                <button
                  className={`view-button ${
                    currentView === "day" ? "active" : ""
                  }`}
                  onClick={() => setCurrentView("day")}
                >
                  Day
                </button>
                <button
                  className={`view-button ${
                    currentView === "week" ? "active" : ""
                  }`}
                  onClick={() => setCurrentView("week")}
                >
                  Week
                </button>
                <button
                  className={`view-button ${
                    currentView === "month" ? "active" : ""
                  }`}
                  onClick={() => setCurrentView("month")}
                >
                  Month
                </button>
              </div>
            </div>

            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;