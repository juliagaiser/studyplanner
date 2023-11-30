import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { format, parseISO } from "date-fns";


function LectureDateList() {
  const { setItem, getItem } = useLocalStorage();

  const [lectureDates, setLectureDates] = useState(getItem("lectureDates"));

  const navigator = useNavigate();

  function addLectureDate() {
    navigator("/admin/add-lectureDate");
  }

  function editLectureDate(id) {
    navigator(`/admin/edit-lectureDate/${id}`);
  }

  function deleteLectureDate(id) {
    setItem(
      "lectureDates",
      lectureDates.filter((lectureDate) => lectureDate.id != id)
    );
    setLectureDates(getItem("lectureDates"));
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper mt-3 d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Vorlesungstermine</h2>
            <button
              className="btn btn-primary"
              type="submit"
              id="btnTopAction"
              onClick={addLectureDate}
            >
              + Hinzufügen
            </button>
          </div>
          <div
            className="contentCard p-3 bg-body rounded shadow-sm w-100 h-auto"
            id="contentCard"
          >
            <div className="d-flex text-muted">
              <table className="table table-hover table-responsive">
                <thead>
                  <tr>
                    <th>Beginn</th>
                    <th>Ende</th>
                    <th>Vorlesung</th>
                    <th>Dozent</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lectureDates.map((lectureDate) => (
                    <tr key={lectureDate.id}>
                      <td>
                        {!!lectureDate.startDate &&
                          format(
                            parseISO(lectureDate.startDate),
                            "dd.MM.yy, HH:mm"
                          )}{" "}
                        Uhr
                      </td>
                      <td>
                        {!!lectureDate.endDate &&
                          format(
                            parseISO(lectureDate.endDate),
                            "dd.MM.yy, HH:mm"
                          )}{" "}
                        Uhr
                      </td>
                      <td>{lectureDate.lecture?.lectureName ?? "--"}</td>
                      <td>{lectureDate.lecturer?.lastName ?? "--"}</td>
                      <td className="right-align-content">
                        <button
                          onClick={() => editLectureDate(lectureDate.id)}
                          className="btn btn-primary btn-small"
                        >
                          <span>
                            <i className="bi bi-pen"></i> Edit
                          </span>
                        </button>
                        <button
                          onClick={() => deleteLectureDate(lectureDate.id)}
                          className="btn btn-primary btn-small ms-2"
                        >
                          <span>
                            <i className="bi bi-trash"></i> Delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LectureDateList;
