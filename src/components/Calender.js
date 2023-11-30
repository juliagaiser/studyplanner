import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Calender() {
  const { getItem } = useLocalStorage();

  const events = getItem("lectureDates")
    .map((lectureDate) => {
      if (!lectureDate.startDate || !lectureDate.endDate) return;

      const lecture =
        lectureDate.lecture ??
        getItem("lectures").find((lecture) =>
          lecture.lectureDates.find((date) => date.id == lectureDate.id)
        );
      const lecturer =
        lectureDate.lecturer ??
        getItem("lecturers").find((lecturer) =>
          lecturer.lectureDates.find((date) => date.id == lectureDate.id)
        );

      return {
        title: lecture?.lectureName ?? "Unbekannt",
        start: lectureDate.startDate,
        end: lectureDate.endDate,
        dozent: lecturer?.lastName ?? "Unbekannt",
      };
    })
    .filter((e) => e != undefined);

  return (
    <main className="content pb-3">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper mt-3 d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Kalender</h2>
          </div>
          <div
            className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto"
            id="contentCard"
          >
            <FullCalendar
              events={events}
              height={650}
              locale="de"
              firstDay={1}
              nowIndicator
              slotMinTime="06:00"
              slotMaxTime="21:00"
              allDaySlot={false}
              initialView="timeGridWeek"
              headerToolbar={{
                start: "prev,today,next",
                center: "",
                end: "timeGridWeek,dayGridMonth",
              }}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5, 6],
                startTime: "00:00",
                endTime: "24:00",
              }}
              buttonText={{
                today: "Heute",
                month: "Monat",
                week: "Woche",
                day: "Tag",
                list: "Liste",
              }}
              plugins={[timeGridPlugin, dayGridPlugin]}
              eventContent={(e) => {
                switch (e.view.type) {
                  case "timeGridWeek":
                    return {
                      html: `
                        <div style="overflow: hidden;">
                            <div>
                                ${e.event.title}
                                <br/>
                                ${e.timeText}
                            </div>
                            <div>
                                ${e.event.extendedProps.dozent}
                            <div>
                        </div>
                    `,
                    };
                  case "dayGridMonth":
                    return {
                      html: `
                        <div style="overflow: hidden; display: flex; align-items: center;">
                            <div class="fc-daygrid-event-dot" style="border-color: ${e.borderColor};"></div>
                            ${e.timeText}&nbsp;<strong>${e.event.title}</strong>
                        </div>
                    `,
                    };
                  default:
                    return {
                      html: `
                        ${e.event.title} - ${e.timeText}
                    `,
                    };
                }
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Calender;
