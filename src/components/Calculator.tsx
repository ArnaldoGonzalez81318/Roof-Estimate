import { createSignal } from 'solid-js';

export default function Calculator() {
  const [projectType, setProjectType] = createSignal('');
  const [material, setMaterial] = createSignal('');
  const [area, setArea] = createSignal<number | ''>('');
  const [cost, setCost] = createSignal<string | number>('');

  const calculateEstimate = () => {
    if (projectType() === 'New Roof') return setCost('Contact Directly');

    const areaVal = Number(area());
    if (!areaVal) return setCost('Enter valid area');

    let rate = 0;

    if (material() === 'Low-Slope') {
      rate = areaVal < 1000 ? 9.5 : 7.0;
    } else if (areaVal < 1000) {
      if (material() === 'Shingle') rate = 8.5;
      else if (material() === 'Tile') rate = 9.5;
    } else if (areaVal <= 2500) {
      if (['Shingle', 'Tile'].includes(material())) rate = 9.5;
    } else if (areaVal > 2500 && material() === 'Metal') {
      rate = 10.5;
    } else {
      return setCost('Contact Directly');
    }

    setCost(`$${(rate * areaVal).toFixed(2)}`);
  };

  return (
    <div class="max-w-xl mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Estimate Calculator</h2>

      <label class="block mb-2">Project Type</label>
      <select value={projectType()} onInput={(e) => setProjectType(e.currentTarget.value)} class="mb-4 p-2 w-full">
        <option value="">Select</option>
        <option>Re-Roof</option>
        <option>New Roof</option>
      </select>

      <label class="block mb-2">Roof Material</label>
      <select value={material()} onInput={(e) => setMaterial(e.currentTarget.value)} class="mb-4 p-2 w-full">
        <option value="">Select</option>
        <option>Shingle</option>
        <option>Tile</option>
        <option>Metal</option>
        <option>Low-Slope</option>
      </select>

      <label class="block mb-2">Area (ft²)</label>
      <input type="number" value={area()} onInput={(e) => setArea(Number(e.currentTarget.value))} class="mb-4 p-2 w-full" />

      <button onClick={calculateEstimate} class="px-4 py-2 bg-blue-600 text-white rounded">Calculate</button>

      {cost() && <p class="mt-4 text-lg font-semibold">Estimated Cost: {cost()}</p>}
    </div>
  );
}