import React from 'react'

const Working = () => {
  return (
    <div>
            <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Create Your Session</h3>
              <p className="text-slate-300">
                Choose your target role, experience level, and specific topics you want to focus on.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Practice with AI</h3>
              <p className="text-slate-300">
                Get AI-generated questions and answers. Click for detailed explanations and pin important ones.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ace Your concepts</h3>
              <p className="text-slate-300">
                Go into your interview confident and well-prepared with comprehensive practice under your belt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Working
