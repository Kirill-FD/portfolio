import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div style={{ background: "#17171a", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
