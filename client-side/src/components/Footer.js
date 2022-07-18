/* eslint-disable jsx-a11y/anchor-is-valid */
function Footer() {
  return (
    <footer className="mt-32 bg-powderBlue">
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-2">
          <div className="space-y-4">
            <span className="text-3xl font-roboto font-bold whitespace-nowrap text-darkSmalt">
              Furni
            </span>
            <p className="w-1/2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis aut voluptates quam dolorem eos consequatur minima odio
              nisi sit quas.
            </p>
            <div className="mt-4">
              <h3 className="text-darkSmalt font-semibold">
                Customer Service Hours
              </h3>
              <p>9 a.m - 6 p.m</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-darkSmalt tracking-wider uppercase">
                Info
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="">Contact Us</a>
                </li>
                <li>
                  <a href="">Shipping</a>
                </li>
                <li>
                  <a href="">Return & Exchanges</a>
                </li>
                <li>
                  <a href="">Privacy Policy</a>
                </li>
                <li>
                  <a href="">Terms of Use</a>
                </li>
                <li>
                  <a href="">FAQs</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-darkSmalt tracking-wider uppercase">
                Payment Options
              </h3>
              <img
                className="mt-4 w-3/4"
                src={require("../assets/images/available-payment.png")}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-darkSmalt text-center">&copy; 2022 Furni.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
