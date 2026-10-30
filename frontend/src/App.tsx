import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type Profile = 'kids' | 'teens'

type Subject = {
  name: string
  icon: string
  accent: string
  progress: number
  lessons: number
}

type Question = {
  prompt: string
  options: string[]
  correct: string
  explanation: string
}

const subjects: Subject[] = [
  { name: 'Matemáticas', icon: '∑', accent: '#fbbf24', progress: 74, lessons: 12 },
  { name: 'Ciencias', icon: '⚗', accent: '#34d399', progress: 64, lessons: 9 },
  { name: 'Historia', icon: '🏛', accent: '#60a5fa', progress: 81, lessons: 14 },
  { name: 'Lenguaje', icon: '✍', accent: '#f472b6', progress: 58, lessons: 8 },
  { name: 'Inglés', icon: 'A', accent: '#a78bfa', progress: 69, lessons: 10 },
]

const questions: Question[] = [
  {
    prompt: '¿Qué planeta es conocido como el planeta rojo?',
    options: ['Venus', 'Marte', 'Júpiter', 'Mercurio'],
    correct: 'Marte',
    explanation: 'Marte tiene un tono rojizo debido al óxido de hierro en su superficie.',
  },
  {
    prompt: '¿Cuál es la capital de Chile?',
    options: ['Valparaíso', 'Santiago', 'Concepción', 'La Serena'],
    correct: 'Santiago',
    explanation: 'Santiago es la capital política y económica de Chile.',
  },
  {
    prompt: '¿Qué energía produce el Sol?',
    options: ['Eólica', 'Nuclear', 'Solar', 'Geotérmica'],
    correct: 'Solar',
    explanation: 'La energía solar es la radiación emitida por el Sol.',
  },
]

const stats = [
  { label: 'XP', value: '2.480' },
  { label: 'Nivel', value: '12' },
  { label: 'Insignias', value: '18' },
  { label: 'Racha', value: '5 días' },
]

function App() {
  const [profile, setProfile] = useState<Profile>('kids')
  const [selectedSubject, setSelectedSubject] = useState<string>('Matemáticas')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const activeQuestion = questions[currentQuestion]
  const subject = useMemo(
    () => subjects.find((item) => item.name === selectedSubject) ?? subjects[0],
    [selectedSubject],
  )

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option)
    if (option === activeQuestion.correct) {
      setScore((prev) => prev + 100)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      return
    }

    setCurrentQuestion(0)
    setSelectedAnswer(null)
  }

  const speakQuestion = () => {
    if (!('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(`${activeQuestion.prompt}. ${activeQuestion.options.join(', ')}`)
    utterance.lang = 'es-ES'
    utterance.rate = 1
    utterance.pitch = 1.1
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className={`app-shell ${profile}`}>
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">E</div>
          <div>
            <p className="eyebrow">Plataforma educativa</p>
            <h1>EduQuiz Chile</h1>
          </div>
        </div>

        <nav className="topnav">
          <a href="#">Inicio</a>
          <a href="#">Cursos</a>
          <a href="#">Ranking</a>
          <a href="#">Docente</a>
        </nav>

        <button type="button" className="primary-btn">
          Entrar
        </button>
      </header>

      <main className="content-grid">
        <section className="hero-panel">
          <div className="badge-row">
            <span className="mini-badge">Live quiz</span>
            <span className="mini-badge accent">+240 XP hoy</span>
          </div>

          <h2>
            Aprende jugando, <span>sube de nivel</span> y compite con tu curso.
          </h2>

          <p className="hero-copy">
            Una experiencia educativa pensada para colegios, estudiantes y docentes con
            diseño gamificado y desafíos de nivel mundial.
          </p>

          <div className="profile-switcher" aria-label="Selector de perfil">
            <button
              type="button"
              className={profile === 'kids' ? 'selected' : ''}
              onClick={() => setProfile('kids')}
            >
              Kids
            </button>
            <button
              type="button"
              className={profile === 'teens' ? 'selected' : ''}
              onClick={() => setProfile('teens')}
            >
              Teens
            </button>
          </div>

          <div className="cta-row">
            <button type="button" className="primary-btn large">
              Empezar desafío
            </button>
            <button type="button" className="secondary-btn">
              Ver demo
            </button>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <aside className="side-panel">
          <div className="panel-header">
            <span className="light-tag">Curso activo</span>
            <strong>{subject.name}</strong>
          </div>

          <div className="subject-list">
            {subjects.map((item) => (
              <button
                key={item.name}
                type="button"
                className={item.name === selectedSubject ? 'subject-item active' : 'subject-item'}
                onClick={() => setSelectedSubject(item.name)}
              >
                <span className="subject-icon" style={{ background: item.accent }}>
                  {item.icon}
                </span>
                <span className="subject-copy">
                  <strong>{item.name}</strong>
                  <small>{item.lessons} clases</small>
                </span>
                <span className="progress-pill">{item.progress}%</span>
              </button>
            ))}
          </div>
        </aside>
      </main>

      <section className="game-section">
        <div className="quiz-card">
          <div className="quiz-topbar">
            <div>
              <p className="eyebrow">Ronda actual</p>
              <h3>{subject.name} · Nivel {currentQuestion + 1}</h3>
            </div>
            <div className="timer-box">00:{String(30 - currentQuestion * 5).padStart(2, '0')}</div>
          </div>

          <motion.div
            key={activeQuestion.prompt}
            className="question-box"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="question-header">
              <span className="question-tag">Pregunta {currentQuestion + 1}</span>
              <button type="button" className="voice-btn" onClick={speakQuestion}>
                🔊 Voz
              </button>
            </div>
            <h4>{activeQuestion.prompt}</h4>

            <div className="answer-grid">
              {activeQuestion.options.map((option) => {
                const isCorrect = option === activeQuestion.correct
                const isSelected = option === selectedAnswer
                const reveal = selectedAnswer !== null

                return (
                  <button
                    key={option}
                    type="button"
                    className={[
                      'answer-btn',
                      reveal && isCorrect ? 'correct' : '',
                      reveal && isSelected && !isCorrect ? 'wrong' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="explanation-box">
                <strong>Explicación:</strong>
                <p>{activeQuestion.explanation}</p>
              </div>
            )}
          </motion.div>

          <div className="quiz-footer">
            <div className="score-pill">Puntaje: {score} XP</div>
            <button type="button" className="primary-btn" onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
            </button>
          </div>
        </div>

        <div className="results-card">
          <p className="eyebrow">Resultados</p>
          <h3>Rendimiento del curso</h3>

          <div className="progress-block">
            <div className="progress-header">
              <span>Progreso</span>
              <strong>82%</strong>
            </div>
            <div className="meter">
              <span style={{ width: '82%' }} />
            </div>
          </div>

          <ul className="reward-list">
            <li>🏆 3 medallas esta semana</li>
            <li>⭐ Racha de 5 días</li>
            <li>🎁 Desafío “Exploradores del saber”</li>
          </ul>
        </div>
      </section>

      <section className="teacher-panel">
        <div className="teacher-card">
          <p className="eyebrow">Panel docente</p>
          <h3>Gestión de contenido y progreso</h3>
          <div className="teacher-grid">
            <div>
              <span>Preguntas creadas</span>
              <strong>1.240</strong>
            </div>
            <div>
              <span>Grupos activos</span>
              <strong>18</strong>
            </div>
            <div>
              <span>Promedio general</span>
              <strong>87%</strong>
            </div>
            <div>
              <span>Tiempo de juego</span>
              <strong>24 min</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
