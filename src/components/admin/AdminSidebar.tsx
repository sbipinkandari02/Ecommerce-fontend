import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

const AdminSidebar = () => {
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {phoneActive && (
          <motion.button
            id="hamburger"
            onClick={() => setShowModal(true)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiMenuAlt4 />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phoneActive && showModal && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={phoneActive ? { x: "-100%" } : false}
        animate={phoneActive ? { x: showModal ? "0%" : "-100%" } : false}
        transition={{ duration: 0.4, type: "tween" }}
      >
        {/* Logo */}
        <motion.div
          className="sidebar-logo"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <img
            src={logo}
            alt="ShopSphere Logo"
            style={{
              width: "150px",
              height: "auto",
              margin: "1rem",
              objectFit: "contain",
            }}
          />
        </motion.div>
        <DashboardContainer location={location} />
        <ChartContainer location={location} />

        <AnimatePresence>
          {phoneActive && (
            <motion.button
              id="close-sidebar"
              onClick={() => setShowModal(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              Close
            </motion.button>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
};

const DashboardContainer = ({ location }: { location: Location }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    <h5>Dashboard</h5>
    <ul>
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        location={location}
        index={0}
      />
      <Li
        url="/admin/product"
        text="Product"
        Icon={RiShoppingBag3Fill}
        location={location}
        index={1}
      />
      <Li
        url="/admin/customer"
        text="Customer"
        Icon={IoIosPeople}
        location={location}
        index={2}
      />
      <Li
        url="/admin/transaction"
        text="Transaction"
        Icon={AiFillFileText}
        location={location}
        index={3}
      />
    </ul>
  </motion.div>
);

const ChartContainer = ({ location }: { location: Location }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
    <h5>Charts</h5>
    <ul>
      <Li
        url="/admin/chart/bar"
        text="Bar"
        Icon={FaChartBar}
        location={location}
        index={4}
      />
      <Li
        url="/admin/chart/pie"
        text="Pie"
        Icon={FaChartPie}
        location={location}
        index={5}
      />
      <Li
        url="/admin/chart/line"
        text="Line"
        Icon={FaChartLine}
        location={location}
        index={6}
      />
    </ul>
  </motion.div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
  index?: number;
}

const Li = ({ url, text, location, Icon, index = 0 }: LiProps) => {
  const isActive = location.pathname.includes(url);
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className={isActive ? "active" : ""}
      whileHover={{ paddingLeft: "1.5rem" }}
    >
      <Link to={url}>
        <motion.span
          className="icon-wrapper"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          <Icon />
        </motion.span>
        <motion.span
          whileHover={{ letterSpacing: "0.05em" }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.span>
      </Link>
    </motion.li>
  );
};

export default AdminSidebar;
