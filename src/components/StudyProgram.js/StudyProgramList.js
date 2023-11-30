import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import PopUpList from "../PopUpList";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function StudyProgramList() {
  const { setItem, getItem } = useLocalStorage();

  const [studyPrograms, setStudyPrograms] = useState(getItem("studyPrograms"));

  const [lectureId, setLectureId] = useState();
  const [lecturerId, setLecturerId] = useState();

  const popUpStudyProgram = useMemo(
    () =>
      studyPrograms.find(
        (studyProgram) => studyProgram.id == (lecturerId ?? lectureId)
      ),
    [lectureId, lecturerId]
  );

  const navigator = useNavigate();

  function addStudyProgram() {
    navigator("/admin/add-study-program");
  }

  function editStudyProgram(id) {
    navigator(`/admin/edit-study-program/${id}`);
  }

  function deleteProgram(id) {
    setItem(
      "studyPrograms",
      studyPrograms.filter((studyProgram) => studyProgram.id != id)
    );
    setStudyPrograms(getItem("studyPrograms"));
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Studiengänge</h2>
            <button
              onClick={addStudyProgram}
              className="btn btn-primary"
              type="submit"
              id="btnTopAction"
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
                    <th className="text-center">Abkürzung</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Vorlesungen</th>
                    <th className="text-center">Dozenten</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studyPrograms.map((studyProgram) => (
                    <tr key={studyProgram.id}>
                      <td className="text-center">{studyProgram.name}</td>
                      <td className="text-center">{studyProgram.shortName}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => setLectureId(studyProgram.id)}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => setLecturerId(studyProgram.id)}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                        </button>
                      </td>
                      <td className="right-align-content">
                        <button
                          onClick={() => editStudyProgram(studyProgram.id)}
                          className="btn btn-primary btn-small"
                        >
                          <span>
                            <i className="bi bi-pen"></i> Edit
                          </span>
                        </button>
                        <button
                          onClick={() => deleteProgram(studyProgram.id)}
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
                lecture.studyProgram?.id == popUpStudyProgram.id ||
                popUpStudyProgram.lectures.find((lctr) => lctr.id == lecture.id)
              )
                return <li key={lecture.id}>{lecture.lectureName}</li>;
            })}
          </ul>
        </PopUpList>
      )}
      {lecturerId != undefined && (
        <PopUpList onHide={() => setLecturerId(undefined)} title="Dozenten">
          <ul>
            {getItem("lecturers").map((lecturer) => {
              if (
                lecturer.studyProgram?.id == popUpStudyProgram.id ||
                popUpStudyProgram.lecturers.find(
                  (lctr) => lctr.id == lecturer.id
                )
              )
                return <li key={lecturer.id}>{lecturer.lastName}</li>;
            })}
          </ul>
        </PopUpList>
      )}
    </main>
  );
}

export default StudyProgramList;
