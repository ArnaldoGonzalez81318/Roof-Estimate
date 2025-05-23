import { createSignal } from 'solid-js';

const costPerSqFt = {
  asphalt: [4.00, 7.00],
  tile: [8.00, 15.00],
  metal: [7.00, 12.00]
};

const roofLabels = {
  asphalt: "Asphalt Shingle",
  tile: "Tile (Clay/Concrete)",
  metal: "Metal"
};

function Estimator() {
  const [squareFeet, setSquareFeet] = createSignal('');
  const [type, setType] = createSignal('asphalt');
  const [estimate, setEstimate] = createSignal(null);

  const handleCalculate = () => {
    const sqft = parseFloat(squareFeet());
    if (!sqft || sqft <= 0) return;

    const [minCost, maxCost] = costPerSqFt[type()];
    const estimatedMin = (sqft * minCost).toFixed(2);
    const estimatedMax = (sqft * maxCost).toFixed(2);

    setEstimate({
      sqft,
      estimatedMin,
      estimatedMax,
      costRange: [minCost, maxCost],
      label: roofLabels[type()]
    });
  };

  return (
    <div class="estimator">
      <label>
        Roof Type:
        <select value={type()} onInput={(e) => setType(e.target.value)}>
          <option value="asphalt">Asphalt Shingle</option>
          <option value="tile">Tile (Clay/Concrete)</option>
          <option value="metal">Metal</option>
        </select>
      </label>

      <label>
        House Size (Total Sq Ft):
        <input
          type="number"
          value={squareFeet()}
          onInput={(e) => setSquareFeet(e.target.value)}
          placeholder="e.g., 1500"
        />
      </label>

      <button onClick={handleCalculate}>Estimate</button>

      {estimate() && (
        <div class="results">
          <p><strong>Roof Type:</strong> {estimate().label}</p>
          <p><strong>Area:</strong> {estimate().sqft} sq ft</p>
          <p><strong>Cost per sq ft:</strong> ${estimate().costRange[0]} – ${estimate().costRange[1]}</p>
          <p><strong>Estimated Cost:</strong> ${estimate().estimatedMin} – ${estimate().estimatedMax}</p>
          <hr />
          <p><em>Calculation:</em> Sq Ft × Cost per Sq Ft = Estimated Cost</p>
          <p><code>{estimate().sqft} × {estimate().costRange[0]} = ${estimate().estimatedMin}</code></p>
          <p><code>{estimate().sqft} × {estimate().costRange[1]} = ${estimate().estimatedMax}</code></p>
        </div>
      )}
    </div>
  );
}

export default Estimator;