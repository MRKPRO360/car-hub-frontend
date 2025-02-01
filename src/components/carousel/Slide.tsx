function Slide({ data }: { data: { text: string; img: string } }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, 1), rgba(13, 27, 42, 0.5)), url(${data.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '85vh',
      }}
      className="min-w-screen text-light relative"
    >
      <div className="absolute top-[40%] left-40">
        <h1 className="mb-2 font-semibold text-2xl ">{data.text}</h1>
        <p className="font-light text-3xl">30 MONTHS | 0%</p>
        <span className="font-light">Our birthday. Your gift</span>
        <button className="block mt-3 md:text-xl border-2 bg-light text-blue px-2 py-1">
          View More
        </button>
      </div>
    </div>
  );
}

export default Slide;
