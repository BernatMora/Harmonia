import React, { useState } from 'react';
import { BookOpen, Search, ArrowLeft, ChevronRight, Target, CheckCircle } from 'lucide-react';
import { educationalChapters, searchConcepts, type EducationChapter, type EducationSection } from '../data/educationalContent';

interface EducationSystemProps {
  onBack: () => void;
}

export function EducationSystem({ onBack }: EducationSystemProps) {
  const [selectedChapter, setSelectedChapter] = useState<EducationChapter | null>(null);
  const [selectedSection, setSelectedSection] = useState<EducationSection | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const searchResults = searchQuery ? searchConcepts(searchQuery) : educationalChapters;

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Expert': return 'text-yellow-400 bg-yellow-400/10';
      case 'Master': return 'text-red-400 bg-red-400/10';
      case 'Professional': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  // Vista de secció individual
  if (selectedSection && selectedChapter) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedSection(null)}
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Tornar al capítol
          </button>
          
          {!completedSections.has(selectedSection.id) && (
            <button
              onClick={() => markSectionComplete(selectedSection.id)}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Marcar com completat
            </button>
          )}
        </div>

        <div className="bg-slate-800/50 rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{selectedSection.title}</h1>
            <p className="text-gray-400">Capítol: {selectedChapter.title}</p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <div className="whitespace-pre-line text-gray-300 leading-relaxed">
              {selectedSection.content}
            </div>
          </div>

          {selectedSection.examples && selectedSection.examples.length > 0 && (
            <div className="mt-8 bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-4">Exemples:</h3>
              <ul className="space-y-2">
                {selectedSection.examples.map((example, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedSection.exercises && selectedSection.exercises.length > 0 && (
            <div className="mt-6 bg-green-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">Exercicis Pràctics:</h3>
              <ul className="space-y-2">
                {selectedSection.exercises.map((exercise, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <Target className="h-4 w-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                    {exercise}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedSection.relatedConcepts && selectedSection.relatedConcepts.length > 0 && (
            <div className="mt-6 bg-purple-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">Conceptes Relacionats:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSection.relatedConcepts.map((concept, index) => (
                  <span
                    key={index}
                    className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vista de capítol individual
  if (selectedChapter) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedChapter(null)}
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Tornar a la llista
          </button>
          
          <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(selectedChapter.difficulty)}`}>
            {selectedChapter.difficulty}
          </span>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-white mb-4">{selectedChapter.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{selectedChapter.description}</p>
          
          {selectedChapter.prerequisites && (
            <div className="bg-orange-900/20 rounded-lg p-4">
              <h3 className="text-orange-300 font-semibold mb-2">Prerequisits:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedChapter.prerequisites.map((prereq, index) => (
                  <span
                    key={index}
                    className="bg-orange-600/30 text-orange-200 px-2 py-1 rounded text-sm"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Seccions del Capítol:</h2>
          {selectedChapter.sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-slate-800/30 rounded-lg p-6 hover:bg-slate-700/50 transition-colors cursor-pointer"
              onClick={() => setSelectedSection(section)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {section.content.substring(0, 150)}...
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {completedSections.has(section.id) && (
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  )}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista principal amb cerca
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Biblioteca d'Aprenentatge</h1>
          <p className="text-gray-300">Teoria musical jazz avançada per a professionals</p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Tornar al menú
        </button>
      </div>

      {/* Cerca */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Cerca conceptes (harmonia negativa, voice leading, upper structures...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Resultats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {searchResults.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-slate-800/30 rounded-lg p-6 hover:bg-slate-700/50 transition-colors cursor-pointer"
            onClick={() => setSelectedChapter(chapter)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{chapter.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(chapter.difficulty)}`}>
                    {chapter.difficulty}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <p className="text-gray-300 mb-4">{chapter.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {chapter.sections.length} seccions
              </span>
              <span className="text-blue-400">
                {chapter.sections.filter(s => completedSections.has(s.id)).length}/{chapter.sections.length} completades
              </span>
            </div>
          </div>
        ))}
      </div>

      {searchResults.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No s'han trobat resultats per "{searchQuery}"</p>
          <p className="text-gray-500 text-sm mt-2">
            Prova amb: harmonia negativa, upper structures, voice leading, coltrane changes
          </p>
        </div>
      )}
    </div>
  );
}