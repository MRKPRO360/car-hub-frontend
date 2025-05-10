import { Zap, BatteryCharging, SwitchCamera, Recycle } from 'lucide-react';
import hybridCar from '../../assets/images/hybrid.png';
import Cta from '../shared/Cta';
const hybridBenefits = [
  {
    title: 'Effortless Acceleration',
    description:
      'Experience smooth, responsive acceleration thanks to hybrid technology’s instant torque and power delivery.',
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Self-Charging on the Go',
    description:
      'Hybrids convert braking and deceleration energy into electricity, recharging the battery as you drive.',
    icon: <BatteryCharging className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Smart Energy Switching',
    description:
      'Automatically alternate between electric and petrol power for optimal performance and fuel savings.',
    icon: <SwitchCamera className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Sustainable by Design',
    description:
      'Advanced regenerative braking and energy reuse reduce waste and promote sustainability in hybrid technology.',
    icon: <Recycle className="w-8 h-8 text-primary" />,
  },
];

const Benefit = () => {
  return (
    <section className="container mx-auto py-12 lg:py-18 px-4 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img
            src={hybridCar}
            alt="Hybrid Vehicles"
            className="w-full h-auto"
          />
        </div>
        <div>
          <h2 className="text-4xl font-bold  text-gray-900 mb-6">
            What are the <span className="text-blue-600">Benefits</span>
            &nbsp;of <br />
            <span className="text-blue-600">Hybrid</span>
            &nbsp;Vehicles
          </h2>
          <p className="text-gray-600 leading-tighter mb-4">
            With a hybrid, you get all the power and torque advantages of an
            electric vehicle while also gaining the flexibility of a petrol
            engine. Enjoy efficient travel, reduced CO₂ emissions, and a driving
            experience that combines sustainability and performance.
          </p>
          <Cta
            arrowRight={true}
            variant="outline"
            text="Browse all hybrid cars"
          ></Cta>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
        {hybridBenefits.map((item, index) => (
          <div
            key={index}
            className="bg-primary-50 p-10 first:pl-0 last:pr-0 flex justify-center flex-col items-center text-center"
          >
            <div className="mb-6 ">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-tighter">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefit;
