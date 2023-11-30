import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import ListSelection from "../ListSelection.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { v4 } from "uuid";

function LectureAdd() {
  const { getItem, setItem } = useLocalStorage();

  const [lecture, setLecture] = useState({
    lectureName: "",
    modulName: "",
    duration: 0,
    lectureDates: [],
    lecturers: [],
    studyProgram: undefined,
  });

  const navigator = useNavigate();

  const lectureDates = getItem("lectureDates");
  const lecturers = getItem("lecturers");
  const studyPrograms = getItem("studyPrograms");

  function save(e) {
    e.preventDefault();
    let lectures = getItem("lectures");
    lectures.push({ ...lecture, id: v4() });
    setItem("lectures", lectures);
    navigator("/admin/lectures");
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Vorlesung hinzufügen</h2>
          </div>

          <div className="d-flex text-muted">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lectureName"
                  name="lectureName"
                  required="required"
                  defaultValue={lecture.lectureName}
                  onChange={(e) =>
                    setLecture({ ...lecture, lectureName: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Modul</label>
                <input
                  type="text"
                  className="form-control"
                  id="modul"
                  name="modul"
                  required="required"
                  defaultValue={lecture.modulName}
                  onChange={(e) =>
                    setLecture({ ...lecture, modulName: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dauer</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="duration"
                  name="duration"
                  required="required"
                  defaultValue={lecture.duration}
                  onChange={(e) =>
                    setLecture({ ...lecture, duration: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vorlesungstermine</label>
                <ListSelection
                  list={lectureDates}
                  defaultValue={lecture.lectureDates}
                  onChange={(value) =>
                    setLecture({ ...lecture, lectureDates: value })
                  }
                  display="startDate"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dozenten</label>
                <ListSelection
                  list={lecturers}
                  defaultValue={lecture.lecturers}
                  onChange={(value) =>
                    setLecture({ ...lecture, lecturers: value })
                  }
                  display="lastName"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Studiengang</label>
                <select
                  className="form-select"
                  defaultValue={lecture.studyProgram}
                  onChange={(e) =>
                    setLecture({
                      ...lecture,
                      studyProgram: studyPrograms.find(
                        (studyProgram) => studyProgram.id == e.target.value
                      ),
                    })
                  }
                >
                  <option value={undefined} hidden></option>
                  {studyPrograms.map((studyProgram) => (
                    <option key={studyProgram.id} value={studyProgram.id}>{studyProgram.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={save}
                type="button"
                className="btn btn-primary"
                id="btnFormSubmit"
              >
                Speichern
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LectureAdd;
