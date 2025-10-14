"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Whyus from "./components/Whyus";
import Contact from "./components/Contact";


export default function Home() {
  return (
    <>
    <Hero/>
    <About/>
    <Services/>
    <Projects/>
    <Whyus/>
    <Contact/>
    </>
  );
}
