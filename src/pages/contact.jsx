import React from 'react';

function Contact() {
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setLoading(true);
    const formData = new FormData(event.target);
    
    // Append access key to form data
    formData.append("access_key", "3070b740-35cc-4484-b4bb-b8c09ba5ee2c");

    try {
      // Send form data to Web 3 Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log("Error", error);
      setResult("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container-fluid px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form onSubmit={onSubmit} className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input type="text" id="name" name="name" required className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" required className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                <textarea id="message" name="message" required className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button type="submit" disabled={loading} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <span>{result}</span>
              <a className="text-indigo-500">example@email.com</a>
              <p className="leading-normal my-5">49 Smith St.<br />Saint Cloud, MN 56301</p>
              <span className="inline-flex">
                {/* Add social media icons as needed */}
                <a className="text-gray-500" href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="ml-4 text-gray-500" href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="ml-4 text-gray-500" href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="ml-4 text-gray-500" href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
