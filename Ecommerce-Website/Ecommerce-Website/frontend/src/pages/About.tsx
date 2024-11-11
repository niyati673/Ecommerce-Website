const About = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <section className="w-full py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 uppercase text-gray-800">
            About Kora
          </h2>
          <p className="text-lg text-gray-600">
            Kora's handmade ceramic products have been around since 1650, let's
            explore our journey.
          </p>
        </div>
      </section>

      <section className="w-full px-4">
        {[
          { year: '1910', image: '1.png' },
          { year: '1990', image: '2.png' },
          { year: '2010', image: '3.png' },
        ].map((item, index) => (
          <div
            key={item.year}
            className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="w-full md:w-1/2 bg-gray-100 p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">
                {item.year}
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
                phasellus mollis sit aliquam sit nullam neque ultrices.
              </p>
            </div>
            <div
              className="w-full md:w-1/2 h-80 bg-cover bg-center"
              style={{
                backgroundImage: `url('src/assets/about/${item.image}')`,
              }}
            ></div>
          </div>
        ))}
      </section>

      <section className="w-full px-4 py-24">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
          <div
            className="w-full md:w-1/2 h-96 bg-cover bg-center mb-8 md:mb-0"
            style={{ backgroundImage: "url('src/assets/about/4.png')" }}
          ></div>
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-8 uppercase text-gray-800">
              HOW WE WORK
            </h2>
            {['Product Design', 'Crafted', 'Sell Product'].map(item => (
              <div key={item} className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  {item}
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center uppercase text-gray-800">
            MEET OUR TEAM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'BERNIE PATTERSON',
                role: 'CEO & Founder',
                image: '5.png',
              },
              {
                name: 'OPHELIA VASE',
                role: 'Creative Director',
                image: '6.png',
              },
              {
                name: 'CORBIN HOSSAIN',
                role: 'Artist',
                image: '7.png',
              },
              { name: 'SEREN BOWL', role: 'Marketing', image: '8.png' },
            ].map(member => (
              <div key={member.name} className="flex flex-col items-center">
                <div
                  className="w-full h-80 bg-cover bg-center mb-4"
                  style={{
                    backgroundImage: `url('src/assets/about/${member.image}')`,
                  }}
                ></div>
                <h3 className="text-lg font-semibold uppercase text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-24 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg font-semibold mb-2 text-gray-600">
            Sign up for emails
          </p>
          <h2 className="text-3xl font-bold mb-8 uppercase text-gray-800">
            FOR NEW, COLLECTIONS & MORE
          </h2>
          <input
            className="w-full mb-4 p-3 border-b border-gray-800 focus:outline-none"
            placeholder="Enter your email address"
          />
          <button className="px-8 py-3 border border-gray-800 text-gray-800 font-semibold uppercase hover:bg-gray-800 hover:text-white transition duration-300">
            SIGN UP
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
