// components/HowItWorks.tsx
import { CookingPot, HandPlatter, PackageCheck, Smile } from 'lucide-react';

const steps = [
  {
    icon: <CookingPot className="h-8 w-8 text-primary" />,
    title: 'Choose Your Meal',
    description:
      'Browse our menu and select meals that match your taste and preferences.',
  },
  {
    icon: <HandPlatter className="h-8 w-8 text-primary" />,
    title: 'Customize Ingredients',
    description:
      'Tailor spice levels, ingredients, and portion sizes for each dish.',
  },
  {
    icon: <PackageCheck className="h-8 w-8 text-primary" />,
    title: 'Place Your Order',
    description:
      'Confirm your order and we’ll handle the preparation and packaging.',
  },
  {
    icon: <Smile className="h-8 w-8 text-primary" />,
    title: 'Enjoy Your Meal',
    description:
      'Receive fresh meals at your doorstep and enjoy a hassle-free dining experience.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
