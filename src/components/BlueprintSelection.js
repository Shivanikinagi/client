import React, { useState, useEffect } from "react";

const BlueprintSelection = () => {
  const [blueprints, setBlueprints] = useState([]);

  useEffect(() => {
    const fetchBlueprints = async () => {
      const response = await fetch("/generate-blueprints");
      const data = await response.json();
      setBlueprints(data.blueprints);
    };
    fetchBlueprints();
  }, []);

  const handleSelect = async (blueprintId) => {
    const response = await fetch("/generate-3d-model", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blueprint_id: blueprintId }),
    });
    const data = await response.json();
    console.log(data.model_file);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Choose a Blueprint</h2>
      <div className="row">
        {blueprints.map((blueprint, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={blueprint.image} alt="Blueprint" className="card-img-top" />
              <div className="card-body">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleSelect(blueprint.id)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlueprintSelection;
