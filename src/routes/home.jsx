import { A } from '@solidjs/router';

function Home() {
  return (
    <div class="home">
      <h1>Welcome to Florida Roof Cost Estimator</h1>
      <p>
        Estimate your roofing project cost in seconds based on roof type and square footage.
      </p>
      <A href="/calculator" class="start-button">Start Estimating</A>
    </div>
  );
}

export default Home;