import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[450px] bg-[#3A3845] md:bg-[url('src/assets/contact_header.png')] bg-cover">
        <div className="absolute left-1/3 transform -translate-x-1/2 top-0 bottom-0 w-full md:w-[420px] bg-[#3A3845] flex flex-col justify-center items-center p-8 space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#C69B7B] flex items-center justify-center">
              <Mail size={64} color="#3A3845" />
            </div>
            <h2 className="text-white text-3xl font-semibold uppercase font-garamond">
              Contact Us
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-5 pt-6 border-t border-[#CAC9CF]">
            <p className="text-white text-sm font-semibold">
              Follow us on social media
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, name: 'facebook' },
                { icon: Twitter, name: 'twitter' },
                { icon: Instagram, name: 'instagram' },
                { icon: Linkedin, name: 'linkedin' },
                { icon: Youtube, name: 'youtube' },
              ].map(({ icon: Icon, name }) => (
                <a
                  key={name}
                  href={`https://${name}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-[#C69B7B] rounded-full flex items-center justify-center"
                >
                  <Icon size={16} color="#3A3845" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 my-12">
        <h1 className="text-4xl font-bold text-[#3A3845] uppercase font-garamond">
          Get in touch with us
        </h1>
        <p className="text-lg text-[#595667] max-w-xl text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mb-12">
        {[
          {
            icon: Clock,
            title: 'Office Hours',
            content: 'Monday - Friday  8:00 am to 5:00 pm',
          },
          { icon: Mail, title: 'Email', content: 'contact@company.com' },
          { icon: Phone, title: 'Phone', content: '(414) 687 - 5892' },
          { icon: MapPin, title: 'Location', content: '59 Middle Point Rd' },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <item.icon size={24} className="text-[#C69B7B] mb-2" />
            <h3 className="font-semibold text-[#595667] mb-2">{item.title}</h3>
            <p className="text-[#C69B7B] text-center">{item.content}</p>
          </div>
        ))}
      </div>

      <form className="w-full max-w-3xl px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {['Name', 'Email', 'Phone', 'Company'].map(field => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field.toLowerCase()}
                className="mb-2 font-semibold text-[#3A3845]"
              >
                {field}:
              </label>
              <input
                type={
                  field === 'Email'
                    ? 'email'
                    : field === 'Phone'
                      ? 'tel'
                      : 'text'
                }
                id={field.toLowerCase()}
                name={field.toLowerCase()}
                required={field !== 'Company'}
                className="p-3 border border-[#3A3845] focus:ring-2 focus:ring-[#3A3845] outline-none"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col mb-6">
          <label
            htmlFor="message"
            className="mb-2 font-semibold text-[#3A3845]"
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="p-3 border border-[#3A3845] focus:ring-2 focus:ring-[#3A3845] outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#3A3845] text-white py-3 px-6 hover:bg-[#4a4855] transition duration-300"
        >
          Send Message
        </button>
      </form>

      <div className="w-full h-[420px] bg-[url('src/assets/contact_footer.png')] bg-cover bg-no-repeat bg-center"></div>
    </div>
  );
};

export default Contact;
