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
    <section className="text-gray-600 body-font py-24 my-2 mt-5">
  <div className="container d-flex justify-content-center align-items-center flex-column">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
        Have a question or need assistance? Reach out to us,<br /> and we'll get back to you shortly!
      </p>
    </div>
    <div className="row justify-content-center align-items-center col-12">
      <form onSubmit={onSubmit} className="col-md-6 d-flex flex-column justify-content-center align-items-center">
        <div className="mb-3 w-100">
          <label htmlFor="name" className="form-label"></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            className="form-control"
          />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="email" className="form-label"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            className="form-control"
          />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="message" className="form-label"></label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
            className="form-control"
            rows="4"
          ></textarea>
        </div>
        <div className="w-100">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

  );
}

export default Contact;
