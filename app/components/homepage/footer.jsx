import React from "react";

function FooterSection() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div>
        <p className="text-white text-4xl text-center p-10">VIRTUALSEOWEB</p>
        <p className="text-white px-[15em] py-5 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias unde
          mollitia, sapiente, nisi pariatur labore nihil molestiae reiciendis,
          neque necessitatibus officiis incidunt quasi magni amet dolores? Ab
          iste eligendi autem. Eaque earum dolores explicabo, nostrum corrupti,
          aperiam suscipit amet dolore provident sequi, quod distinctio quam
          culpa dignissimos eligendi. Atque aut ea, maxime temporibus voluptate
          quaerat. Nostrum libero delectus dolores nobis dolore culpa dolorem
          harum cupiditate aspernatur ad. Facilis facere delectus,
          necessitatibus itaque inventore nam voluptas, alias aperiam, ut ea
          amet obcaecati. Facilis, iure accusantium magni reiciendis ullam
          incidunt asperiores voluptatibus sed expedita praesentium laborum
          atque, omnis porro voluptates ex vel?
        </p>
      </div>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Company Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-6 uppercase">
              Company
            </h2>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Brand Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Help Center Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-6 uppercase">
              Help Center
            </h2>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-6 uppercase">
              Legal
            </h2>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Download Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-6 uppercase">
              Download
            </h2>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-gray-400">
                  iOS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Windows
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  MacOS
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-6 uppercase">
              Follow Us
            </h2>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v-2h2v2z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12.29v-.03c.01-.2.03-.4.03-.6s-.02-.4-.03-.6v-.03C22.4 11.24 22.38 11 22 11c-2.26 0-4.27.78-5.91 2.09-1.36-1.11-3.08-1.79-5.09-1.79-3.58 0-6.5 2.92-6.5 6.5s2.92 6.5 6.5 6.5c1.94 0 3.71-.74 5.08-1.95 1.48 1.27 3.41 2.06 5.55 2.06 4.14 0 7.5-3.36 7.5-7.5s-3.36-7.5-7.5-7.5c-.4 0-.79.03-1.18.07.08-.4.12-.82.12-1.24 0-1.48-.64-2.8-1.68-3.7 1.07-.03 2.13-.41 3.01-1.03-1.01-1.29-2.53-2.11-4.22-2.11-2.24 0-4.25 1.07-5.53 2.73-1.28-1.66-3.29-2.73-5.53-2.73-3.79 0-6.89 3.1-6.89 6.89 0 3.79 3.1 6.89 6.89 6.89 1.5 0 2.93-.48 4.09-1.29 1.42 1.56 3.47 2.65 5.62 2.65 4.73 0 8.5-3.77 8.5-8.5s-3.77-8.5-8.5-8.5z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.712 2.289a10.96 10.96 0 0 0-3.118.638c-1.243.374-2.344.927-3.377 1.606a6.1 6.1 0 0 0-2.415-.447C6.262 4.084 5.356 5.54 5.356 7.129c0 1.835 1.014 3.599 2.542 4.408.717.305 1.515.463 2.324.463.548 0 1.078-.095 1.587-.283.612-.234 1.19-.622 1.72-1.093.678-.629 1.338-1.267 1.984-1.88.06-.055.092-.126.092-.197 0-.055-.022-.104-.064-.148-.042-.044-.102-.067-.164-.067h-1.4c-.485 0-.975.195-1.326.553-.357.357-.544.863-.544 1.365v.044c0 .049-.015.097-.043.142-.028.046-.072.088-.121.117-.057.029-.115.046-.176.046s-.12-.017-.176-.046a.25.25 0 0 1-.121-.117c-.027-.046-.042-.094-.042-.142v-1.2c0-.663-.225-1.289-.632-1.795-.408-.504-.98-.84-1.618-1.07-1.013-.388-2.066-.603-3.122-.603-1.97 0-3.89.731-5.355 2.051a6.833 6.833 0 0 0-1.847 5.34c.005.191.035.377.095.562s.142.358.249.521c.122.186.269.362.431.53.072.061.158.106.246.133.079.026.167.043.256.043h2.688c.074 0 .148-.014.22-.043.211-.061.418-.138.62-.237.182-.087.354-.208.516-.355a3.926 3.926 0 0 0 .257-.253c.12-.119.213-.249.295-.394.074-.136.134-.277.179-.419.06-.146.097-.293.097-.447v-1.4c0-.486.195-.975.553-1.326.357-.357.862-.544 1.365-.544h.032c.559 0 1.124-.23 1.524-.647.329-.333.542-.785.542-1.274v-.039c0-.016.004-.031.012-.045a4.5 4.5 0 0 0 .08-.646c.001-.027.008-.053.022-.078s.032-.046.055-.062c.042-.029.089-.049.137-.056s.1-.012.146.014c.063.033.121.084.165.146.043.068.068.144.068.226v.127c0 .059-.023.117-.064.161-.04.045-.094.074-.154.074-.042 0-.083-.013-.117-.036-.095-.055-.19-.104-.295-.143a4.737 4.737 0 0 0-.322-.118c-.027-.005-.054-.017-.08-.022-.16-.034-.322-.058-.485-.058-.551 0-1.103.135-1.6.386a2.969 2.969 0 0 0-1.223 1.085c-.222.333-.35.705-.35 1.107v2.18c0 .493.144.973.391 1.382.267.431.648.788 1.084 1.078.678.467 1.453.774 2.267.774.978 0 1.937-.264 2.768-.764a8.417 8.417 0 0 0 2.171-1.98c.588-.713 1.098-1.497 1.577-2.298.077-.131.141-.268.184-.414.048-.138.072-.285.072-.43v-2.373a4.186 4.186 0 0 0-.577-2.095c-.188-.319-.411-.629-.663-.921a3.362 3.362 0 0 0-1.154-.789c-.386-.092-.771-.138-1.162-.138-.415 0-.823.047-1.226.14-.385.088-.769.236-1.139.45a4.116 4.116 0 0 0-1.308 1.218c-.264.354-.49.737-.66 1.138a4.146 4.146 0 0 0-.233.92c-.009.048-.014.094-.021.142a4.234 4.234 0 0 0-.074.827v2.226c0 .433.062.862.182 1.273.109.38.264.742.457 1.086a3.873 3.873 0 0 0 .764 1.113c.396.429.821.825 1.294 1.196.785.655 1.697 1.191 2.661 1.516.625.18 1.293.274 1.978.274 1.09 0 2.156-.338 3.089-.955a6.78 6.78 0 0 0 2.436-2.61 6.56 6.56 0 0 0 1.1-3.578c0-2.18-.89-4.188-2.336-5.578a7.158 7.158 0 0 0-4.761-2.061zM19.5 12c0-.64.338-1.165.838-1.506a4.653 4.653 0 0 0 1.16-1.163c.314-.34.494-.785.494-1.278v-.154a3.226 3.226 0 0 0-.526-1.457c-.418-.608-.969-1.082-1.596-1.5-.538-.336-1.135-.582-1.762-.751a4.204 4.204 0 0 0-1.36-.174c-1.014.05-2.009.477-2.812 1.198-.757.755-1.161 1.756-1.161 2.775v.146c0 1.016.414 2.016 1.15 2.764.786.813 1.817 1.42 2.904 1.63a4.87 4.87 0 0 0 1.82.133c.467-.052.936-.16 1.342-.34.731-.285 1.408-.71 2.032-1.23.58-.497 1.074-1.057 1.493-1.716.405-.63.652-1.338.652-2.052z" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v-2h2v2z" />
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 text-center py-4">
        <p className="text-gray-300 text-sm">
          © 2024 PRWebTechno. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
