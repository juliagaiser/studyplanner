import React, { useState, useMemo } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import PopUpList from "../PopUpList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { format, parseISO } from "date-fns";

function LectureList() {
  const { getItem, setItem } = useLocalStorage();
  const [lectures, setLectures] = useState(getItem("lectures"));

  const [lectureDateId, setLectureDateId] = useState();
  const [lecturerId, setLecturerId] = useState();

  const popUpLecture = useMemo(
    () =>
      lectures.find((lecture) => lecture.id == (lecturerId ?? lectureDateId)),
    [lectureDateId, lecturerId]
  );

  const navigator = useNavigate();

  function addLecture() {
    navigator("/admin/add-lecture");
  }

  function editLecture(id) {
    navigator(`/admin/edit-lecture/${id}`);
  }

  function deleteLecture(id) {
    setItem(
      "lectures",
      lectures.filter((lecture) => lecture.id != id)
    );
    setLectures(getItem("lectures"));
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper mt-3 d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Vorlesungen</h2>
            <button
              className="btn btn-primary"
              type="submit"
              id="btnTopAction"
              onClick={addLecture}
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
                    <th className="text-center">Name</th>
                    <th className="text-center">Modulname</th>
                    <th className="text-center">Dauer</th>
                    <th className="text-center">Vorlesungstermin</th>
                    <th className="text-center">Dozent</th>
                    <th className="text-center">Studiengang</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lectures.map((lecture) => (
                    <tr key={lecture.id}>
                      <td className="text-center">{lecture.lectureName}</td>
                      <td className="text-center">{lecture.modulName}</td>
                      <td className="text-center">{lecture.duration}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => setLectureDateId(lecture.id)}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        {
                          <button
                            className="btn btn-primary btn-small"
                            onClick={() => setLecturerId(lecture.id)}
                          >
                            <i className="bi bi-box-arrow-up-right"></i>
                          </button>
                        }
                      </td>
                      <td className="text-center">
                        {lecture.studyProgram?.name ?? "--"}
                      </td>
                      <td className="right-align-content">
                        <button
                          onClick={() => editLecture(lecture.id)}
                          className="btn btn-primary btn-small"
                        >
                          <span>
                            <i className="bi bi-pen"></i> Edit
                          </span>
                        </button>
                        <button
                          onClick={() => deleteLecture(lecture.id)}
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
      {lecturerId != undefined && (
        <PopUpList onHide={() => setLecturerId(undefined)} title="Dozenten">
          <ul>
            {getItem("lecturers").map((lecturer) => {
              if (
                lecturer.lectures.find(
                  (lecture) => lecture.id == popUpLecture.id
                ) != undefined ||
                popUpLecture.lecturers.find((lctr) => lctr.id == lecturer.id)
              )
                return <li key={lecturer.id}>{lecturer.lastName}</li>;
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
                lectureDate.lecture?.id == popUpLecture.id ||
                popUpLecture.lectureDates.find(
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
                      format(parseISO(lectureDate.endDate), "HH:mm")}{" "}
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

export default LectureList;
