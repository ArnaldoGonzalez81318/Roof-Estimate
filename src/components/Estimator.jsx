import { createSignal } from 'solid-js';

const rateTable = [
  { project: 'Re-Roof', material: 'Shingle', area: sqft => sqft < 1000, rate: 8.5 },
  { project: 'Re-Roof', material: 'Tile', area: sqft => sqft >= 1000 && sqft <= 2500, rate: 9.5 },
  { project: 'Re-Roof', material: 'Metal', area: sqft => sqft > 2500, rate: 10.5 },
  {
    project: 'Re-Roof', material: 'Low-Slope',
    area: sqft => sqft < 1000, rate: 9.5
  },
  {
    project: 'Re-Roof', material: 'Low-Slope',
    area: sqft => sqft >= 1000, rate: 7.0
  },
  {
    project: 'New Roof', material: 'Any',
    area: () => true, rate: 'Contact Directly'
  }
];

const materials = ['Shingle', 'Tile', 'Metal', 'Low-Slope'];

function Estimator() {
  const [project, setProject] = createSignal('Re-Roof');
  const [material, setMaterial] = createSignal('Shingle');
  const [squareFeet, setSquareFeet] = createSignal('');
  const [estimate, setEstimate] = createSignal(null);

  const handleCalculate = () => {
    const sqft = parseFloat(squareFeet());
    if (!sqft || sqft <= 0) return;

    // Match row in rate table
    const match = rateTable.find(entry => {
      const projectMatch = entry.project === project();
      const materialMatch =
        entry.material === material() || entry.material === 'Any';
      const areaMatch = entry.area(sqft);
      return projectMatch && materialMatch && areaMatch;
    });

    if (!match) {
      setEstimate({
        sqft,
        rate: null,
        cost: null,
        message: 'No estimate available for the selected options.'
      });
      return;
    }

    if (match.rate === 'Contact Directly') {
      setEstimate({
        sqft,
        rate: null,
        cost: null,
        message: 'Please contact us directly for a new roof estimate.'
      });
      return;
    }

    const cost = (match.rate * sqft).toFixed(2);

    setEstimate({
      sqft,
      rate: match.rate,
      cost,
      material: material(),
      project: project()
    });
  };

  return (
    <div class="estimator">
      <label>
        Project Type:
        <select value={project()} onInput={(e) => setProject(e.target.value)}>
          <option value="Re-Roof">Re-Roof</option>
          <option value="New Roof">New Roof</option>
        </select>
      </label>

      <label>
        Roof Material:
        <select value={material()} onInput={(e) => setMaterial(e.target.value)}>
          {materials.map((m) => (
            <option value={m}>{m}</option>
          ))}
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
          {estimate().message ? (
            <p><strong>Note:</strong> {estimate().message}</p>
          ) : (
            <>
              <p><strong>Project Type:</strong> {estimate().project}</p>
              <p><strong>Material:</strong> {estimate().material}</p>
              <p><strong>Area:</strong> {estimate().sqft} sq ft</p>
              <p><strong>Rate:</strong> ${estimate().rate}/ft²</p>
              <p><strong>Estimated Cost:</strong> ${estimate().cost}</p>
              <hr />
              <p><em>Calculation:</em> {estimate().sqft} × {estimate().rate} = ${estimate().cost}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Estimator;