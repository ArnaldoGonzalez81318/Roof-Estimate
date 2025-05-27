import { A } from '@solidjs/router';

function Home() {
  return (
    <div class="home">
      <h1>Roofing KING Construction</h1>
      <p>
        Welcome to Roofing KING Construction, your premier destination for all
        your roofing needs in Florida. Whether you need a new roof, a re-roof,
        or repairs, our team of experts is here to help.
      </p>
      <p>
        Florida’s trusted experts in residential and commercial roofing.
      </p>
      <p>
        Use our free estimator to get a fast, accurate roofing cost based on your home’s square footage and project type.
      </p>
      <A href="/calculator" class="start-button">Get a Free Estimate</A>
    </div>
  );
}

export default Home;