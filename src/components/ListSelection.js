import { useState } from "react";
function ListSelection({ id, list, defaultValue, onChange, display }) {
  const [value, setValue] = useState(defaultValue);

  
  return (
    <div className="container">
      <div className="row">
        {(!list || list.length == 0) && "Keine Daten vorhanden"}
        {list.map((el) => {
          return (
            <div className="col-3" key={el.id}>
              <input
                defaultChecked={el.id == id}
                onChange={(e) => {
                  let newVal;
                  if (e.target.checked) newVal = [...value, el];
                  else newVal = value.filter((e) => e.id != el.id);
                  onChange(newVal);
                  setValue(newVal);
                }}
                className="me-2"
                id={el.id}
                type="checkbox"
              />
              <label htmlFor={el.id}>{el[display]}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListSelection;
