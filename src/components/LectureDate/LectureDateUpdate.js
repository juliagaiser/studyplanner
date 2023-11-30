import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function LectureDateUpdate() {
  const { setItem, getItem } = useLocalStorage();

  const [lectureDate, setLectureDate] = useState({
    startDate: "",
    endDate: "",
  });

  const lectures = getItem("lectures");
  const lecturers = getItem("lecturers");

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLectureDate(
      getItem("lectureDates").find((lectureDate) => lectureDate.id == id)
    );
  }, [id]); // dependency to id

  function update() {
    let lectureDates = getItem("lectureDates");
    lectureDates = lectureDates.filter((lectureDate) => lectureDate.id != id);
    lectureDates.push(lectureDate);
    setItem("lectureDates", lectureDates);

    navigator("/admin/lectureDates");
  }

  return (
    <main className="content">
      <div id="content" className="px-4 mx-auto table-responsive">
        <div className="contentwrapper d-flex flex-column">
          <div className="bar d-flex justify-content-between mb-3 flex-row">
            <h2 id="contentTitle">Vorlesungstermin bearbeiten</h2>
          </div>

          <div className="d-flex text-muted">
            <form className="w-100" id="form">
              <div className="mb-3">
                <label className="form-label">Beginn</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="lectureDateName"
                  name="lectureDateName"
                  required="required"
                  defaultValue={lectureDate.startDate}
                  onChange={(e) =>
                    setLectureDate({
                      ...lectureDate,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ende</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="modul"
                  name="modul"
                  required="required"
                  defaultValue={lectureDate.endDate}
                  onChange={(e) =>
                    setLectureDate({ ...lectureDate, endDate: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Vorlesung</label>
                <select
                  className="form-select"
                  defaultValue={lectureDate.lecture}
                  onChange={(e) =>
                    setLectureDate({
                      ...lectureDate,
                      lecture: lectures.find(
                        (lecture) => lecture.id == e.target.value
                      ),
                    })
                  }
                >
                  {!lectureDate.lecture && (
                    <option hidden value={undefined}></option>
                  )}
                  {lectures.map((lecture) => (
                    <option value={lecture.id} key={lecture.id}>
                      {lecture.lectureName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Dozent</label>
                <select
                  className="form-select"
                  defaultValue={lectureDate.lecturer}
                  onChange={(e) =>
                    setLectureDate({
                      ...lectureDate,
                      lecturer: lecturers.find(
                        (lecturer) => lecturer.id == e.target.value
                      ),
                    })
                  }
                >
                  {!lectureDate.lecturer && (
                    <option hidden value={undefined}></option>
                  )}
                  {lecturers.map((lecturer) => (
                    <option value={lecturer.id} key={lecturer.id}>
                      {lecturer.lastName}
                    </option>
                  ))}
                </select>
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

export default LectureDateUpdate;
