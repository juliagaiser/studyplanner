
import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from "../../hooks/useLocalStorage";


function StudyProgramUpdate() {
    const { setItem, getItem } = useLocalStorage();

    const [studyProgram, setStudyProgram] = useState({
      name: "",
      shortName: "",
    });
    const navigator = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setStudyProgram(
            getItem("studyPrograms").find(
            (studyProgram) => studyProgram.id == id
            )
        );
    }, [id]); // dependency to id

    function update() {
        let studyPrograms = getItem("studyPrograms");
        studyPrograms = studyPrograms.filter(
          (studyProgram) => studyProgram.id != id
        );
        studyPrograms.push(studyProgram);
        setItem("studyPrograms", studyPrograms);
        navigator('/admin/studyprograms');
    }

    return (
      <main className="content">
        <div id="content" className="px-4 mx-auto table-responsive">
          <div className="contentwrapper d-flex flex-column">
            <div className="bar d-flex justify-content-between mb-3 flex-row">
              <h2 id="contentTitle">Studiengang bearbeiten</h2>
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
                    onChange={e => setStudyProgram({...studyProgram, shortName: e.target.value})}
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
                    onChange={e => setStudyProgram({...studyProgram, name: e.target.value})}     
                />
                </div>
                <button
                  onClick={update}
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

export default StudyProgramUpdate;

