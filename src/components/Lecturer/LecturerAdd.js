import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import ListSelection from "../ListSelection";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { v4 } from "uuid";

function LecturerAdd() {
  const { getItem, setItem } = useLocalStorage();

  const [lecturer, setLecturer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    lectures: [],
    lectureDates: [],
    studyProgram: undefined,
  });

  const navigator = useNavigate();

  const lectureDates = getItem("lectureDates");
  const lectures = getItem("lectures");

  function save(e) {
    e.preventDefault();
    let lecturers = getItem("lecturers");
    lecturers.push({ ...lecturer, id: v4() });
    setItem("lecturers", lecturers);
    navigator("/admin/lecturers");
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Dozent hinzufügen</h2>
          </div>

          <div className="d-flex text-muted">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Vorname</label>
                <input
                  type="text"
                  className="form-control"
                  id="shortname"
                  name="shortname"
                  required="required"
                  defaultValue={lecturer.firstName}
                  onChange={(e) =>
                    setLecturer({ ...lecturer, firstName: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nachname</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required="required"
                  defaultValue={lecturer.lastName}
                  onChange={(e) =>
                    setLecturer({ ...lecturer, lastName: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="name"
                  name="name"
                  required="required"
                  defaultValue={lecturer.email}
                  onChange={(e) =>
                    setLecturer({ ...lecturer, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vorlesungen</label>
                <ListSelection
                  list={lectures}
                  defaultValue={lecturer.lectures}
                  onChange={(value) =>
                    setLecturer({ ...lecturer, lectures: value })
                  }
                  display="lectureName"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vorlesungstermine</label>
                <ListSelection
                  list={lectureDates}
                  defaultValue={lecturer.lectureDates}
                  onChange={(value) =>
                    setLecturer({ ...lecturer, lectureDates: value })
                  }
                  display="startDate"
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

export default LecturerAdd;
