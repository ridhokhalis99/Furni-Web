import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-white">
      <div className="pt-8 overflow-hidden relative py-72">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-24">
          <div>
            <div className="mt-40">
              <div className="max-w-xl space-y-5">
                <h1 className="font-poppins font-medium text-darkSmalt tracking-tight leading-tight text-5xl">
                  <strong>Bring Comfort</strong>
                  <br /> To Your
                  <strong> Home</strong>
                </h1>
                <p className="text-xl text-gray-500 w-4/5">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Incidunt, exercitationem nihil repudiandae magnam assumenda
                  totam.
                </p>
                <div>
                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-smalt hover:bg-darkSmalt focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkSmalt"
                  >
                    Discover
                  </Link>
                  <button
                    type="button"
                    className="inline-flex  ml-4 items-center px-4 py-2 border border-transparent font-medium rounded-md text-darkSmalt bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6">
          <div className="py-12 absolute inset-y-0 right-0 w-1/2">
            <div>
              <div className="absolute inset-y-0   bg-tangerine left-80 right-0 w-full" />
              <svg
                className="absolute top-8 right-1/2 -mr-3 m-0 left-0"
                width={400}
                height={400}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="dot"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200 rounded"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect width={300} height={300} fill="url(#dot)" />
              </svg>
            </div>
            <div className="relative max-w-none h-full z-10 scale-75">
              <img
                className="rounded-md h-full max-w-none shadow-xl border-16 border-white"
                src={require("../assets/images/heroPrimary.jpeg")}
                alt=""
              />
            </div>
            <div className="absolute max-w-none h-full -mt-80 ml-32 scale-75">
              <img
                className="rounded-md shadow-xl h-full max-w-none border-16 border-white"
                src={require("../assets/images/heroSecondary.jpg")}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
