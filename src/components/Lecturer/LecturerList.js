import React, { useState, useMemo } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import PopUpList from "../PopUpList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { format, parseISO } from "date-fns";


function LecturerList() {
  const { setItem, getItem } = useLocalStorage();

  const [lecturers, setLecturers] = useState(getItem("lecturers"));

  const [lectureId, setLectureId] = useState();
  const [lectureDateId, setLectureDateId] = useState();

  const popUpLecturer = useMemo(
    () =>
      lecturers.find((lecturer) => lecturer.id == (lectureId ?? lectureDateId)),
    [lectureDateId, lectureId]
  );

  const navigator = useNavigate();

  function addLecturer() {
    navigator("/admin/add-lecturer");
  }

  function editLecturer(id) {
    navigator(`/admin/edit-lecturer/${id}`);
  }

  function deleteLecturer(id) {
    setItem(
      "lecturers",
      lecturers.filter((lecturer) => lecturer.id != id)
    );
    setLecturers(getItem("lecturers"));
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper mt-3 d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Dozenten</h2>
            <button
              className="btn btn-primary"
              type="submit"
              id="btnTopAction"
              onClick={addLecturer}
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
                    <th className="text-center">Vorname</th>
                    <th className="text-center">Nachname</th>
                    <th className="text-center">E-mail Adresse</th>
                    <th className="text-center">Vorlesungen</th>
                    <th className="text-center">Vorlesungstermine</th>
                    <th className="text-center">Studiengang</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map((lecturer) => (
                    <tr key={lecturer.id}>
                      <td className="text-center">{lecturer.firstName}</td>
                      <td className="text-center">{lecturer.lastName}</td>
                      <td className="text-center">{lecturer.email}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => setLectureId(lecturer.id)}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => setLectureDateId(lecturer.id)}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </button>
                      </td>
                      <td className="text-center">{lecturer.email}</td>

                      <td className="right-align-content">
                        <button
                          onClick={() => editLecturer(lecturer.id)}
                          className="btn btn-primary btn-small"
                        >
                          <span>
                            <i className="bi bi-pen"></i> Edit
                          </span>
                        </button>
                        <button
                          onClick={() => deleteLecturer(lecturer.id)}
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
      {lectureId != undefined && (
        <PopUpList onHide={() => setLectureId(undefined)} title="Vorlesungen">
          <ul>
            {getItem("lectures").map((lecture) => {
              if (
                lecture.lecturers.find(
                  (lecturer) => lecturer.id == popUpLecturer.id
                ) != undefined ||
                popUpLecturer.lectures.find((lctr) => lctr.id == lecture.id)
              )
                return <li key={lecture.id}>{lecture.lectureName}</li>;
            })}
          </ul>
        </PopUpList>
      )}
      {lectureDateId != undefined && (
        <PopUpList
          onHide={() => setLectureDateId(undefined)}
          title="Vorlesungstermine"
        >
          <ul>
            {getItem("lectureDates").map((lectureDate) => {
              if (
                lectureDate.lecture?.id == popUpLecturer.id ||
                popUpLecturer.lectureDates.find(
                  (ldt) => ldt.id == lectureDate.id
                )
              )
                return (
                  <li key={lectureDate.id}>
                    {!!lectureDate.startDate &&
                      format(
                        parseISO(lectureDate.startDate),
                        "dd.MM.yy, HH:mm"
                      )}{" "}
                     bis{" "}
                    {!!lectureDate.endDate &&
                      format(
                        parseISO(lectureDate.endDate),
                        "HH:mm"
                      )}{" "}
                    Uhr
                  </li>
                );
            })}
          </ul>
        </PopUpList>
      )}
    </main>
  );
}

export default LecturerList;
