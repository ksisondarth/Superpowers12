import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import CommunityChat from './components/CommunityChat'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Portfolio />
          <Contact />
          <CommunityChat />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
