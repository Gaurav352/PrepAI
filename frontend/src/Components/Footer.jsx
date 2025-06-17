import { Brain } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">PrepAI</span>
              </div>
              <p className="text-slate-400">
                AI-powered interview preparation for your career success.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="https://github.com/Gaurav352/PrepAI" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 PrepAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
