import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AtlasPage from './pages/AtlasPage';
import VariablesPage from './pages/VariablesPage';
import DataTypesPage from './pages/DataTypesPage';
import OperatorsPage from './pages/OperatorsPage';
import ConditionsPage from './pages/ConditionsPage';
import LoopsPage from './pages/LoopsPage';
import FunctionsPage from './pages/FunctionsPage';
import ArraysPage from './pages/ArraysPage';
import ObjectsPage from './pages/ObjectsPage';
import ScopePage from './pages/ScopePage';
import HoistingPage from './pages/HoistingPage';
import ClosuresPage from './pages/ClosuresPage';
import CallbacksPage from './pages/CallbacksPage';
import PromisesPage from './pages/PromisesPage';
import AsyncAwaitPage from './pages/AsyncAwaitPage';
import EventLoopPage from './pages/EventLoopPage';
import DOMPage from './pages/DOMPage';
import DOMManipulationPage from './pages/DOMManipulationPage';
import EventsPage from './pages/EventsPage';
import WebApisPage from './pages/WebApisPage';
import TopicsPage from './pages/TopicsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-atlas-950 text-slate-100 font-sans selection:bg-brand-indigo selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main App Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AtlasPage />} />
          
          {/* Fundamentals */}
          <Route path="/learn/variables" element={<VariablesPage />} />
          <Route path="/learn/data-types" element={<DataTypesPage />} />
          <Route path="/learn/operators" element={<OperatorsPage />} />
          <Route path="/learn/conditions" element={<ConditionsPage />} />
          <Route path="/learn/loops" element={<LoopsPage />} />

          {/* Functions & Data */}
          <Route path="/learn/functions" element={<FunctionsPage />} />
          <Route path="/learn/arrays" element={<ArraysPage />} />
          <Route path="/learn/objects" element={<ObjectsPage />} />

          {/* JavaScript Behavior */}
          <Route path="/learn/scope" element={<ScopePage />} />
          <Route path="/learn/hoisting" element={<HoistingPage />} />
          <Route path="/learn/closures" element={<ClosuresPage />} />

          {/* Async JavaScript */}
          <Route path="/learn/callbacks" element={<CallbacksPage />} />
          <Route path="/learn/promises" element={<PromisesPage />} />
          <Route path="/learn/async-await" element={<AsyncAwaitPage />} />
          <Route path="/learn/event-loop" element={<EventLoopPage />} />

          {/* Browser APIs */}
          <Route path="/learn/dom" element={<DOMPage />} />
          <Route path="/learn/dom-manipulation" element={<DOMManipulationPage />} />
          <Route path="/learn/events" element={<EventsPage />} />
          <Route path="/learn/web-apis" element={<WebApisPage />} />

          {/* Global Pages */}
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
