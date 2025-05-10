import carWithRoad from '../../assets/images/car with road.jpg';
import Cta from '../shared/Cta';

function LoveOnline() {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,2525, 1) 0%, rgba(0,0,0,0.1) 80%), url(${carWithRoad})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
      className={`py-12 lg:py-18 text-center min-h-[60vh]`}
    >
      <div>
        <h2 className="text-4xl font-bold  text-gray-900 mb-6">
          A better way to &nbsp;
          <span className="text-blue-600">buy a pre-loved</span>
          <br />
          car entirely online
        </h2>

        <p className="mb-8">
          Connecter adipiscing elit duis tristique sollicitudin cursus vitae
          convallis.
        </p>
        <Cta arrowRight={true} text="Browse 4,020 Cars" />
      </div>
    </section>
  );
}

export default LoveOnline;
