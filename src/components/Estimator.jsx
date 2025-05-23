import { createSignal } from 'solid-js';

const costPerSqFt = {
  asphalt: [4.00, 7.00],
  tile: [8.00, 15.00],
  metal: [7.00, 12.00]
};

function Estimator() {
  const [length, setLength] = createSignal('');
  const [width, setWidth] = createSignal('');
  const [type, setType] = createSignal('asphalt');
  const [estimate, setEstimate] = createSignal(null);

  const handleCalculate = () => {
    const area = parseFloat(length()) * parseFloat(width());
    if (!area || area <= 0) return;

    const [minCost, maxCost] = costPerSqFt[type()];
    const estimatedMin = (area * minCost).toFixed(2);
    const estimatedMax = (area * maxCost).toFixed(2);

    setEstimate({ area, estimatedMin, estimatedMax });
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
        Roof Length (ft):
        <input type="number" value={length()} onInput={(e) => setLength(e.target.value)} />
      </label>
      <label>
        Roof Width (ft):
        <input type="number" value={width()} onInput={(e) => setWidth(e.target.value)} />
      </label>
      <button onClick={handleCalculate}>Estimate</button>

      {estimate() && (
        <div class="results">
          <p>Area: {estimate().area} sq ft</p>
          <p>Estimated Cost: ${estimate().estimatedMin} – ${estimate().estimatedMax}</p>
        </div>
      )}
    </div>
  );
}

export default Estimator;