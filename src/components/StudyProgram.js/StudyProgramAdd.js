import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { v4 } from "uuid";

function StudyProgramAdd() {
  const { getItem, setItem } = useLocalStorage();

  const [studyProgram, setStudyProgram] = useState({
    name: "",
    shortName: "",
    lectures: [],
    lecturers: [],
  });

  const navigator = useNavigate();

  async function save(e) {
    e.preventDefault();
    let studyPrograms = getItem("studyPrograms");
    studyPrograms.push({ ...studyProgram, id: v4() });
    setItem("studyPrograms", studyPrograms);
    navigator("/admin/studyprograms");
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Studiengang hinzufügen</h2>
          </div>

          <div className="d-flex text-muted">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Abkürzung</label>
                <input
                  type="text"
                  className="form-control"
                  id="shortname"
                  name="shortname"
                  required="required"
                  defaultValue={studyProgram.shortName}
                  onChange={(e) =>
                    setStudyProgram({
                      ...studyProgram,
                      shortName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bezeichnung</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required="required"
                  defaultValue={studyProgram.name}
                  onChange={(e) =>
                    setStudyProgram({ ...studyProgram, name: e.target.value })
                  }
                />
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

export default StudyProgramAdd;
