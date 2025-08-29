import { VectorMap } from '@react-jvectormap/core';
// import { worldMill } from '@react-jvectormap/world';
import worldMill from '@react-jvectormap/world/worldMill';

// Define the component props
interface CountryMapProps {
  mapColor?: string;
  countryData: {
    name: string;
    latLng: [number, number];
    customerCount: number;
  }[];
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor, countryData }) => {
  console.log(countryData);

  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: '#465FFF',
          r: 4, // Custom radius for markers
        } as any, // Type assertion to bypass strict CSS property checks
      }}
      markersSelectable={true}
      // markers={countryData.map((c) => ({
      //   latLng: [24, 90],
      //   name: `${c.name} (${c.customerCount})`,
      //   style: {
      //     fill: '#465FFF',
      //     borderWidth: 1,
      //     borderColor: 'white',
      //     stroke: '#383f47',
      //   },
      // }))}

      markers={[
        { latLng: [24, 90], name: 'Bangladesh' }, // ✅ test
        { latLng: [40.7128, -74.006], name: 'New York' }, // ✅ test
      ]}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || '#D0D5DD',
          fillOpacity: 1,
          fontFamily: 'Outfit',
          stroke: 'none',
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: 'pointer',
          fill: '#465fff',
          stroke: 'none',
        },
        selected: {
          fill: '#465FFF',
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: '#35373e',
          fontWeight: 500,
          fontSize: '13px',
          stroke: 'none',
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
