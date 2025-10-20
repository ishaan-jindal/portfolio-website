import ScrollSection from '../utils/ScrollSection';

const ContactSection = () => {
  return (
    <ScrollSection>
      <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
              Name
            </label>
            <input className="appearance-none block w-full bg-neutral-800 border border-neutral-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-neutral-700" id="grid-first-name" type="text" placeholder="Jane" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-last-name">
              Email
            </label>
            <input className="appearance-none block w-full bg-neutral-800 border border-neutral-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-neutral-500" id="grid-last-name" type="email" placeholder="Doe@example.com" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-password">
              Message
            </label>
            <textarea className=" no-resize appearance-none block w-full bg-neutral-800 border border-neutral-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-neutral-700 focus:border-neutral-500 h-48 resize-none" id="message"></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button className="shadow bg-red-600 hover:bg-red-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Send
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
    </ScrollSection>
  );
};

export default ContactSection;
