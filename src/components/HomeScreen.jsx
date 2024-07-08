import { GoProjectRoadmap } from "react-icons/go";
import { BsDeviceSsdFill } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa6";
import { ImConnection } from "react-icons/im";
import { FaChartLine } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";

import { PiPlugsConnectedFill } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlineQueryStats } from "react-icons/md";
import { LuGauge } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";
import { GiPowerLightning } from "react-icons/gi";

const primaryFeatures = [
  {
    name: "Project Handling",
    description:
      "Manage multiple IoT projects under a single account. Create projects and manage them with ease.",
    href: "#",
    icon: GoProjectRoadmap,
  },
  {
    name: "Device Handling",
    description:
      "Add devices to your projects and start monitoring your data in real-time. DataCanvas is built keeping highest security in mind",
    href: "#",
    icon: BsDeviceSsdFill,
  },
  {
    name: "Dataset Management",
    description:
      " Manage your datasets with ease. DataCanvas provides powerful tools to manage your data efficiently with comprehensive GUI to overcome lack of expertise",
    href: "#",
    icon: FaDatabase,
  },
  {
    name: "Easy Integration",
    description:
      "DataCanvas provides HTTP and MQTT APIs to integrate your devices with ease in real-time. Start monitoring your data in a few clicks",
    href: "#",
    icon: ImConnection,
  },
  {
    name: "Identify Variations",
    description:
      " DataCanvas provides powerful tools to identify variations in your data. Customized visualizations help you to understand your data better",
    href: "#",
    icon: FaChartLine,
  },
  {
    name: "Statistical Analytics",
    description:
      " DataCanvas provides statistical analytics to help you understand your data better. DataCanvas provides powerful tools to analyze your data",
    href: "#",
    icon: IoStatsChart,
  },
];
const secondaryFeatures = [
  {
    name: "Real Time Availability",
    description: "Send data real-time. View data real-time. ",
    icon: PiPlugsConnectedFill,
  },
  {
    name: "Security in Mind",
    description:
      "Secures your data with robust validations and security measures",
    icon: MdOutlineSecurity,
  },
  {
    name: "Statistics",
    description:
      " DataCanvas provides statistical analytics to help you understand your data better.",
    icon: MdOutlineQueryStats,
  },
  {
    name: "Customized Widgets",
    description:
      " DataCanvas provides customized widgets to help you understand your data better.",
    icon: LuGauge,
  },
  {
    name: "Freedom to you",
    description:
      " DataCanvas provides you the freedom to manage your data the way you want.",
    icon: MdDashboardCustomize,
  },
  {
    name: "Power-up Your Device",
    description:
      " DataCanvas provides powerful tools to manage your data efficiently with comprehensive GUI to overcome lack of expertise.",
    icon: GiPowerLightning,
  },
];
const stats = [
  { id: 1, name: "Developers on the platform", value: "10+" },
  { id: 2, name: "Daily requests", value: "2000+" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Projects deployed", value: "3+" },
];
const footerNavigation = {
  solutions: [
    { name: "Hosting", href: "#" },
    { name: "Data Services", href: "#" },
    { name: "Uptime Monitoring", href: "#" },
    { name: "Enterprise Services", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Reference", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Globe",
      href: "https://hypercube.lk/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8c0-2.21-.89-4.21-2.34-5.66C12.21 5.89 10.21 5 8 5v2c1.65 0 3 1.35 3 3s-1.35 3-3 3v2c2.21 0 4.21-.89 5.66-2.34C15.11 12.21 16 10.21 16 8zm-4 4c2.21 0 4-1.79 4-4s-1.79-4-4-4v8z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/hypercube-cs/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm13.5 12.3h-3v-5.6c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9v5.7h-3v-11h2.9v1.5h.1c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 2 3.5 4.6v6.4z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/HyperCube-Consultancy-Services/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function HomeScreen() {
  return (
    <div className="bg-black">
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
            />
          </svg>
          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#a3e6bc] to-[#3ECF8E] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <div className="flex justify-start items-center cursor-pointer">
                <img
                  src={process.env.PUBLIC_URL + "/img/logo.png"}
                  alt="Logo"
                  className=" w-8"
                />
                <span className="text-xl text-gray2 font-bold font-poppins ml-2">
                  DataCanvas
                </span>
              </div>
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <a href="#" className="inline-flex space-x-6">
                  <span className="rounded-full bg-green/10 px-3 py-1 text-sm font-semibold leading-6 text-green ring-1 ring-inset ring-green/20">
                    Latest updates
                  </span>
                  {/* <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                    <span>Just shipped v1.0</span>
                    <FaArrowsSplitUpAndLeft
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </span> */}
                </a>
              </div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                DataCanvas
              </h1>
              <h3 className="mt-3 text-4xl font-bold tracking-tight text-white">Your IoT Companion</h3>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Manage your IoT data seamlessly with powerful device and dataset
                management tools. Integrate your devices and start monitoring in
                a few clicks.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="/signup"
                  className="rounded-md bg-green px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                >
                  Get started
                </a>
                <a
                  href="/login"
                  className="text-sm font-semibold leading-6 text-green"
                >
                  Login <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  src={process.env.PUBLIC_URL + "/img/home/1.png"}
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-green">
            Our Ecosystem
          </h2>
          <div className="w-full mt-10 flex justify-center items-center">
            <img
              className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
              src={process.env.PUBLIC_URL + "/img/home/brands/1.png"}
              alt="Hypercube"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
              src={process.env.PUBLIC_URL + "/img/home/brands/2.png"}
              alt="University of Moratuwa"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
              src={process.env.PUBLIC_URL + "/img/home/brands/3.png"}
              alt="IES Labs"
              width={158}
              height={48}
            />
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green">
              Faster Integration
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need for your IoT platform
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Make your IoT platform more efficient with our powerful tools. We
              provide everything you need to get started.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {primaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-green">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                    {/* <p className="mt-6">
                      <a
                        href={feature.href}
                        className="text-sm font-semibold leading-6 text-green"
                      >
                        Learn more <span aria-hidden="true">→</span>
                      </a>
                    </p> */}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Feature section */}
        <div className="mt-32 sm:mt-56">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-green">
                Everything you need
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                No server? No problem.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Server handling and overhead of managing datasets is not
                anymore! DataCanvas provides powerful tools to manage your data
                efficiently with comprehensive GUI to overcome lack of
                expertise.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <img
                src={process.env.PUBLIC_URL + "/img/home/2.png"}
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
              <div className="relative" aria-hidden="true">
                <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-[#012313] pt-[7%]" />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-white">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5 text-green"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-base font-semibold leading-8 text-green">
              Our track record
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by hundreds of developers&nbsp;in Sri Lanka
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Get connected with DataCanvas and start monitoring your data in a
              few clicks. DataCanvas provides powerful tools to manage your data
              efficiently with comprehensive GUI to overcome lack of expertise.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col gap-y-3 border-l border-white/10 pl-6"
              >
                <dt className="text-sm leading-6">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1d4240dd-898f-445f-932d-e2872fd12de3"
                width={200}
                height={200}
                x="50%"
                y={0}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={0} className="overflow-visible fill-gray-800/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)"
            />
          </svg>
          <div
            className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#3ECF8E] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Build the next
              <br />
              Groundbreaking IoT Product with DataCanvas
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Start free! No credit card required. Get started with DataCanvas Today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-green px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a>
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-green"
              >
                Login <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer aria-labelledby="footer-heading" className="relative">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 lg:px-8">
          <div className="border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6 text-green" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
              &copy; 2024 Hypercube, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
