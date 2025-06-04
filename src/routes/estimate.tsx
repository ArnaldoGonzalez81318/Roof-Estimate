import { createSignal } from 'solid-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Estimate() {
  const [projectType, setProjectType] = createSignal('');
  const [material, setMaterial] = createSignal('');
  const [area, setArea] = createSignal<number | ''>('');
  const [result, setResult] = createSignal<string>('');
  const [explanation, setExplanation] = createSignal<string>('');

  const calculate = () => {
    const pt = projectType();
    const mat = material();
    const ft2 = Number(area());

    if (!pt || !mat || !ft2 || ft2 <= 0) {
      setResult('Please fill out all fields.');
      setExplanation('');
      return;
    }

    if (pt === 'New Roof') {
      setResult('Contact Directly for New Roof estimates.');
      setExplanation('');
      return;
    }

    let rate: number | null = null;
    let reason = '';

    if (pt === 'Re-Roof') {
      if (mat === 'Low-Slope') {
        rate = ft2 < 1000 ? 9.5 : 7.0;
        reason = ft2 < 1000
          ? 'Low-Slope roofs under 1,000 ft² are charged at $9.50 per ft².'
          : 'Low-Slope roofs over 1,000 ft² are charged at $7.00 per ft².';
      } else if (mat === 'Shingle' && ft2 < 1000) {
        rate = 8.5;
        reason = 'Shingle roofs under 1,000 ft² are charged at $8.50 per ft².';
      } else if (mat === 'Tile' && ft2 >= 1000 && ft2 <= 2500) {
        rate = 9.5;
        reason = 'Tile roofs between 1,000 and 2,500 ft² are charged at $9.50 per ft².';
      } else if (mat === 'Metal' && ft2 > 2500) {
        rate = 10.5;
        reason = 'Metal roofs over 2,500 ft² are charged at $10.50 per ft².';
      }
    }

    if (rate === null) {
      setResult('Contact Directly for this project combination.');
      setExplanation('');
    } else {
      const costValue = rate * ft2;

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const formattedCost = formatter.format(costValue);
      const formattedRate = formatter.format(rate);

      setResult(`Estimated Cost: ${formattedCost}`);
      setExplanation(`
🧾 Roofing Estimate Recipe

👷 Project Type:      ${pt}
🔨 Roof Material:     ${mat}
📐 Roof Area:         ${ft2.toLocaleString()} ft²

💡 Rate Explanation:
${reason}

📊 Calculation:
${ft2.toLocaleString()} × ${formattedRate} = ${formattedCost}

💬 Total Estimate:    ${formattedCost}
      `.trim());
    }
  };

  return (
    <>
      <Header />
      <section class="estimate">
        <main class="calculator">
          <h1>Estimate Calculator</h1>

          <label for="projectType" class="project-type-label">
            Project Type:
          </label>
          <select
            id="projectType"
            value={projectType()}
            onInput={(e) => setProjectType(e.currentTarget.value)}
          >
            <option value="">Select</option>
            <option>Re-Roof</option>
            <option>New Roof</option>
          </select>

          <label for="material" class="material-label">
            Roof Material:
          </label>
          <select
            id="material"
            value={material()}
            onInput={(e) => setMaterial(e.currentTarget.value)}
          >
            <option value="">Select</option>
            <option>Shingle</option>
            <option>Tile</option>
            <option>Metal</option>
            <option>Low-Slope</option>
            <option>Any</option>
          </select>

          <label for="area" class="area-label">
            Area (ft²):
          </label>
          <input
            id="area"
            type="number"
            placeholder="Enter square footage"
            value={area()}
            onInput={(e) => setArea(Number(e.currentTarget.value))}
          />

          <button class="estimate-button" onClick={calculate}>
            Estimate
          </button>

          {result() && <div class="result">{result()}</div>}
          {explanation() && (
            <pre class="explanation">
              <strong>Estimate Explanation:</strong>
              <br />
              {explanation()}
            </pre>
          )}
        </main>
      </section>
      <Footer />
    </>
  );
}