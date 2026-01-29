import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 glass bg-gradient-to-r from-slate-900 to-slate-700 border-t border-slate-700/40">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-slate-300">
                  &copy; {new Date().getFullYear()}. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-slate-300">Company</h3>
            <ul className="text-slate-300">
              <li className="mb-3"><Link to="/" className="hover:text-slate-100">Features</Link></li>
              <li className="mb-3"><Link to="/" className="hover:text-slate-100">Pricing</Link></li>
              <li><Link to="/" className="hover:text-slate-100">Press</Link></li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-slate-300">Support</h3>
            <ul className="text-slate-300">
              <li className="mb-3"><Link to="/" className="hover:text-slate-100">Help</Link></li>
              <li><Link to="/" className="hover:text-slate-100">Contact</Link></li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-slate-300">Legals</h3>
            <ul className="text-slate-300">
              <li className="mb-3"><Link to="/" className="hover:text-slate-100">Terms</Link></li>
              <li><Link to="/" className="hover:text-slate-100">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer