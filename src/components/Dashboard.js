import React, { useState, useMemo } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Avatar from "react-avatar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
function Dashboard() {
  const { getItem } = useLocalStorage();
  const lecturers = getItem("lecturers");
  const [selected, setSelected] = useState();

  const events = useMemo(() => {
    return getItem("lectureDates")
      .map((lectureDate) => {
        if (!lectureDate.startDate || !lectureDate.endDate) return;

        const lecture =
          getItem("lectures").find((lecture) =>
            lecture.lectureDates.find((date) => date.id == lectureDate.id)
          ) ?? lectureDate.lecture;

        const lecturer =
          getItem("lecturers").find(
            (lecturer) =>
              lecturer.id == selected?.id &&
              lecturer.lectureDates.find((date) => date.id == lectureDate.id)
          ) ?? lectureDate.lecturer;

          if (lecturer?.id != selected?.id) return;

        return {
          title: lecture?.lectureName ?? "Unbekannt",
          start: lectureDate.startDate,
          end: lectureDate.endDate,
          dozent: lecturer?.lastName ?? "Unbekannt",
        };
      })
      .filter((e) => e != undefined);
  }, [selected]);

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper mt-3 d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Dashboard</h2>
            <div style={{ width: "300px" }}>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                defaultValue={selected}
                onChange={(e) =>
                  setSelected(
                    lecturers.find((lecturer) => lecturer.id == e.target.value)
                  )
                }
              >
                <option hidden value={undefined}>Bitte wählen</option>
                {lecturers.map((lecturer) => (
                  <option key={lecturer.id} value={lecturer.id}>
                    {lecturer.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!selected && (
            <div
              className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto d-flex"
              id="contentCard"
            >
              <div className="d-flex flex-column justify-content-center align-items-center w-100 py-5">
                <span className="rotate fs-1">
                  <i className="bi bi-hourglass-top"></i>
                </span>
                <div className="fs-4 text-center">
                  Bitte wählen Sie einen Dozenten
                </div>
              </div>
            </div>
          )}
          <div className="d-flex gap-4 w-100">
            {selected && (
              <>
                <div
                  className="contentCard p-3 px-4 bg-body rounded shadow-sm h-auto d-flex"
                  id="contentCard"
                >
                  <div style={{ width: "320px" }}>
                    <div className="d-flex gap-4 align-items-center mb-3">
                      <Avatar
                        round
                        size="80px"
                        name={`${selected.firstName ?? "Unbekannt"} ${
                          selected.lastName ?? "Unbekannt"
                        }`}
                      />
                      <div>
                        <div>
                        <i class="bi bi-person-video"></i>{" "}
                          {selected.firstName} {selected.lastName}
                        </div>
                        <div><i class="bi bi-envelope-at-fill"></i> {selected.email}</div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <strong>Studiengang</strong>
                        <div>{selected.studyProgram ?? "Unbekannt"}</div>
                      </div>
                      <div className="mb-2">
                        <strong>Vorlesungen</strong>
                        <ul>
                          {selected.lectures.map((lecture) => (
                            <li key={lecture.id}>{lecture.lectureName}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="contentCard p-3 bg-body rounded shadow-sm h-auto w-100 d-flex"
                  id="contentCard"
                >
                  <div className="w-100">
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
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
